import { SalidaEntradaItem } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SalidaEntItemDTO implements SalidaEntradaItem {
  @IsOptional()
  @IsNumber()
  idSalidaEntradaItem: number;

  @IsNotEmpty()
  @IsNumber()
  idItem: number;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsNumber()
  stockAnterior: number;

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

export class SalidaEntItemUpdateDTO implements SalidaEntradaItem {
  @IsNotEmpty()
  @IsNumber()
  idSalidaEntradaItem: number;

  @IsOptional()
  @IsNumber()
  idItem: number;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsOptional()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsNumber()
  stockAnterior: number;

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
