import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthSession } from './entities/auth-session.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../common/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.rol.nombre,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    // Guardar sesión en BD
    const expiresIn = this.configService.get<string>('jwt.refreshExpiresIn');
    const expireDate = this.calculateExpiryDate(expiresIn);

    const session = this.authSessionRepository.create({
      usuario_id: user.id,
      refresh_token: refreshToken,
      token_expira: expireDate,
    });

    await this.authSessionRepository.save(session);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol.nombre,
      },
    };
  }

  async refreshToken(token: string) {
    const session = await this.authSessionRepository.findOne({
      where: { refresh_token: token, estado: true },
      relations: ['usuario', 'usuario.rol'],
    });

    if (!session) {
      throw new UnauthorizedException('Token de refresco inválido');
    }

    if (new Date() > session.token_expira) {
      // Invalidar sesión
      session.estado = false;
      await this.authSessionRepository.save(session);
      throw new UnauthorizedException('Token de refresco expirado');
    }

    // Generar nuevo access token
    const payload = {
      sub: session.usuario.id,
      email: session.usuario.email,
      role: session.usuario.rol.nombre,
    };

    const accessToken = this.jwtService.sign(payload);

    // Actualizar último acceso
    session.ultimo_acceso = new Date();
    await this.authSessionRepository.save(session);

    return {
      access_token: accessToken,
      user: {
        id: session.usuario.id,
        nombre: session.usuario.nombre,
        apellido: session.usuario.apellido,
        email: session.usuario.email,
        rol: session.usuario.rol.nombre,
      },
    };
  }

  async logout(token: string) {
    const session = await this.authSessionRepository.findOne({
      where: { refresh_token: token },
    });

    if (session) {
      session.estado = false;
      await this.authSessionRepository.save(session);
    }

    return { success: true };
  }

  async requestPasswordReset(dto: ResetPasswordRequestDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      // Por seguridad, no revelar si el email existe o no
      return {
        success: true,
        message:
          'Si su correo existe, recibirá instrucciones para restablecer su contraseña',
      };
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresIn = '1h'; // Token válido por 1 hora
    const expireDate = this.calculateExpiryDate(expiresIn);

    // Guardar solicitud en BD
    await this.passwordResetRepository.delete({ usuario_id: user.id });

    const resetRequest = this.passwordResetRepository.create({
      usuario_id: user.id,
      token: token,
      expira: expireDate,
    });

    await this.passwordResetRepository.save(resetRequest);

    // Enviar email con link para resetear password
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailService.sendPasswordResetEmail(
      user.email,
      user.nombre,
      resetLink,
    );

    return {
      success: true,
      message:
        'Si su correo existe, recibirá instrucciones para restablecer su contraseña',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const resetRequest = await this.passwordResetRepository.findOne({
      where: { token: dto.token },
      relations: ['usuario'],
    });

    if (!resetRequest) {
      throw new BadRequestException('Token inválido');
    }

    if (new Date() > resetRequest.expira) {
      await this.passwordResetRepository.delete(resetRequest.id);
      throw new BadRequestException('Token expirado');
    }

    // Actualizar contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.usersService.updatePassword(
      resetRequest.usuario_id,
      hashedPassword,
    );

    // Eliminar solicitud
    await this.passwordResetRepository.delete(resetRequest.id);

    // Invalidar todas las sesiones activas
    await this.authSessionRepository.update(
      { usuario_id: resetRequest.usuario_id, estado: true },
      { estado: false },
    );

    return { success: true, message: 'Contraseña actualizada exitosamente' };
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  private calculateExpiryDate(expiresIn: string): Date {
    const expiryDate = new Date();
    const timeUnit = expiresIn.slice(-1);
    const timeValue = parseInt(expiresIn.slice(0, -1), 10);

    switch (timeUnit) {
      case 's':
        expiryDate.setSeconds(expiryDate.getSeconds() + timeValue);
        break;
      case 'm':
        expiryDate.setMinutes(expiryDate.getMinutes() + timeValue);
        break;
      case 'h':
        expiryDate.setHours(expiryDate.getHours() + timeValue);
        break;
      case 'd':
        expiryDate.setDate(expiryDate.getDate() + timeValue);
        break;
      default:
        // Default: 1 día
        expiryDate.setDate(expiryDate.getDate() + 1);
    }

    return expiryDate;
  }
}
