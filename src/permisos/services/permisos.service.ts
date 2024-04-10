import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermisoDTO, PermisoUpdateDTO } from '../dto/permiso.dto';
import { Permisos } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class PermisosService {
  constructor(private readonly prisma: PrismaService) {}

  async createPermission(permiso: PermisoDTO): Promise<Permisos> {
    return await this.prisma.permisos.create({
      data: permiso,
    });
  }

  async updatePermission(permiso: PermisoUpdateDTO): Promise<Permisos> {
    const { idPermisos, ...data } = permiso;

    return await this.prisma.permisos.update({
      where: {
        idPermisos,
      },
      data: {
        ...data,
        updateAT: new Date(),
      },
    });
  }

  async findPermissionById(id: number): Promise<Permisos> {
    const permiso = await this.prisma.permisos.findUnique({
      where: {
        idPermisos: id,
      },
    });

    if (!permiso) {
      throw new NotFoundException(`No se encontraron permisos con id:${id}`);
    }

    return permiso;
  }

  async findPermissions(): Promise<Permisos[]> {
    const permisos = await this.prisma.permisos.findMany();
    if (isEmpty(permisos)) {
      throw new NotFoundException('No se encontraron items');
    }
    return permisos;
  }

  async deletePermission(idPermisos: number): Promise<Permisos> {
    return await this.prisma.permisos.update({
      where: {
        idPermisos,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countPermissions(): Promise<number> {
    return await this.prisma.permisos.count({
      where: { isDelete: false },
    });
  }
}
