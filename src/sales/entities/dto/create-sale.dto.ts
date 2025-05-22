import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsPositive,
  IsDecimal,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID de la inscripción' })
  @IsNotEmpty({ message: 'El ID de la inscripción es requerido' })
  @IsNumber({}, { message: 'El ID de la inscripción debe ser un número' })
  @Type(() => Number)
  inscripcion_id: number;

  @ApiProperty({ description: 'ID del usuario que registra la venta' })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @Type(() => Number)
  usuario_id: number;

  @ApiProperty({ description: 'ID del cliente' })
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  @Type(() => Number)
  cliente_id: number;

  @ApiProperty({ description: 'Monto de la venta' })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'El monto debe ser un número decimal' },
  )
  @IsPositive({ message: 'El monto debe ser mayor a 0' })
  @Type(() => Number)
  monto: number;

  @ApiProperty({ description: 'ID de la forma de pago' })
  @IsNotEmpty({ message: 'La forma de pago es requerida' })
  @IsNumber({}, { message: 'La forma de pago debe ser un número' })
  @Type(() => Number)
  forma_pago_id: number;

  @ApiProperty({ description: 'Fecha de pago', required: false })
  @IsOptional()
  @IsDate({ message: 'La fecha de pago debe ser una fecha válida' })
  @Type(() => Date)
  fecha_pago?: Date;

  @ApiProperty({
    description: 'Número de referencia del pago',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El número de referencia debe ser un texto' })
  numero_referencia?: string;
}
