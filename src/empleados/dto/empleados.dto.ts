import { Empleados } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmpleadosDTO implements Empleados {
  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsNotEmpty()
  @IsString()
  Nombre: string;

  @IsNotEmpty()
  @IsString()
  ApellidoPaterno: string;

  @IsNotEmpty()
  @IsString()
  ApellidoMaterno: string;

  @IsOptional()
  @IsNumber()
  idItson: number;

  @IsOptional()
  @IsString()
  Telefono: string;

  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsOptional()
  @IsNumber()
  idDepartamento: number;

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

  // @IsOptional()
  // @IsString()
  // CURP: string;

  // @IsOptional()
  // @IsString()
  // RFC: string;

  // @IsOptional()
  // @IsString()
  // NSS: string;

  // @IsOptional()
  // @IsString()
  // Direccion: string;
  // @IsOptional()
  // @IsString()
  // FechaContratacion: Date;

  // @IsOptional()
  // @IsString()
  // Puesto: string;
}

export class EmpleadosUpdateDTO implements Empleados {
  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsOptional()
  @IsString()
  Nombre: string;

  @IsOptional()
  @IsString()
  ApellidoPaterno: string;

  @IsOptional()
  @IsString()
  ApellidoMaterno: string;

  @IsOptional()
  @IsNumber()
  idItson: number;

  @IsOptional()
  @IsString()
  Telefono: string;

  @IsOptional()
  @IsString()
  Email: string;

  @IsOptional()
  @IsNumber()
  idDepartamento: number;

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

  // @IsOptional()
  // @IsString()
  // CURP: string;

  // @IsOptional()
  // @IsString()
  // RFC: string;

  // @IsOptional()
  // @IsString()
  // NSS: string;

  // @IsOptional()
  // @IsString()
  // Direccion: string;
  // @IsOptional()
  // @IsString()
  // FechaContratacion: Date;

  // @IsOptional()
  // @IsString()
  // Puesto: string;
}
