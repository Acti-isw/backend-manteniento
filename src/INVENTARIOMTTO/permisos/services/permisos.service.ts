import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermisoDTO, PermisoUpdateDTO } from '../dto/permiso.dto';
import { INVPermisos } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class PermisosService {
  constructor(private readonly prisma: PrismaService) {}

  async createPermission(permiso: PermisoDTO): Promise<INVPermisos> {
    return await this.prisma.iNVPermisos.create({
      data: permiso,
    });
  }

  async updatePermission(permiso: PermisoUpdateDTO): Promise<INVPermisos> {
    const { idPermisos, ...data } = permiso;

    return await this.prisma.iNVPermisos.update({
      where: {
        idPermisos,
      },
      data: {
        ...data,
        updateAT: new Date(),
      },
    });
  }

  async findPermissionById(id: number): Promise<INVPermisos> {
    const permiso = await this.prisma.iNVPermisos.findUnique({
      where: {
        idPermisos: id,
      },
    });

    if (!permiso) {
      throw new NotFoundException(`No se encontraron permisos con id:${id}`);
    }

    return permiso;
  }

  async findPermissions(): Promise<INVPermisos[]> {
    const permisos = await this.prisma.iNVPermisos.findMany();
    if (isEmpty(permisos)) {
      throw new NotFoundException('No se encontraron items');
    }
    return permisos;
  }

  async deletePermission(idPermisos: number): Promise<INVPermisos> {
    return await this.prisma.iNVPermisos.update({
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
    return await this.prisma.iNVPermisos.count({
      where: { isDelete: false },
    });
  }
}
