import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un texto' })
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ description: 'DUI del usuario (formato: 00000000-0)' })
  @IsNotEmpty({ message: 'El DUI es requerido' })
  @Matches(/^\d{8}-\d$/, {
    message: 'El formato de DUI no es válido (debe ser 00000000-0)',
  })
  DUI: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({ description: 'ID del rol del usuario' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsNumber({}, { message: 'El rol debe ser un número' })
  rol_id: number;
}
