import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterCourseDto {
  @ApiProperty({ description: 'Página actual', required: false, default: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'La página debe ser un número' })
  @Min(1, { message: 'La página debe ser mayor a 0' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Elementos por página',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El límite debe ser un número' })
  @Min(1, { message: 'El límite debe ser mayor a 0' })
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ description: 'Buscar por nombre', required: false })
  @IsOptional()
  @IsString({ message: 'El término de búsqueda debe ser un texto' })
  search?: string;

  @ApiProperty({ description: 'Filtrar por nivel', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El nivel debe ser un número' })
  @Type(() => Number)
  nivel_id?: number;

  @ApiProperty({ description: 'Filtrar por modalidad', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La modalidad debe ser un número' })
  @Type(() => Number)
  modalidad_id?: number;

  @ApiProperty({ description: 'Filtrar por turno', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El turno debe ser un número' })
  @Type(() => Number)
  turno_id?: number;

  @ApiProperty({ description: 'Filtrar por especialidad', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La especialidad debe ser un número' })
  @Type(() => Number)
  especialidad_id?: number;

  @ApiProperty({ description: 'Filtrar por estado', required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  @Type(() => Boolean)
  estado?: boolean;

  @ApiProperty({
    description: 'Ordenar por (default: id)',
    required: false,
    default: 'id',
  })
  @IsOptional()
  @IsString({ message: 'El campo de ordenamiento debe ser un texto' })
  sortBy?: string = 'id';

  @ApiProperty({
    description: 'Dirección de ordenamiento (ASC o DESC)',
    required: false,
    default: 'ASC',
  })
  @IsOptional()
  @IsString({ message: 'La dirección de ordenamiento debe ser un texto' })
  order?: 'ASC' | 'DESC' = 'ASC';
}
