import { SalidaEntradaHerramientas } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SalidaEntHerDTO implements SalidaEntradaHerramientas {
  @IsOptional()
  @IsNumber()
  idSalidaEntradaHerramientas: number;

  @IsNotEmpty()
  @IsNumber()
  idHerramientas: number;

  @IsNotEmpty()
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

export class SalidaEntHerUpdateDTO implements SalidaEntradaHerramientas {
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
