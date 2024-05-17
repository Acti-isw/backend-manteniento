import {
  VEHAccesorios,
  VEHAccesoriosSalidaLlegada,
  VEHCarroceria,
  VEHRegistroSalidaLlegada,
  VEHUbicacionGolpe,
} from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IAccesorios } from 'src/VEHICULOS/accesorios-salida-llegada/interface/accesorios.interface';
import { IUbicacionGolpe } from 'src/VEHICULOS/ubicacion-golpe/interface/ubicacionGolpe.interface';

export class RegistroSalidaDTO implements VEHRegistroSalidaLlegada {
  @IsOptional()
  @IsNumber()
  idRegistroSalidaLlegada: number;

  @IsNotEmpty()
  @IsNumber()
  idSolicitud: number;

  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsOptional()
  @IsString()
  nombreSolicitante: string;

  @IsNotEmpty()
  @IsString()
  nombreVigilante: string;

  @IsOptional()
  @IsString()
  chofer: string;

  @IsOptional()
  @IsString()
  placa: string;

  @IsOptional()
  @IsString()
  licencia: string;

  @IsOptional()
  @IsBoolean()
  isLocal: boolean;

  @IsOptional()
  @IsString()
  destino: string;

  @IsNotEmpty()
  @IsString()
  kilometraje: string;

  @IsNotEmpty()
  @IsString()
  tanque: string;

  @IsNotEmpty()
  @IsString()
  firmaVigilante: string;

  @IsNotEmpty()
  @IsString()
  firmaSolicitante: string;

  @IsNotEmpty()
  @IsString()
  departamento: string;

  @IsOptional()
  @IsString()
  observaciones: string;

  @IsOptional()
  @IsString()
  estado: 'Pendiente' | 'Circulacion' | 'Finalizado';

  @IsNotEmpty()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  carroceria: IUbicacionGolpe[]; //pendiente de chequeo

  @IsOptional()
  accesorios: IAccesorios; //pendiente de chequeo
}
