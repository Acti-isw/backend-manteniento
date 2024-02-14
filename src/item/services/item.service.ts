import { Injectable } from '@nestjs/common';
import { Item, visItems } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDTO, ItemUpdateDTO } from '../dto/item.dto';
import { pick } from 'lodash';
import { plainToClass } from 'class-transformer';
import { cleanObjectBasedOnDTO } from 'src/utils/cleanObjectBasedOnDTO';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly propertiesDTO = [
    'idItem',
    'nombre',
    'descripcion',
    'idCategoria',
    'idUnidad',
    'imagen',
    'idUsuario',
    'isDelete',
    'createAT',
    'updateAT',
  ];

  async createItem(item: ItemDTO): Promise<Item> {
    try {
      const filteredItemData = pick(item, this.propertiesDTO);
      const itemDto = plainToClass(ItemDTO, filteredItemData);

      return await this.prisma.item.create({
        data: itemDto,
      });
    } catch (error) {
      throw new Error('Error en createItem' + error);
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
      throw new Error('Error en updateItem');
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
      throw new Error('Error en findItemById');
    }
  }
  async findItems(): Promise<visItems[]> {
    try {
      return await this.prisma.visItems.findMany();
    } catch (error) {
      throw new Error('Error en findItems');
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
      throw new Error('Error en deleteItem');
    }
  }
}
