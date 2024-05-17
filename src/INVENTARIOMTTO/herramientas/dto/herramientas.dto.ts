import { INVHerramientas } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class HerramientasDTO implements INVHerramientas {
  @IsOptional()
  @IsNumber()
  idHerramientas: number;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  idCategoria: number;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsNotEmpty()
  @IsString()
  codigoItson: string;

  @IsOptional()
  @IsBoolean()
  disponible: boolean;

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

export class HerramientasUpdateDTO implements INVHerramientas {
  @IsNotEmpty()
  @IsNumber()
  idHerramientas: number;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  idCategoria: number;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsNotEmpty()
  @IsString()
  codigoItson: string;

  @IsOptional()
  @IsBoolean()
  disponible: boolean;

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
