import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaDTO, CategoriaUpdateDTO } from '../dto/categoria.dto';
import { INVCategoria } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(categoria: CategoriaDTO): Promise<INVCategoria> {
    return await this.prisma.iNVCategoria.create({
      data: categoria,
    });
  }

  async updateCategory(categoria: CategoriaUpdateDTO): Promise<INVCategoria> {
    const { idCategoria, ...dataToUpdate } = categoria; // Extraer idCategoria y crear un nuevo objeto sin esa propiedad
    return await this.prisma.iNVCategoria.update({
      where: {
        idCategoria,
      },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findCategories(): Promise<INVCategoria[]> {
    const categories = await this.prisma.iNVCategoria.findMany();

    if (isEmpty(categories)) {
      throw new NotFoundException('No se encontraron categorias');
    }
    return categories;
  }

  async findCategoryById(id: number): Promise<INVCategoria> {
    const catetegory = await this.prisma.iNVCategoria.findFirst({
      where: { idCategoria: id },
    });

    if (!catetegory) {
      throw new NotFoundException(`No se encontro la categoria con id:${id}`);
    }
    return catetegory;
  }

  async deleteCategory(idCategoria: number): Promise<INVCategoria> {
    return await this.prisma.iNVCategoria.update({
      where: {
        idCategoria,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countCategories(): Promise<number> {
    return await this.prisma.iNVCategoria.count({
      where: { isDelete: false },
    });
  }
}
