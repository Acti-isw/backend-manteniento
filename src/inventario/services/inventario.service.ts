import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventarioDTO } from '../dto/inventario.dto';
import { Inventario, visInventario } from '@prisma/client';

@Injectable()
export class InventarioService {
  constructor(private readonly prisma: PrismaService) {}

  async createInventory(inventario: InventarioDTO): Promise<Inventario> {
    try {
      return this.prisma.inventario.create({
        data: inventario,
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
