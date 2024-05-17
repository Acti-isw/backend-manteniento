import { INVSalidaEntradaItem } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class SalidaEntItemDTO implements INVSalidaEntradaItem {
  @IsOptional()
  @IsNumber()
  idSalidaEntradaItem: number;

  @IsOptional()
  @IsNumber()
  idSalidaEntradaStock: number;

  @IsNotEmpty()
  @IsNumber()
  idItem: number;

  // @IsOptional()
  // @IsNumber()
  // idEmpleado: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  // @IsOptional()
  // @IsString()
  // motivo: string;

  @IsOptional()
  @IsNumber()
  stockAnterior: number;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;
}

export class SalidaEntItemUpdateDTO implements INVSalidaEntradaItem {
  @IsNotEmpty()
  @IsNumber()
  idSalidaEntradaItem: number;

  @IsNotEmpty()
  @IsNumber()
  idSalidaEntradaStock: number;

  @IsOptional()
  @IsNumber()
  idItem: number;

  // @IsOptional()
  // @IsNumber()
  // idEmpleado: number;

  @IsOptional()
  @IsNumber()
  cantidad: number;

  // @IsOptional()
  // @IsString()
  // motivo: string;

  @IsOptional()
  @IsNumber()
  stockAnterior: number;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsNumber()
  idUsuario: number;
}
