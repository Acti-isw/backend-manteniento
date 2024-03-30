import { Inventario } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class InventarioDTO implements Inventario {
  @IsOptional()
  @IsNumber()
  idInventario: number;

  @IsNotEmpty()
  @IsNumber()
  idItem: number;

  @IsNotEmpty()
  @IsNumber()
  stockActual: number;

  @IsNotEmpty()
  @IsNumber()
  stockMin: number;

  @IsNotEmpty()
  @IsNumber()
  stockMax: number;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;

  @IsOptional()
  @IsBoolean()
  isDelete: boolean;

  @IsOptional()
  @IsNumber()
  idUsuario: number;
}

export class InventarioUpdateDTO implements Inventario {
  @IsNotEmpty()
  @IsNumber()
  idInventario: number;

  @IsOptional()
  @IsNumber()
  idItem: number;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsNumber()
  stockMin: number;

  @IsOptional()
  @IsNumber()
  stockMax: number;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;

  @IsOptional()
  @IsBoolean()
  isDelete: boolean;

  @IsOptional()
  @IsNumber()
  idUsuario: number;
}

export class InventarioHistoryStockUpdateDTO implements Inventario {
  @IsNotEmpty()
  @IsNumber()
  idInventario: number;

  @IsOptional()
  @IsNumber()
  idItem: number;

  @IsOptional()
  @IsNumber()
  stockActual: number;

  @IsOptional()
  @IsNumber()
  stockMin: number;

  @IsOptional()
  @IsNumber()
  stockMax: number;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;

  @IsOptional()
  @IsBoolean()
  isDelete: boolean;

  @IsOptional()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsNumber()
  idAccion: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;
}
