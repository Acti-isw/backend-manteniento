import { Categoria } from "@prisma/client";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CategoriaDTO implements Categoria{
    @IsOptional()
    @IsNumber()
    idCategoria: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsDate()
    createAT: Date;

    @IsOptional()
    @IsDate()
    updateAT: Date;

    @IsOptional()
    @IsBoolean()
    isDelete: boolean;

    @IsOptional()
    @IsNumber()
    idUsuario: number;
}

export class CategoriaUpdateDTO implements Categoria{
    @IsNotEmpty()
    @IsNumber()
    idCategoria: number;

    @IsOptional()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsDate()
    createAT: Date;

    @IsOptional()
    @IsDate()
    updateAT: Date;

    @IsOptional()
    @IsBoolean()
    isDelete: boolean;

    @IsOptional()
    @IsNumber()
    idUsuario: number;
}