import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaDTO, CategoriaUpdateDTO } from '../dto/categoria.dto';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(categoria: CategoriaDTO): Promise<Categoria> {
    try {
      return await this.prisma.categoria.create({
        data: categoria,
      });
    } catch (error) {
      throw new Error('Error en createCategory');
    }
  }

  async updateCategory(categoria: CategoriaUpdateDTO): Promise<Categoria> {
    try {
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
    } catch (error) {
      throw new Error('Error en updateCategory' + error);
    }
  }

  async findCategories(): Promise<Categoria[]> {
    try {
      return this.prisma.categoria.findMany();
    } catch (error) {
      throw new Error('Error en findCategories');
    }
  }

  async findCategoryById(id: number): Promise<Categoria> {
    try {
      const catetegory = await this.prisma.categoria.findFirst({
        where: { idCategoria: id },
      });

      if (!catetegory) {
        //console.log("entro",catetegory)
        //throw new NotFoundException(`No se encontro la categoria con id:${id}`);
      }
      return catetegory;
    } catch (error) {
      throw new Error('Error en findCategoryById' + error);
    }
  }
}
