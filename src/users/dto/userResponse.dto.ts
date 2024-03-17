import { Usuarios } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponseDTO implements Usuarios{
    idUsuario: number;
    nombreCompleto: string;
    usuario: string;
    avatar: string;
    idRole: number;
    createAT: Date;
    updateAT: Date;
    isDelete: boolean;

    @Exclude()
    password: string;
}