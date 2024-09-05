import { Departamentos } from '@prisma/client';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DepartamentosDTO implements Departamentos {
  @IsNumber()
  @IsOptional()
  idDepartamento: number;

  @IsOptional()
  @IsString()
  Descripcion: string;

  @IsNotEmpty()
  @IsString()
  NombreDepartamento: string;

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

export class DepartamentosUpdateDTO implements Departamentos {
  @IsNumber()
  @IsOptional()
  idDepartamento: number;

  @IsOptional()
  @IsString()
  Descripcion: string;

  @IsOptional()
  @IsString()
  NombreDepartamento: string;

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
