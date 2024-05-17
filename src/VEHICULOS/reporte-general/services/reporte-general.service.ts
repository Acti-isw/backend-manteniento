import { Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReporteGeneralService {
  constructor(private readonly prisma: PrismaService) {}

  async getSolicitudById(id: number) {
    const solicitudApartado = await this.prisma.visVEHReporteGeneral.findFirst({
      where: { idSolicitud: id, estado: 'Finalizado' },
    });

    if (!solicitudApartado) {
      throw new NotFoundException(`No se encontro la solicitud con id:${id}`);
    }

    return solicitudApartado;
  }

  async getSolicitudesByDate(fechaInicio: Date, fechaFin: Date) {
    const fechaInicial = new Date(String(`${fechaInicio}T00:00:00.000Z`));
    const fechaFinal = new Date(String(`${fechaFin}T23:59:00.000Z`));

    const apartadosByFecha = await this.prisma.visVEHReporteGeneral.findMany({
      where: {
        fechaSalida: {
          gte: fechaInicial, // Mayor o igual que la fecha de inicio
        },
        fechaLlegada: {
          lte: fechaFinal, // Menor o igual que la fecha de fin
        },
      },
    });

    if (isEmpty(apartadosByFecha)) {
      throw new NotFoundException(
        'Solicitudes no encontradas para esas fechas',
      );
    }

    return apartadosByFecha;
  }

  async getSolicitudes() {
    const solicitudApartado = await this.prisma.visVEHReporteGeneral.findMany({
      where: { estado: 'Finalizado' },
    });

    if (isEmpty(solicitudApartado)) {
      throw new NotFoundException('Solicitudes no encontradas');
    }

    return solicitudApartado;
  }

  async getApartadoById(id: number) {
    const apartado = await this.prisma.visVEHReporteGeneral.findFirst({
      where: { idSolicitud: id, estadoSolicitud: 'Aceptada' },
      orderBy: { idSolicitud: 'desc' },
    });

    if (!apartado) {
      throw new NotFoundException(`Apartado no encontrado con id:${id}`);
    }

    return apartado;
  }

  async getApartadosByDate(fechaInicio: Date, fechaFin: Date) {
    const fechaInicial = new Date(String(`${fechaInicio}T00:00:00.000Z`));
    const fechaFinal = new Date(String(`${fechaFin}T23:59:00.000Z`));

    const apartadosByFecha = await this.prisma.visVEHReporteGeneral.findMany({
      where: {
        fechaSalida: {
          gte: fechaInicial, // Mayor o igual que la fecha de inicio
        },
        fechaLlegada: {
          lte: fechaFinal, // Menor o igual que la fecha de fin
        },
      },
      orderBy: { idSolicitud: 'desc' },
    });

    if (isEmpty(apartadosByFecha)) {
      throw new NotFoundException('Apartados no encontrados para esas fechas');
    }

    return apartadosByFecha;
  }

  async getApartados() {
    const apartados = await this.prisma.visVEHReporteGeneral.findMany();
    if (isEmpty(apartados)) {
      throw new NotFoundException('Apartados no encontrados');
    }

    return apartados;
  }
}
