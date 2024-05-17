import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccesoriosSalidaLlegadaService } from 'src/vehiculos/accesorios-salida-llegada/services/accesorios-salida-llegada.service';
import { CarroceriaService } from 'src/vehiculos/carroceria/services/carroceria.service';
import { UbicacionGolpeService } from 'src/vehiculos/ubicacion-golpe/services/ubicacion-golpe.service';
import { RegistroLlegadaDTO } from '../dto/registroLlegada.dto';
import { isEmpty, pick } from 'lodash';
import { CarroceriaDTO } from 'src/vehiculos/carroceria/dto/carroceria.dto';
import { UbicacionGolpeDTO } from 'src/vehiculos/ubicacion-golpe/dto/ubicacionGolpe.dto';
import { accesoriosCatalogo } from 'src/utils/VEHaccesorios-catalago';
import { AccesoriosSalidaLlegadaDTO } from 'src/vehiculos/accesorios-salida-llegada/dto/accesoriosSalidaLlegada.dto';
import { VEHRegistroSalidaLlegada } from '@prisma/client';
import { comprobarRegistro } from 'src/utils/VEHcomprobarRegistro.vehiculos';

@Injectable()
export class RegistroLlegadaService {
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
    'hora',
    'nombreVigilante',
    'kilometraje',
    'tanque',
    'firmaVigilante',
    'firmaSolicitante',
    'observaciones',
    'estado',
    'carroceria',
    'accesorios',
    'isSalida',
  ];

  async createRegistroLlegada(
    llegada: RegistroLlegadaDTO,
  ): Promise<RegistroLlegadaDTO> {
    await comprobarRegistro(llegada.idSolicitud, llegada.isSalida);
    const filteredData = pick(
      llegada,
      this.propertiesDTO,
    ) as RegistroLlegadaDTO;

    const registroLlegada = await this.prisma.vEHRegistroSalidaLlegada.create({
      data: {
        idSolicitud: filteredData.idSolicitud,
        fecha: new Date(`${filteredData.fecha}T${llegada.hora}:00.000Z`),
        estado: 'Finalizado',
        ...filteredData,
      },
    });

    // Lógica para crear carrocería, ubicaciones de golpes y accesorios
    if (!isEmpty(llegada.carroceria)) {
      //crear la carrocería
      const carroceriaDTO = {
        idSolicitud: llegada.idSolicitud,
        isSalida: llegada.isSalida,
      } as CarroceriaDTO;
      const carroceria =
        await this.carroceriaService.createCarroceria(carroceriaDTO);

      //crear las ubicaciones de golpes
      const golpesPromises = llegada.carroceria.map((golpe) => {
        const golpeDTO = {
          idSolicitud: llegada.idSolicitud,
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
    const accesoriosPromises = Object.entries(llegada.accesorios).map(
      ([nombreAccesorio, seEncuentra]) => {
        const idAccesorio = accesoriosCatalogo[nombreAccesorio];
        if (idAccesorio !== undefined) {
          const accesorioDTO = {
            idSolicitud: llegada.idSolicitud,
            idAccesorio: idAccesorio,
            seEncuentra: seEncuentra,
            isSalida: llegada.isSalida,
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
    return llegada;
  }

  async findRegistroLlegadaById(id: number): Promise<VEHRegistroSalidaLlegada> {
    const registroLlegada =
      await this.prisma.vEHRegistroSalidaLlegada.findFirst({
        where: { OR: [{ idRegistroSalidaLlegada: id }, { idSolicitud: id }] },
      });

    if (!registroLlegada) {
      throw new NotFoundException(
        `No se encontro el registro de llegada con id:${id}`,
      );
    }
    return registroLlegada;
  }

  async findRegistroLlegadas(id: number): Promise<VEHRegistroSalidaLlegada[]> {
    const registroLlegadas =
      await this.prisma.vEHRegistroSalidaLlegada.findMany({
        where: { isSalida: false },
      });
    if (isEmpty(registroLlegadas)) {
      throw new NotFoundException(`No se encontraron llegadas`);
    }
    return registroLlegadas;
  }
}
