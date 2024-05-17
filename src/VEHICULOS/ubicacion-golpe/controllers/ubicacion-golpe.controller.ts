import { Controller, Get } from '@nestjs/common';
import { UbicacionGolpeService } from '../services/ubicacion-golpe.service';

@Controller('ubicacion-golpe')
export class UbicacionGolpeController {
  constructor(private readonly ubicacionGolpeService: UbicacionGolpeService) {}

  @Get("ubi")
  async getUbicacionGolpes() {
    return await this.ubicacionGolpeService.findUbicacionGolpes();
  }
}
