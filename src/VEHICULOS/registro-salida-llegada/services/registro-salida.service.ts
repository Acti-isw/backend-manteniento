import { Injectable, NotFoundException } from '@nestjs/common';
import { VEHRegistroSalidaLlegada } from '@prisma/client';
import { isEmpty, pick } from 'lodash';
import { RegistroSalidaDTO } from '../dto/registroSalida.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarroceriaDTO } from 'src/vehiculos/carroceria/dto/carroceria.dto';
import { CarroceriaService } from 'src/vehiculos/carroceria/services/carroceria.service';
import { UbicacionGolpeService } from 'src/vehiculos/ubicacion-golpe/services/ubicacion-golpe.service';
import { AccesoriosSalidaLlegadaService } from 'src/vehiculos/accesorios-salida-llegada/services/accesorios-salida-llegada.service';
import { UbicacionGolpeDTO } from 'src/vehiculos/ubicacion-golpe/dto/ubicacionGolpe.dto';
import { accesoriosCatalogo } from 'src/utils/VEHaccesorios-catalago';
import { AccesoriosSalidaLlegadaDTO } from 'src/vehiculos/accesorios-salida-llegada/dto/accesoriosSalidaLlegada.dto';
import { comprobarRegistro } from 'src/utils/VEHcomprobarRegistro.vehiculos';

@Injectable()
export class RegistroSalidaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carroceriaService: CarroceriaService,
    private readonly ubicacionGolpeService: UbicacionGolpeService,
    private readonly accesoriosSalLleService: AccesoriosSalidaLlegadaService,
  ) {}

  private readonly propertiesDTO = [
    'idRegistroSalidaLlegada',
    'idSolicitud',
    'fecha',
    'nombreSolicitante',
    'nombreVigilante',
    'chofer',
    'placa',
    'licencia',
    'isLocal',
    'destino',
    'kilometraje',
    'tanque',
    'firmaVigilante',
    'firmaSolicitante',
    'departamento',
    'observaciones',
    'estado',
    'isSalida',
  ];

  async createRegistroSalida(
    salida: RegistroSalidaDTO,
  ): Promise<RegistroSalidaDTO> {
    await comprobarRegistro(salida.idSolicitud, salida.isSalida);
    const filteredData = pick(salida, this.propertiesDTO) as RegistroSalidaDTO;

    const registroSalida = await this.prisma.vEHRegistroSalidaLlegada.create({
      data: {
        idSolicitud: filteredData.idSolicitud,
        fecha: new Date(`${filteredData.fecha}T${salida.hora}:00.000Z`),
        estado: 'Circulacion',
        ...filteredData,
      },
    });

    // Lógica para crear carrocería, ubicaciones de golpes y accesorios
    if (!isEmpty(salida.carroceria)) {
      //crear la carrocería
      const carroceriaDTO = {
        idSolicitud: salida.idSolicitud,
        isSalida: salida.isSalida,
      } as CarroceriaDTO;
      const carroceria =
        await this.carroceriaService.createCarroceria(carroceriaDTO);

      //crear las ubicaciones de golpes
      const golpesPromises = salida.carroceria.map((golpe) => {
        const golpeDTO = {
          idSolicitud: salida.idSolicitud,
          idCarroceria: carroceria.idCarroceria,
          x: golpe.x,
          y: golpe.y,
          width: golpe.width,
          height: golpe.height,
        } as UbicacionGolpeDTO;
        return golpeDTO;
      });

      const golpes =
        await this.ubicacionGolpeService.createManyUbicacionGolpe(golpesPromises);
    }

    //registrar los accesorios
    const accesoriosPromises = Object.entries(salida.accesorios).map(
      ([nombreAccesorio, seEncuentra]) => {
        const idAccesorio = accesoriosCatalogo[nombreAccesorio];
        if (idAccesorio !== undefined) {
          const accesorioDTO = {
            idSolicitud: salida.idSolicitud,
            idAccesorio: idAccesorio,
            seEncuentra: seEncuentra,
            isSalida: salida.isSalida,
          } as AccesoriosSalidaLlegadaDTO;
          return accesorioDTO;
        } else {
          throw new NotFoundException(
            `El accesorio '${nombreAccesorio}' no se encuentra en el catálogo.`,
          );
        }
      },
    );

    const accesorios =
      await this.accesoriosSalLleService.createManyAccesoriosSalLle(
        accesoriosPromises,
      );

    //Devuelve los resultados
    return salida;
  }

  async findRegistroSalidaById(id: number): Promise<VEHRegistroSalidaLlegada> {
    const registroSalida = await this.prisma.vEHRegistroSalidaLlegada.findFirst(
      {
        where: { OR: [{ idRegistroSalidaLlegada: id }, { idSolicitud: id }] },
      },
    );

    if (!registroSalida) {
      throw new NotFoundException(
        `No se encontro el registro de salida con id:${id}`,
      );
    }
    return registroSalida;
  }

  async findRegistroSalidas(id: number): Promise<VEHRegistroSalidaLlegada[]> {
    const registroSalidas = await this.prisma.vEHRegistroSalidaLlegada.findMany(
      {
        where: { isSalida: true },
      },
    );
    if (isEmpty(registroSalidas)) {
      throw new NotFoundException(`No se encontraron salidas`);
    }
    return registroSalidas;
  }
}
