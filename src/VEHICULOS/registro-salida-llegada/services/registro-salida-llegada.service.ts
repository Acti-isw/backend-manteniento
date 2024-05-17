import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccesoriosSalidaLlegadaService } from 'src/vehiculos/accesorios-salida-llegada/services/accesorios-salida-llegada.service';
import { CarroceriaService } from 'src/vehiculos/carroceria/services/carroceria.service';
import { UbicacionGolpeService } from 'src/vehiculos/ubicacion-golpe/services/ubicacion-golpe.service';
import { SalidaLlegadaDTO } from '../dto/registroSalidaLlegada.dto';
import { isEmpty } from 'lodash';
import { CarroceriaDTO } from 'src/vehiculos/carroceria/dto/carroceria.dto';
import { UbicacionGolpeDTO } from 'src/vehiculos/ubicacion-golpe/dto/ubicacionGolpe.dto';

@Injectable()
export class RegistroSalidaLlegadaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carroceriaService: CarroceriaService,
    private readonly ubicacionGolpeService: UbicacionGolpeService,
    private readonly accesoriosSalLleService: AccesoriosSalidaLlegadaService,
  ) {}

  async createSalidaLlegada(registro: SalidaLlegadaDTO) {
    await this.comprobarRegistro(registro.idSolicitud, registro.isSalida);

    const estado = registro.isSalida ? 'Circulacion' : 'Finalizado';

    //RegistroSalidaLlegada
    const registroSalLle = await this.prisma.vEHRegistroSalidaLlegada.create({
      data: {
        fecha: new Date(`${registro.fecha}T${registro.hora}:00.000Z`),
        estado,
        ...registro,
      },
    });

    //Carroceria y UbicacionGolpe
    if (!isEmpty(registro.carroceria)) {
      await this.createCarroceriaUbicacionGolpes(registro);
    }

    //Accesorios
    await this.createAccesoriosSalLle(registro);
  }
  async findSalidaLlegada() {}
  async findSalidasLlegadasById(idSolicitud: number) {
    //salidasLlegadas
    const salidaLlegada = await this.prisma.vEHRegistroSalidaLlegada.findFirst({
      where: { idSolicitud },
    });

    //ubicacionGolpe
    const ubicacionGolpeSalida =
      await this.ubicacionGolpeService.findUbicacionGolpeById(
        idSolicitud,
        true,
      );

    const ubicacionGolpeLlegada =
      await this.ubicacionGolpeService.findUbicacionGolpeById(
        idSolicitud,
        false,
      );

    //Accesorios
    const accesoriosSalida =
      await this.accesoriosSalLleService.getAccesoriosSalLleObject(
        idSolicitud,
        true,
      );

    const accesoriosLlegada =
      await this.accesoriosSalLleService.getAccesoriosSalLleObject(
        idSolicitud,
        false,
      );

    const data = {
      ...salidaLlegada,
      ubicacionGolpeSalida,
      ubicacionGolpeLlegada,
      accesoriosSalida,
      accesoriosLlegada,
    };

    return data;
  }

  //Uso de servicios de carroceriaService, ubicacionGolpeService y accesoriosSalLleService
  async createCarroceriaUbicacionGolpes(registro: SalidaLlegadaDTO) {
    return await this.prisma.$transaction(async (prisma) => {
      // Crear la carrocería dentro de la transacción
      const carroceriaDTO = {
        idSolicitud: registro.idSolicitud,
        isSalida: registro.isSalida,
      } as CarroceriaDTO;
      const carroceria =
        await this.carroceriaService.createCarroceria(carroceriaDTO);

      // Mapear los datos de ubicaciones de golpes a objetos DTO
      const ubicacionGolpesDTOs = registro.carroceria.map((ubicacion) => {
        return {
          idSolicitud: registro.idSolicitud,
          idCarroceria: carroceria.idCarroceria,
          x: ubicacion.x,
          y: ubicacion.y,
          width: ubicacion.width,
          height: ubicacion.height,
        } as UbicacionGolpeDTO;
      });

      // Crear las ubicaciones de golpes dentro de la transacción
      await this.ubicacionGolpeService.createManyUbicacionGolpe(
        ubicacionGolpesDTOs,
      );

      // Retornar la carrocería creada
      return carroceria;
    });
  }

  async createAccesoriosSalLle(registro: SalidaLlegadaDTO) {
    return await this.prisma.$transaction(async () => {
      const accesoriosDTO =
        await this.accesoriosSalLleService.createAccesoriosDTO(
          registro.idSolicitud,
          registro.accesorios,
          registro.isSalida,
        );
      const accesoriosSalLle =
        await this.accesoriosSalLleService.createManyAccesoriosSalLle(
          accesoriosDTO,
        );
      return accesoriosSalLle;
    });
  }

  async comprobarRegistro(idSolicitud: number, isSalida: boolean) {
    //Busca si existe un registro con la idSolicitud de salida
    const registro = await this.prisma.vEHRegistroSalidaLlegada.findFirst({
      where: { idSolicitud, isSalida: true },
    });

    //Comprueba que no haya ninguna registro y que el isSalida sea el false osea el de llegada
    //por eso el !isSalida para que entre ala condicion como true
    if (!isSalida && !registro) {
      throw new NotFoundException(
        'No se encontró un registro de salida previo para esta solicitud.',
      );
    }
  }
}
