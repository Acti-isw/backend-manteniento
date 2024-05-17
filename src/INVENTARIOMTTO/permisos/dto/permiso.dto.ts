import { INVPermisos } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermisoDTO implements INVPermisos {
  @IsNumber()
  @IsOptional()
  idPermisos: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  pad: string;

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

export class PermisoUpdateDTO implements INVPermisos {
  @IsNotEmpty()
  @IsNumber()
  idPermisos: number;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  pad: string;

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
