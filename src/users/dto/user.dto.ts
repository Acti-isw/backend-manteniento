import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsNumber()
  idRole: number;
}
