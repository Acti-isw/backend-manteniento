import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsNumber()
  idRole: number;

  @IsNotEmpty()
  @IsBoolean()
  eliminado: boolean;

  @IsNotEmpty()
  @IsDate()
  fechaHoraCambio: Date;
}
