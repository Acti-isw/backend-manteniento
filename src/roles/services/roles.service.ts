import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDTO, RoleUpdateDTO } from '../dto/roles.dto';
import { Role } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(role: RoleDTO): Promise<Role> {
    return await this.prisma.role.create({
      data: role,
    });
  }

  async updateCategory(role: RoleUpdateDTO): Promise<Role> {
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

  async findCategories(): Promise<Role[]> {
    const categories = await this.prisma.role.findMany();

    if (isEmpty(categories)) {
      throw new NotFoundException('No se encontraron roles');
    }
    return categories;
  }

  async findCategoryById(id: number): Promise<Role> {
    const catetegory = await this.prisma.role.findFirst({
      where: { idRole: id },
    });

    if (!catetegory) {
      throw new NotFoundException(`No se encontro la role con id:${id}`);
    }
    return catetegory;
  }

  async deleteCategory(idRole: number): Promise<Role> {
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
