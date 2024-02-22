import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventarioDTO } from '../dto/inventario.dto';
import { Inventario, visInventario } from '@prisma/client';
import { isEmpty, pick } from 'lodash';
import { plainToClass } from 'class-transformer';

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
  ): Promise<Inventario> {
    const filteredInvData = pick(inventario, this.propertiesDTO);
    const inventarioDto = plainToClass(InventarioDTO, filteredInvData);

    return await this.prisma.inventario.create({
      data: inventarioDto,
    });
  }

  async updateInventory(inventario: InventarioDTO): Promise<Inventario> {
    const { idInventario, ...dataUpdate } = inventario;
    return await this.prisma.inventario.update({
      where: { idInventario },
      data: {
        ...dataUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findInventories(): Promise<visInventario[]> {
    const inventories = await this.prisma.visInventario.findMany();
    if (isEmpty(inventories)) {
      throw new NotFoundException('No se encontraron inventarios');
    }
    return inventories;
  }

  async findInventoryById(id: number): Promise<visInventario> {
    const inventory = await this.prisma.visInventario.findFirst({
      where: { idInventario: id },
    });

    if (!inventory) {
      throw new NotFoundException(`No se encontro el inventario con id:${id}`);
    }
    return inventory;
  }

  async deleteInventory(idInventario: number): Promise<Inventario> {
    return await this.prisma.inventario.update({
      where: {
        idInventario,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
