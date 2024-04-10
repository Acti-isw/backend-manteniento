import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';
import { Usuarios } from '@prisma/client';
import { IPayloadToken } from 'src/interface/auth.interface';
import { PermisosService } from 'src/permisos/services/permisos.service';

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

  async generateJWT(user: Usuarios) {
    const getUser = await this.userService.findUserById(user.idUsuario);

    const payload: IPayloadToken = {
      role: getUser.Role.nombre,
      username: getUser.usuario,
    };

    return {
      idUsuario: user.idUsuario,
      nombreCompleto: user.nombreCompleto,
      usuario: user.usuario,
      role: getUser.Role.nombre,
      permisos: getUser.Role.Permisos,
      avatar: user.avatar,
      accesToken: await this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '24h',
      }),
    };
  }
}
