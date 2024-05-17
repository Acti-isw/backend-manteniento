import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarroceriaDTO } from '../dto/carroceria.dto';
import { VEHCarroceria } from '@prisma/client';

@Injectable()
export class CarroceriaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCarroceria(carroceria: CarroceriaDTO): Promise<VEHCarroceria> {
    return await this.prisma.vEHCarroceria.create({
      data: carroceria,
    });
  }

  async findCarroceriaById(idSolicitud: number, isSalida: boolean) {
    return await this.prisma.vEHCarroceria.findMany({
      where: { idSolicitud, isSalida },
    });
  }
}
