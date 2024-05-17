import { INVUnidades } from "@prisma/client";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UnidadesDTO implements INVUnidades{
    @IsOptional()
    @IsNumber()
    idUnidad: number;

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

export class UnidadesUpdateDTO implements INVUnidades{
    @IsNotEmpty()
    @IsNumber()
    idUnidad: number;

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