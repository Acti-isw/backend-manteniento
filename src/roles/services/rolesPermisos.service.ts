import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  rolesPermisosDTO,
  rolesPermisosUpdateDTO,
} from '../dto/rolesPermisos.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RolePermisoService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(data: rolesPermisosDTO): Promise<rolesPermisosUpdateDTO> {
    const { RolePermisos, ...role } = data;

    const roleCreated = await this.prisma.role.create({
      data: role,
    });
    const permisosCreated = await this.prisma.rolePermisos.createMany({
      data: RolePermisos.map((v) => ({
        idUsuario: data.idUsuario,
        idPermisos: v,
        idRole: roleCreated.idRole,
      })),
    });

    return { ...roleCreated, count: permisosCreated.count };
  }

  async updateRole(
    data: rolesPermisosUpdateDTO,
  ): Promise<rolesPermisosUpdateDTO> {
    const { idRole, RolePermisos, ...dataToUpdate } = data; // Extraer idRole y crear un nuevo objeto sin esa propiedad
    const roleUpdated = await this.prisma.role.update({
      where: {
        idRole,
      },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
    await this.prisma.rolePermisos.deleteMany({ where: { idRole } });
    const permisosCreated = await this.prisma.rolePermisos.createMany({
      data: RolePermisos.map((v) => ({
        idUsuario: data.idUsuario,
        idPermisos: v,
        idRole,
      })),
    });
    return { ...roleUpdated, count: permisosCreated.count };
  }

  async deleteRole(idRole: number): Promise<Role> {
    await this.prisma.rolePermisos.deleteMany({ where: { idRole } });
    return await this.prisma.role.update({
      where: {
        idRole,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
