
import { IsNotEmpty, IsNumber, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID del cliente' })
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  @Type(() => Number)
  cliente_id: number;

  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty({ message: 'El ID del curso es requerido' })
  @IsNumber({}, { message: 'El ID del curso debe ser un número' })
  @Type(() => Number)
  cursos_catalogo_id: number;

  @ApiProperty({ description: 'ID de la especialidad' })
  @IsNotEmpty({ message: 'El ID de la especialidad es requerido' })
  @IsNumber({}, { message: 'El ID de la especialidad debe ser un número' })
  @Type(() => Number)
  especialidades_id: number;

  @ApiProperty({ description: 'ID de la sucursal' })
  @IsNotEmpty({ message: 'El ID de la sucursal es requerido' })
  @IsNumber({}, { message: 'El ID de la sucursal debe ser un número' })
  @Type(() => Number)
  sucursal_id: number;

  @ApiProperty({ description: 'Fecha de inscripción', required: false })
  @IsOptional()
  @IsDate({ message: 'La fecha de inscripción debe ser una fecha válida' })
  @Type(() => Date)
  fecha_inscripcion?: Date;

  @ApiProperty({ description: 'ID del estado del curso' })
  @IsNotEmpty({ message: 'El ID del estado del curso es requerido' })
  @IsNumber({}, { message: 'El ID del estado del curso debe ser un número' })
  @Type(() => Number)
  estado_curso_id: number;
}