import { VEHUbicacionGolpe } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UbicacionGolpeDTO implements VEHUbicacionGolpe {
  @IsOptional()
  @IsNumber()
  idUbicacionGolpe: number;

  @IsNotEmpty()
  @IsNumber()
  idCarroceria: number;

  @IsNotEmpty()
  @IsNumber()
  idSolicitud: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;
}
