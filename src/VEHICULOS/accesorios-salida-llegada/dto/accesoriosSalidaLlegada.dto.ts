import { VEHAccesoriosSalidaLlegada } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AccesoriosSalidaLlegadaDTO implements VEHAccesoriosSalidaLlegada {
  @IsOptional()
  @IsNumber()
  idAccesSalLleg: number;

  @IsNotEmpty()
  @IsNumber()
  idSolicitud: number;

  @IsNotEmpty()
  @IsNumber()
  idAccesorio: number;

  @IsNotEmpty()
  @IsBoolean()
  seEncuentra: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isSalida: boolean;
}
