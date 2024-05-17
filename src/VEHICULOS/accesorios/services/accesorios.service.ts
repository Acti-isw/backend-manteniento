import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccesoriosDTO } from '../dto/accesorios.dto';
import { VEHAccesorios } from '@prisma/client';
import { isEmpty } from 'lodash';

@Injectable()
export class AccesoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccesorio(accesorio: AccesoriosDTO) {
    return await this.prisma.vEHAccesorios.create({
      data: accesorio,
    });
  }

  async getAccesorioById(id: number): Promise<VEHAccesorios> {
    const accesorio = await this.prisma.vEHAccesorios.findUnique({
      where: { idAccesorio: id },
    });

    if (!accesorio) {
      throw new NotFoundException(`No se encontro el accesorio con id:${id}`);
    }

    return accesorio;
  }

  async getAccesorios(): Promise<VEHAccesorios[]> {
    const accesorios = await this.prisma.vEHAccesorios.findMany();

    if (isEmpty(accesorios)) {
      throw new NotFoundException('No se encontraron accesorios');
    }

    return accesorios;
  }
}
