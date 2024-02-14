import { InventarioDTO } from 'src/inventario/dto/inventario.dto';
import { ItemDTO } from './item.dto';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ItemInventarioDTO implements ItemDTO, InventarioDTO {
  @IsOptional()
  @IsNumber()
  idInventario: number;

  @IsNotEmpty()
  @IsOptional()
  idItem: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  imagen: string;

  @IsNotEmpty()
  @IsNumber()
  idUnidad: number;

  @IsNotEmpty()
  @IsNumber()
  idCategoria: number;

  @IsNotEmpty()
  @IsNumber()
  stockActual: number;

  @IsNotEmpty()
  @IsNumber()
  stockMin: number;

  @IsNotEmpty()
  @IsNumber()
  stockMax: number;

  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsBoolean()
  @IsOptional()
  isDelete: boolean;

  @IsOptional()
  @IsDate()
  createAT: Date;

  @IsOptional()
  @IsDate()
  updateAT: Date;
}
