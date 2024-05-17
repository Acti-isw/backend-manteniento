import { VEHCarroceria } from "@prisma/client";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CarroceriaDTO implements VEHCarroceria{
    @IsOptional()
    @IsNumber()
    idCarroceria: number;

    @IsNotEmpty()
    @IsNumber()
    idSolicitud: number;

    @IsOptional()
    @IsBoolean()
    isSalida: boolean;
}