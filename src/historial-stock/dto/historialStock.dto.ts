import { HistorialStock } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class HistorialStockDTO implements HistorialStock {
  @IsOptional()
  @IsNumber()
  idHistorialStock: number;

  @IsOptional()
  @IsNumber()
  stockAnterior: number;

  @IsNotEmpty()
  @IsNumber()
  stockNuevo: number;

  @IsNotEmpty()
  @IsNumber()
  idItem: number;

  @IsNotEmpty()
  @IsNumber()
  idAccion: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;
}
