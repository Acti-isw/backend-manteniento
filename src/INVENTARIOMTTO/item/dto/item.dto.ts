import { INVItem } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ItemDTO implements INVItem {
  @IsNumber()
  @IsOptional()
  idItem: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  idCategoria: number;

  @IsNotEmpty()
  @IsNumber()
  idUnidad: number;

  @IsString()
  @IsOptional()
  imagen: string;

  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsBoolean()
  @IsOptional()
  isDelete: boolean;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;
}

export class ItemUpdateDTO implements INVItem {
  @IsNotEmpty()
  @IsNumber()
  idItem: number;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  idCategoria: number;

  @IsOptional()
  @IsNumber()
  idUnidad: number;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsOptional()
  @IsNumber()
  idUsuario: number;

  @IsOptional()
  @IsBoolean()
  isDelete: boolean;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;
}
