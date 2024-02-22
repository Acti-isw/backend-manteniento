import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaDTO, CategoriaUpdateDTO } from '../dto/categoria.dto';
import { Categoria } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(categoria: CategoriaDTO): Promise<Categoria> {
    return await this.prisma.categoria.create({
      data: categoria,
    });
  }

  async updateCategory(categoria: CategoriaUpdateDTO): Promise<Categoria> {
    const { idCategoria, ...dataToUpdate } = categoria; // Extraer idCategoria y crear un nuevo objeto sin esa propiedad
    return await this.prisma.categoria.update({
      where: {
        idCategoria,
      },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findCategories(): Promise<Categoria[]> {
    const categories = await this.prisma.categoria.findMany();

    if (isEmpty(categories)) {
      throw new NotFoundException('No se encontraron categorias');
    }
    return categories;
  }

  async findCategoryById(id: number): Promise<Categoria> {
    const catetegory = await this.prisma.categoria.findFirst({
      where: { idCategoria: id },
    });

    if (!catetegory) {
      throw new NotFoundException(`No se encontro la categoria con id:${id}`);
    }
    return catetegory;
  }

  async deleteCategory(idCategoria: number): Promise<Categoria> {
    return await this.prisma.categoria.update({
      where: {
        idCategoria,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
