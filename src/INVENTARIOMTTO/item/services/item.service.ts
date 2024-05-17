import { Injectable, NotFoundException } from '@nestjs/common';
import { INVItem, visINVItems } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDTO, ItemUpdateDTO } from '../dto/item.dto';
import { isEmpty, pick } from 'lodash';

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

  async createItem(item: ItemDTO): Promise<INVItem> {
    // crear sentencias para insertar herramientas
    const filteredItemData = pick(item, this.propertiesDTO) as ItemDTO;

    return await this.prisma.iNVItem.create({
      data: filteredItemData,
    });
  }
  async updateItem(item: ItemUpdateDTO): Promise<INVItem> {
    const { idItem, ...data } = item;

    return await this.prisma.iNVItem.update({
      where: {
        idItem,
      },
      data: {
        ...data,
        updateAT: new Date(),
      },
    });
  }

  async findItemById(id: number): Promise<visINVItems> {
    const items = await this.prisma.visINVItems.findUnique({
      where: {
        idItem: id,
      },
    });

    if (!items) {
      throw new NotFoundException(`No se encontro el item con id:${id}`);
    }

    return items;
  }
  async findItems(): Promise<visINVItems[]> {
    const item = await this.prisma.visINVItems.findMany();
    if (isEmpty(item)) {
      throw new NotFoundException('No se encontraron items');
    }
    return item;
  }

  async deleteItem(idItem: number): Promise<INVItem> {
    return await this.prisma.iNVItem.update({
      where: {
        idItem,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countCategories(): Promise<number> {
    return await this.prisma.iNVItem.count({
      where: { isDelete: false },
    });
  }
}
