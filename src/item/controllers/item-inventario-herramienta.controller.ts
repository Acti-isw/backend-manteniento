import { Body, Controller, Post } from '@nestjs/common';
import { ItemInventarioService } from '../services/item-inventario.service';
import { ItemInventarioHerramientaService } from '../services/item_inventario-herramienta.service';
import { ItemInventarioHerramientaDTO } from '../dto/item_inventario-herramienta.dto';

@Controller('item-inventario-herramienta')
export class ItemInventarioHerramientaController {
  constructor(
    private readonly iteInvService: ItemInventarioService,
    private readonly iteInvHerService: ItemInventarioHerramientaService,
  ) {}

  @Post('createIteInvHer')
  async createIteInvHer(@Body() data: ItemInventarioHerramientaDTO) {
    //4 -> es una categoria herramienta
    if (data.idCategoria === 4) {
      return this.iteInvHerService.createItemInventarioHerramienta(data);
    }

    return this.iteInvService.createItemInventario(data);
  }
}
