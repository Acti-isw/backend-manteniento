import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuarios } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from '../dto/user.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserDTO): Promise<Usuarios> {
    return await this.prisma.usuarios.create({ data });
  }

  async findUsers(): Promise<Usuarios[]> {
    const users = await this.prisma.usuarios.findMany();
    if (isEmpty(users)) {
      throw new NotFoundException('No se encontraron usuarios');
    }
    return users;
  }

  async findUserById(id: number): Promise<Usuarios> {
    const user = await this.prisma.usuarios.findFirst({
      where: {
        idUsuario: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`No se encontro el usario con id:${id}`);
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<Usuarios> {
    const user = await this.prisma.usuarios.findFirst({
      where: {
        usuario: username,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `No se encontro el usario con username:${username}`,
      );
    }
    return user;
  }

  async deleteUser(idUsuario: number): Promise<Usuarios> {
    return await this.prisma.usuarios.update({
      where: {
        idUsuario,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
