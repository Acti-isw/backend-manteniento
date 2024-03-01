import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ItemInventarioService } from '../services/item-inventario.service';
import { ItemInventarioHerramientaService } from '../services/item_inventario-herramienta.service';
import { ItemInventarioHerramientaDTO } from '../dto/item_inventario-herramienta.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('item-inventario-herramienta')
export class ItemInventarioHerramientaController {
  constructor(
    private readonly iteInvService: ItemInventarioService,
    private readonly iteInvHerService: ItemInventarioHerramientaService,
  ) {}

  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post('createIteInvHer')
  async createIteInvHer(@Body() data: ItemInventarioHerramientaDTO) {
    //4 -> es una categoria herramienta
    if (data.idCategoria === 4) {
      return this.iteInvHerService.createItemInventarioHerramienta(data);
    }

    return this.iteInvService.createItemInventario(data);
  }
}
