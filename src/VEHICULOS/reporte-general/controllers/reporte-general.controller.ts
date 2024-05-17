import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReporteGeneralService } from '../services/reporte-general.service';

@Controller('reporte-general')
export class ReporteGeneralController {
  constructor(private readonly reporteGeneralService: ReporteGeneralService) {}

  @Get('apartados')
  async getApartados() {
    return await this.reporteGeneralService.getApartados();
  }

  @Get('apartados/date')
  async getApartadoByDate(@Query() filterQuery) {
    const { fechaInicio, fechaFin } = filterQuery;
    return await this.reporteGeneralService.getApartadosByDate(
      fechaInicio,
      fechaFin,
    );
  }

  @Get('apartados/:id')
  async getApartadoById(@Param('id') id: number) {
    return await this.reporteGeneralService.getApartadoById(id);
  }

  @Get('reportes/general')
  async getReportes() {
    return await this.reporteGeneralService.getSolicitudes();
  }

  @Get('reportes/general/date')
  async geReportesByDate(@Query() filterQuery) {
    const { fechaInicio, fechaFin } = filterQuery;
    return await this.reporteGeneralService.getSolicitudesByDate(
      fechaInicio,
      fechaFin,
    );
  }

  @Get('reportes/general/:id')
  async geReportesById(@Param('id') id: number) {
    return await this.reporteGeneralService.getSolicitudById(id);
  }
}
