import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  HerramientasDTO,
  HerramientasUpdateDTO,
} from '../dto/herramientas.dto';
import { Herramientas } from '@prisma/client';
import { isEmpty, pick } from 'lodash';
import { plainToClass } from 'class-transformer';

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
  async createTool(herramienta: HerramientasDTO): Promise<Herramientas> {
    const filteredHerData = pick(herramienta, this.propertiesDTO);
    const herramientasDto = plainToClass(HerramientasDTO, filteredHerData);

    return await this.prisma.herramientas.create({
      data: herramientasDto,
    });
  }

  async updateTool(herramienta: HerramientasUpdateDTO): Promise<Herramientas> {
    const { idHerramientas, ...dataUpdate } = herramienta;
    return await this.prisma.herramientas.update({
      where: { idHerramientas },
      data: {
        ...dataUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findTools(): Promise<Herramientas[]> {
    const tools = await this.prisma.herramientas.findMany();
    if (isEmpty(tools)) {
      throw new NotFoundException('No se encontraton herramientas');
    }
    return tools;
  }

  async findToolById(id: number): Promise<Herramientas> {
    const tool = await this.prisma.herramientas.findFirst({
      where: { idHerramientas: id },
    });

    if (!tool) {
      throw new NotFoundException(`No se encontro la herramienta con id:${id}`);
    }
    return tool;
  }

  async deleteTool(idHerramientas: number): Promise<Herramientas> {
    return await this.prisma.herramientas.update({
      where: {
        idHerramientas,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }
}
