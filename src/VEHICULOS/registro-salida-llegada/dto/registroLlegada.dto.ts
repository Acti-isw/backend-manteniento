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

export class RegistroLlegadaDTO {
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

  @IsNotEmpty()
  @IsString()
  nombreVigilante: string;

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
  observaciones: string;

  @IsOptional()
  @IsString()
  estado: string;

  @IsOptional()
  @IsBoolean()
  isSalida: boolean;

  @IsOptional()
  carroceria: IUbicacionGolpe[]; //pendiente de chequeo

  @IsOptional()
  accesorios: IAccesorios; //pendiente de chequeo
}
