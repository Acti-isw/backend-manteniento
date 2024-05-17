import { INVUsuarios } from "@prisma/client";
//import { Exclude } from "class-transformer";

export class UserResponseDTO implements INVUsuarios{
    idUsuario: number;
    nombreCompleto: string;
    usuario: string;
    avatar: string;
    idRole: number;
    createAT: Date;
    updateAT: Date;
    isDelete: boolean;

    //@Exclude()
    password: string;
}