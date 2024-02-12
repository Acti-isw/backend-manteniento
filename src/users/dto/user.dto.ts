import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class UserDTO {
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

  @IsOptional()
  @IsNumber()
  idRole: number;
}
