import { HerramientasDTO } from "src/herramientas/dto/herramientas.dto";
import { ItemInventarioDTO } from "./item-inventario.dto";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ItemInventarioHerramientaDTO implements ItemInventarioDTO, HerramientasDTO{
  @IsOptional()
  @IsNumber()
  idHerramientas: number;

  @IsNotEmpty()
  @IsOptional()
  idItem: number;

  @IsOptional()
  @IsString()
  codigoItson: string;

  @IsOptional()
  @IsBoolean()
  disponible: boolean;

  @IsOptional()
  @IsNumber()
  idInventario: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  idCategoria: number;

  @IsNotEmpty()
  @IsNumber()
  idUnidad: number;

  @IsString()
  @IsOptional()
  imagen: string;

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