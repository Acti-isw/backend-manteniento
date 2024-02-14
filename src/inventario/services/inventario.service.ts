import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventarioDTO } from '../dto/inventario.dto';
import { Inventario, visInventario } from '@prisma/client';
import { pick } from 'lodash';
import { plainToClass } from 'class-transformer';
import { cleanObjectBasedOnDTO } from 'src/utils/cleanObjectBasedOnDTO';

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
    try {
      const filteredInvData = pick(inventario, this.propertiesDTO);
      const inventarioDto = plainToClass(InventarioDTO, filteredInvData);

      return this.prisma.inventario.create({
        data: inventarioDto,
      });
    } catch (error) {
      throw new Error('Error en createInventory' + error);
    }
  }

  async updateInventory(inventario: InventarioDTO): Promise<Inventario> {
    try {
      const { idInventario, ...dataUpdate } = inventario;
      return this.prisma.inventario.update({
        where: { idInventario },
        data: {
          ...dataUpdate,
          updateAT: new Date(),
        },
      });
    } catch (error) {
      throw new Error('Error en updateInventory' + error);
    }
  }

  async findInventories(): Promise<visInventario[]> {
    try {
      return this.prisma.visInventario.findMany();
    } catch (error) {
      throw new Error('Error en findInventories' + error);
    }
  }

  async findInventoryById(id: number): Promise<visInventario> {
    try {
      return this.prisma.visInventario.findFirst({
        where: { idInventario: id },
      });
    } catch (error) {
      throw new Error('Error en findInventories' + error);
    }
  }
}
