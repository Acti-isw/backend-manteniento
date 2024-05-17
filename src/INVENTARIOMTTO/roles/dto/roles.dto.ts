import { INVRole } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RoleDTO implements INVRole {
  @IsOptional()
  @IsNumber()
  idRole: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

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

export class RoleUpdateDTO implements INVRole {
  @IsNotEmpty()
  @IsNumber()
  idRole: number;

  @IsOptional()
  @IsString()
  nombre: string;

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
