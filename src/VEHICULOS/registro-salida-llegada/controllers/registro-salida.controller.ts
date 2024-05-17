import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegistroSalidaService } from '../services/registro-salida.service';
import { RegistroSalidaDTO } from '../dto/registroSalida.dto';

@Controller('registro-salida')
export class RegistroSalidaController {
  constructor(private readonly registroSalidaService: RegistroSalidaService) {}

  @Post('salida')
  async createRegistroSalida(@Body() registroSalida: RegistroSalidaDTO) {
    return await this.registroSalidaService.createRegistroSalida(
      registroSalida,
    );
  }

  @Get('')
  async getRegistrosSalida() {}

  @Get('')
  async getRegistroSalidaById(@Param('id') id: number) {}
}
