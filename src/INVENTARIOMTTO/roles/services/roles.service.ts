import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDTO, RoleUpdateDTO } from '../dto/roles.dto';
import { INVRole } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(role: RoleDTO): Promise<INVRole> {
    return await this.prisma.iNVRole.create({
      data: role,
    });
  }

  async updateRole(role: RoleUpdateDTO): Promise<INVRole> {
    const { idRole, ...dataToUpdate } = role; // Extraer idRole y crear un nuevo objeto sin esa propiedad
    return await this.prisma.iNVRole.update({
      where: {
        idRole,
      },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findRole(): Promise<INVRole[]> {
    const roles = await this.prisma.iNVRole.findMany({
      include: {
        INVRolePermisos: {
          select: {
            INVPermisos: {
              select: {
                nombre: true,
                pad: true,
              },
            },
          },
        },
      },
    });

    if (isEmpty(roles)) {
      throw new NotFoundException('No se encontraron roles');
    }
    return roles;
  }

  async findRoleById(id: number): Promise<INVRole> {
    const role = await this.prisma.iNVRole.findFirst({
      include: {
        INVRolePermisos: {
          include: {
            INVPermisos: {
              select: {
                nombre: true,
                pad: true,
              },
            },
          },
        },
      },
      where: { idRole: id },
    });

    if (!role) {
      throw new NotFoundException(`No se encontro la role con id:${id}`);
    }
    return role;
  }

  async deleteRole(idRole: number): Promise<INVRole> {
    return await this.prisma.iNVRole.update({
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
