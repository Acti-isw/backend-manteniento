import { Injectable } from '@nestjs/common';
import { ItemInventarioHerramientaDTO } from '../dto/item_inventario-herramienta.dto';
import { ItemInventarioService } from './item-inventario.service';
import { HerramientasService } from 'src/herramientas/services/herramientas.service';

@Injectable()
export class ItemInventarioHerramientaService {
  constructor(
    private readonly itemInventarioService: ItemInventarioService,
    private readonly herramientaService: HerramientasService,
  ) {}

  async createItemInventarioHerramienta(data: ItemInventarioHerramientaDTO) {
    try {
      const itemInventario =
        await this.itemInventarioService.createItemInventario(data);

      const dataHerramienta = {
        ...data,
        ...itemInventario,
      };

      const addHerramienta =
        await this.herramientaService.createTool(dataHerramienta);

      // console.log('itemInventario', itemInventario);
      // console.log('addHerramienta', addHerramienta);
      // console.log('dataHerramienta', dataHerramienta);

      return {
        ...itemInventario,
        ...addHerramienta,
      };
    } catch (error) {
      throw new Error('Erro en createItemInventarioHerramienta' + error);
    }
  }
}
