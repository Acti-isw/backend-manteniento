import { HistorialStock } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsDate()
  fecha: Date;
}
