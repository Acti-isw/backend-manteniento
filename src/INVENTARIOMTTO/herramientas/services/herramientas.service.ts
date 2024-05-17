import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { INVHerramientas, visINVHerramientas } from '@prisma/client';
import { isEmpty /*pick*/ } from 'lodash';

@Injectable()
export class HerramientasService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly propertiesDTO = [
    'idHerramientas',
    'idItem',
    'codigoItson',
    'disponible',
    'createAT',
    'updateAT',
    'isDelete',
    'idUsuario',
  ];
  async createTool(herramienta: HerramientasDTO): Promise<INVHerramientas> {
    //const filteredHerData = pick(herramienta, this.propertiesDTO) as HerramientasDTO;

    return await this.prisma.iNVHerramientas.create({
      data: herramienta,
    });
  }

  async updateTool(
    herramienta: HerramientasUpdateDTO,
  ): Promise<INVHerramientas> {
    const { idHerramientas, ...dataUpdate } = herramienta;
    return await this.prisma.iNVHerramientas.update({
      where: { idHerramientas },
      data: {
        ...dataUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findTools(): Promise<visINVHerramientas[]> {
    const tools = await this.prisma.visINVHerramientas.findMany();
    if (isEmpty(tools)) {
      throw new NotFoundException('No se encontraton herramientas');
    }
    return tools;
  }

  async findToolById(id: number): Promise<INVHerramientas> {
    const tool = await this.prisma.iNVHerramientas.findFirst({
      where: { idHerramientas: id },
    });

    if (!tool) {
      throw new NotFoundException(`No se encontro la herramienta con id:${id}`);
    }
    return tool;
  }

  async deleteTool(idHerramientas: number): Promise<INVHerramientas> {
    return await this.prisma.iNVHerramientas.update({
      where: {
        idHerramientas,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countTools(): Promise<number> {
    return await this.prisma.iNVHerramientas.count({
      where: { isDelete: false },
    });
  }
}
