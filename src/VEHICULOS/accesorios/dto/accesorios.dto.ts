import { VEHAccesorios } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsSemVer, IsString } from 'class-validator';

export class AccesoriosDTO implements VEHAccesorios {
  @IsNotEmpty()
  @IsNumber()
  idAccesorio: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;
}
