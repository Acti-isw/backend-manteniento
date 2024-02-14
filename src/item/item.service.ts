import { Injectable } from '@nestjs/common';
import { Item, visItems } from '@prisma/client';
import { ItemDTO, ItemUpdateDTO } from './dto/item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createItem(item: ItemDTO): Promise<Item> {
    // crear sentencias para insertar herramientas
    try {
      return await this.prisma.item.create({
        data: item,
      });
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }
  async updateItem(item: ItemUpdateDTO): Promise<Item> {
    try {
      const { idItem, ...data } = item;

      return await this.prisma.item.update({
        where: {
          idItem,
        },
        data: {
          ...data,
          updateAT: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }

  async findItemById(id: number): Promise<visItems> {
    try {
      return await this.prisma.visItems.findUnique({
        where: {
          idItem: id,
        },
      });
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }
  async findItems(): Promise<visItems[]> {
    try {
      return await this.prisma.visItems.findMany();
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }
  async deleteItem(idItem: number): Promise<Item> {
    try {
      return await this.prisma.item.update({
        where: {
          idItem,
        },
        data: {
          isDelete: true,
          updateAT: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Error en createUnit');
    }
  }
}
