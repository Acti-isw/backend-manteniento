import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SalidaEntHerService } from '../services/salida-ent-her.service';
import { SalidaEntHerDTO, SalidaEntHerUpdateDTO } from '../dto/salidaEntHer.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('salida-ent-her')
export class SalidaEntHerController {
  constructor(private readonly salidaEntHerServices: SalidaEntHerService) {}

  @Post('create')
  async createSalEntHer(@Body() registro: SalidaEntHerDTO) {
    return this.salidaEntHerServices.createSalEntHer(registro);
  }
  @Put('update')
  async updateSalEntHer(@Body() registro: SalidaEntHerUpdateDTO) {
    return this.salidaEntHerServices.updateSalEntHer(registro);
  }
  @Get('all')
  async findSalEntHer() {
    return this.salidaEntHerServices.findSalEntHer();
  }
  @Get(':id')
  async findSalEntHerById(@Param('id') id: number) {
    return this.salidaEntHerServices.findSalEntHerById(id);
  }
}
