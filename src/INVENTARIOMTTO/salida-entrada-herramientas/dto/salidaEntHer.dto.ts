import { INVSalidaEntradaHerramientas } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SalidaEntHerDTO implements INVSalidaEntradaHerramientas {
  @IsOptional()
  @IsNumber()
  idSalidaEntradaHerramientas: number;

  @IsNotEmpty()
  @IsNumber()
  idHerramientas: number;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;
}

export class SalidaEntHerUpdateDTO implements INVSalidaEntradaHerramientas {
  @IsNotEmpty()
  @IsNumber()
  idSalidaEntradaHerramientas: number;

  @IsOptional()
  @IsNumber()
  idHerramientas: number;

  @IsOptional()
  @IsNumber()
  idEmpleado: number;

  @IsOptional()
  @IsString()
  motivo: string;

  @IsOptional()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsNumber()
  idUsuario: number;
}
