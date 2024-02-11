import { Injectable } from '@nestjs/common';
import { Usuarios } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserDTO): Promise<Usuarios> {
    try {
      console.log(data);
      console.log({ data });

      return await this.prisma.usuarios.create({ data });
    } catch (error) {
      throw new Error('Error en createUser');
    }
  }

  async findUsers(): Promise<Usuarios[]> {
    try {
      return await this.prisma.usuarios.findMany();
    } catch (error) {
      throw new Error('Error en findUsers');
    }
  }

  async findUserById(id: number): Promise<Usuarios> {
    try {
      return await this.prisma.usuarios.findFirst();
    } catch (error) {
      throw new Error('Error en findUserById');
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.prisma.usuarios.delete({
        where: {
          idUsuario: id,
        },
      });
    } catch (error) {
      throw new Error('Error en deleteUser');
    }
  }
}
