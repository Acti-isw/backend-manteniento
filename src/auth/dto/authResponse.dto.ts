import { Usuarios } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AuthResponseDTO implements Usuarios {
  payload: string;
  secret: string;
  expries: number | string;

  idUsuario: number;
  nombreCompleto: string;
  usuario: string;
  idRole: number;
  createAT: Date;
  updateAT: Date;
  isDelete: boolean;

  @Exclude()
  password: string;
}
