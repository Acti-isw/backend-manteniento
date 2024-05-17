import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';
import { INVUsuarios } from '@prisma/client';
import { IPayloadToken } from 'src/auth/interface/auth.interface';
import { PermisosService } from 'src/INVENTARIOMTTO/permisos/services/permisos.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly permisosService: PermisosService,
  ) {}

  async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findUserByUsername(username);

    if (userByUsername && !userByUsername.isDelete) {
      const match = userByUsername.password === password;
      if (match) return userByUsername;
    }
    return null;
  }

  async signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  async generateJWT(user: INVUsuarios) {
    const getUser = await this.userService.findUserById(user.idUsuario);

    const payload: IPayloadToken = {
      role: getUser.INVRole.nombre,
      username: getUser.usuario,
    };

    return {
      idUsuario: user.idUsuario,
      nombreCompleto: user.nombreCompleto,
      usuario: user.usuario,
      role: getUser.INVRole.nombre,
      permisos: getUser.INVRole.INVRolePermisos,
      avatar: user.avatar,
      accesToken: await this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '24h',
      }),
    };
  }
}
