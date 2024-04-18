import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDTO, RoleUpdateDTO } from '../dto/roles.dto';
import { Role } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(role: RoleDTO): Promise<Role> {
    return await this.prisma.role.create({
      data: role,
    });
  }

  async updateRole(role: RoleUpdateDTO): Promise<Role> {
    const { idRole, ...dataToUpdate } = role; // Extraer idRole y crear un nuevo objeto sin esa propiedad
    return await this.prisma.role.update({
      where: {
        idRole,
      },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findRole(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      include: {
        RolePermisos: {
          select: {
            Permisos: {
              select: {
                nombre: true,
                path: true,
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

  async findRoleById(id: number): Promise<Role> {
    const role = await this.prisma.role.findFirst({
      include: {
        RolePermisos: {
          include: {
            Permisos: {
              select: {
                nombre: true,
                path: true,
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

  async deleteRole(idRole: number): Promise<Role> {
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
