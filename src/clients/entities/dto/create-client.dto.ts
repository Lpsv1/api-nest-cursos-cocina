import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un texto' })
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string;

  @ApiProperty({ description: 'Teléfono del cliente' })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  telefono: string;

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  direccion?: string;

  @ApiProperty({ description: 'DUI del cliente (formato: 00000000-0)' })
  @IsNotEmpty({ message: 'El DUI es requerido' })
  @Matches(/^\d{8}-\d$/, {
    message: 'El formato de DUI no es válido (debe ser 00000000-0)',
  })
  DUI: string;
}
