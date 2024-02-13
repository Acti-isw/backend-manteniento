import { Herramientas } from "@prisma/client";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class HerramientasDTO implements Herramientas{
    @IsOptional()
    @IsNumber()
    idHerramientas: number;

    @IsNotEmpty()
    @IsNumber()
    idItem: number;

    @IsNotEmpty()
    @IsString()
    codigoItson: string;

    @IsNotEmpty()
    @IsBoolean()
    disponible: boolean;

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

export class HerramientasUpdateDTO implements Herramientas{
    @IsNotEmpty()
    @IsNumber()
    idHerramientas: number;

    @IsOptional()
    @IsNumber()
    idItem: number;

    @IsOptional()
    @IsString()
    codigoItson: string;

    @IsOptional()
    @IsBoolean()
    disponible: boolean;

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