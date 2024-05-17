import { Injectable } from '@nestjs/common';
import { ItemInventarioDTO } from '../dto/item-inventario.dto';
import { ItemService } from './item.service';
import { InventarioService } from 'src/INVENTARIOMTTO/inventario/services/inventario.service';

@Injectable()
export class ItemInventarioService {
  constructor(
    private readonly itemService: ItemService,
    private readonly inventarioService: InventarioService,
  ) {}

  async createItemInventario(data: ItemInventarioDTO) {
    try {
      const createItem = await this.itemService.createItem(data);

      const { idItem, ...dataItem } = createItem;
      const dataInventory = {
        idItem,
        ...dataItem,
        ...data,
      };

      const createInventory = await this.inventarioService.createInventory({
        idItem,
        ...dataInventory,
      });

      // console.log('createItem', createItem);
      // console.log('createInventory', createInventory);
      // console.log('dataInventory', dataInventory);

      return {
        ...createItem,
        ...createInventory,
      };
    } catch (error) {
      throw new Error('Error en createItemInventario' + error);
    }
  }
}
