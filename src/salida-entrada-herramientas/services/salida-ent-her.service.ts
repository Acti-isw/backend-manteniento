import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SalidaEntHerDTO,
  SalidaEntHerUpdateDTO,
} from '../dto/salidaEntHer.dto';
import { SalidaEntradaHerramientas } from '@prisma/client';

@Injectable()
export class SalidaEntHerService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalEntHer(
    registro: SalidaEntHerDTO,
  ): Promise<SalidaEntradaHerramientas> {
    try {
      return await this.prisma.salidaEntradaHerramientas.create({
        data: registro,
      });
    } catch (error) {
      throw new Error('Error en createSalEntHer' + error);
    }
  }

  async updateSalEntHer(registro: SalidaEntHerUpdateDTO) {
    try {
      const { idSalidaEntradaHerramientas, ...registroUpdate } = registro;
      return await this.prisma.salidaEntradaHerramientas.update({
        where: {
          idSalidaEntradaHerramientas,
        },
        data: {
          ...registroUpdate,
        },
      });
    } catch (error) {
      throw new Error('Error en createSalEntHer' + error);
    }
  }

  async findSalEntHer(): Promise<SalidaEntradaHerramientas[]> {
    try {
      return await this.prisma.salidaEntradaHerramientas.findMany();
    } catch (error) {
      throw new Error('Error en createSalEntHer' + error);
    }
  }

  async findSalEntHerById(id: number): Promise<SalidaEntradaHerramientas> {
    try {
      return await this.prisma.salidaEntradaHerramientas.findFirst({
        where: {
          idSalidaEntradaHerramientas: id,
        },
      });
    } catch (error) {
      throw new Error('Error en createSalEntHer' + error);
    }
  }
}
