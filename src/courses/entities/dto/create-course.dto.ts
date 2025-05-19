import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  Min,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty({ description: 'Nombre del curso' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del curso', required: false })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;

  @ApiProperty({ description: 'ID del nivel' })
  @IsNotEmpty({ message: 'El nivel es requerido' })
  @IsNumber({}, { message: 'El nivel debe ser un número' })
  @Type(() => Number)
  nivel_id: number;

  @ApiProperty({ description: 'ID de la modalidad' })
  @IsNotEmpty({ message: 'La modalidad es requerida' })
  @IsNumber({}, { message: 'La modalidad debe ser un número' })
  @Type(() => Number)
  modalidad_id: number;

  @ApiProperty({ description: 'ID del turno' })
  @IsNotEmpty({ message: 'El turno es requerido' })
  @IsNumber({}, { message: 'El turno debe ser un número' })
  @Type(() => Number)
  turno_id: number;

  @ApiProperty({ description: 'Total de horas' })
  @IsNotEmpty({ message: 'El total de horas es requerido' })
  @IsNumber({}, { message: 'El total de horas debe ser un número' })
  @Min(1, { message: 'El total de horas debe ser mayor a 0' })
  @Type(() => Number)
  total_horas: number;

  @ApiProperty({ description: 'Precio' })
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'El precio debe ser un número decimal' },
  )
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  @Type(() => Number)
  precio: number;

  @ApiProperty({ description: 'ID de la especialidad' })
  @IsNotEmpty({ message: 'La especialidad es requerida' })
  @IsNumber({}, { message: 'La especialidad debe ser un número' })
  @Type(() => Number)
  especialidad_id: number;
}
