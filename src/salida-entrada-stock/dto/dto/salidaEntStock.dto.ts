import { SalidaEntradaStock, SalidaEntradaItem } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SalidaEntStockDTO implements SalidaEntradaStock {
  @IsOptional()
  @IsNumber()
  idSalidaEntradaStock: number;

  //

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsOptional()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsNotEmpty()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsArray()
  SalidaEntradaItem: SalidaEntradaItem[];
}

export class SalidaEntStockUpdateDTO implements SalidaEntradaStock {
  // @IsNotEmpty()
  // @IsNumber()
  // idSalidaEntradaItem: number;

  @IsOptional()
  @IsNumber()
  idSalidaEntradaStock: number;

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
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsNumber()
  idUsuario: number;

  @IsOptional()
  @IsArray()
  SalidaEntradaItem: SalidaEntradaItem[];
}
export class SalidaEntStockCreatedDTO {
  // @IsNotEmpty()
  // @IsNumber()
  // idSalidaEntradaItem: number;

  @IsOptional()
  @IsNumber()
  idSalidaEntradaStock: number;

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
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsNumber()
  idUsuario: number;

  @IsOptional()
  @IsNumber()
  SalidaEntradaItem: number;
}
