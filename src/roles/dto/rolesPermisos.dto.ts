import { Permisos, Role } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class rolesPermisosDTO implements Role {
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

  @IsOptional()
  @IsArray()
  RolePermisos: number[];

  @IsOptional()
  @IsNumber()
  count?: number;
}

export class rolesPermisosUpdateDTO implements Role {
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
  idUsuario?: number;

  @IsOptional()
  @IsArray()
  RolePermisos?: number[];

  @IsOptional()
  @IsNumber()
  count?: number;
}

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
