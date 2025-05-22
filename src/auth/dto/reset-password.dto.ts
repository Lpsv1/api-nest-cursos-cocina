import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Token de restablecimiento de contraseña' })
  @IsNotEmpty({ message: 'El token es requerido' })
  @IsString({ message: 'El token debe ser un texto' })
  token: string;

  @ApiProperty({ description: 'Nueva contraseña' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número o carácter especial',
  })
  password: string;
}
