import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccesoriosSalidaLlegadaDTO } from '../dto/accesoriosSalidaLlegada.dto';
import { visVEHAccesoriosSalidaLlegada } from '@prisma/client';
import { isEmpty } from 'lodash';
import {
  IAccesoriosSalLle,
  accesoriosCatalogo,
} from 'src/utils/VEHaccesorios-catalago';
import { toCamelCase } from 'src/utils/toCamelCase';

@Injectable()
export class AccesoriosSalidaLlegadaService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyAccesoriosSalLle(accesorios: AccesoriosSalidaLlegadaDTO[]) {
    return await this.prisma.vEHAccesoriosSalidaLlegada.createMany({
      data: accesorios,
    });
  }

  async getAccesoriosSalLleById(
    id: number,
    isSalida: boolean,
  ): Promise<visVEHAccesoriosSalidaLlegada[]> {
    const accesorio = await this.prisma.visVEHAccesoriosSalidaLlegada.findMany({
      where: { idSolicitud: id, isSalida },
    });

    if (!accesorio) {
      throw new NotFoundException(
        `No se encontro el accesorio de salida llegada con id:${id}`,
      );
    }

    return accesorio;
  }

  async findAccesoriosSalLle(): Promise<visVEHAccesoriosSalidaLlegada[]> {
    const accesorios =
      await this.prisma.visVEHAccesoriosSalidaLlegada.findMany();

    if (isEmpty(accesorios)) {
      throw new NotFoundException(
        'No se encontraron accesorios de salida llegada',
      );
    }

    return accesorios;
  }

  async createAccesoriosDTO(
    idSolicitud: number,
    accesorios: IAccesoriosSalLle,
    isSalida: boolean,
  ): Promise<AccesoriosSalidaLlegadaDTO[]> {
    const accesoriosPromises = Object.entries(accesorios).map(
      ([nombreAccesorio, seEncuentra]) => {
        const idAccesorio = accesoriosCatalogo[nombreAccesorio];
        if (idAccesorio !== undefined) {
          return {
            idSolicitud: idSolicitud,
            idAccesorio,
            seEncuentra,
            isSalida,
          } as AccesoriosSalidaLlegadaDTO;
        } else {
          throw new NotFoundException(
            `El accesorio '${nombreAccesorio}' no se encuentra en el catálogo.`,
          );
        }
      },
    );
    return accesoriosPromises;
  }

  async getAccesoriosSalLleObject(id: number, isSalida: boolean) {
    const accesoriosFiltered = await this.getAccesoriosSalLleById(id, isSalida);

    return accesoriosFiltered.reduce((obj, item) => {
      const propiedad = toCamelCase(item.accesorio) as keyof IAccesoriosSalLle;
      obj[propiedad] = item.seEncuentra;
      return obj;
    }, {} as IAccesoriosSalLle);
  }
}
