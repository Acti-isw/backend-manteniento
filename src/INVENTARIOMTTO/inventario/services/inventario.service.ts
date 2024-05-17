import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventarioDTO } from '../dto/inventario.dto';
import { INVInventario, visINVInventario } from '@prisma/client';
import { isEmpty, pick } from 'lodash';

@Injectable()
export class InventarioService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly propertiesDTO = [
    'idInventario',
    'idItem',
    'stockActual',
    'stockMin',
    'stockMax',
    'createAT',
    'updateAT',
    'isDelete',
    'idUsuario',
  ];

  async createInventory(
    @Body() inventario: InventarioDTO,
  ): Promise<INVInventario> {
    const filteredInvData = pick(
      inventario,
      this.propertiesDTO,
    ) as InventarioDTO;

    return await this.prisma.iNVInventario.create({
      data: filteredInvData,
    });
  }

  async updateInventory(inventario: InventarioDTO): Promise<INVInventario> {
    const filteredInvData = pick(
      inventario,
      this.propertiesDTO,
    ) as InventarioDTO;

    const { idInventario, ...dataUpdate } = filteredInvData;
    return await this.prisma.iNVInventario.update({
      where: { idInventario },
      data: {
        ...dataUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findInventories(): Promise<visINVInventario[]> {
    const inventories = await this.prisma.visINVInventario.findMany();
    if (isEmpty(inventories)) {
      throw new NotFoundException('No se encontraron inventarios');
    }
    return inventories;
  }

  async findInventoryById(id: number): Promise<visINVInventario> {
    const inventory = await this.prisma.visINVInventario.findFirst({
      where: { idInventario: id },
    });

    if (!inventory) {
      throw new NotFoundException(`No se encontro el inventario con id:${id}`);
    }
    return inventory;
  }

  async deleteInventory(idInventario: number): Promise<INVInventario> {
    return await this.prisma.iNVInventario.update({
      where: {
        idInventario,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countInventories(): Promise<number> {
    return await this.prisma.iNVInventario.count({
      where: { isDelete: false },
    });
  }
}
