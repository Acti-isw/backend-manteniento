import { Permisos } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermisoDTO implements Permisos {
  @IsNumber()
  @IsOptional()
  idPermisos: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;

  @IsBoolean()
  @IsOptional()
  isDelete: boolean;
}

export class PermisoUpdateDTO implements Permisos {
  @IsNotEmpty()
  @IsNumber()
  idPermisos: number;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;

  @IsOptional()
  @IsBoolean()
  isDelete: boolean;
}
