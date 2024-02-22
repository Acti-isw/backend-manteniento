import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, visItems } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDTO, ItemUpdateDTO } from '../dto/item.dto';
import { isEmpty, pick } from 'lodash';
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
    // crear sentencias para insertar herramientas
    const filteredItemData = pick(item, this.propertiesDTO);
    const itemDto = plainToClass(ItemDTO, filteredItemData);

    return await this.prisma.item.create({
      data: itemDto,
    });
  }
  async updateItem(item: ItemUpdateDTO): Promise<Item> {
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
  }

  async findItemById(id: number): Promise<visItems> {
    const items = await this.prisma.visItems.findUnique({
      where: {
        idItem: id,
      },
    });

    if (!items) {
      throw new NotFoundException(`No se encontro el item con id:${id}`);
    }

    return items;
  }
  async findItems(): Promise<visItems[]> {
    const item = await this.prisma.visItems.findMany();
    if (isEmpty(item)) {
      throw new NotFoundException('No se encontraron items');
    }
    return item;
  }

  async deleteItem(idItem: number): Promise<Item> {
    return await this.prisma.item.update({
      where: {
        idItem,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
