import { INVUsuarios } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UserDTO implements INVUsuarios {
  @IsOptional()
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty()
  @IsString()
  nombreCompleto: string;

  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsNumber()
  idRole: number;

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
