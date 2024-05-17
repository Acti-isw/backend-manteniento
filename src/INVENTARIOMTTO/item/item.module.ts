import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { ItemInventarioController } from './controllers/item-inventario.controller';
import { ItemInventarioService } from './services/item-inventario.service';
import { ItemInventarioHerramientaService } from './services/item_inventario-herramienta.service';
import { InventarioModule } from '../inventario/inventario.module';
import { HerramientasModule } from '../herramientas/herramientas.module';

@Module({
  providers: [
    ItemService,
    ItemInventarioService,
    ItemInventarioHerramientaService,
  ],
  controllers: [ItemController, ItemInventarioController],
  imports: [PrismaModule, InventarioModule, HerramientasModule],
})
export class ItemModule {}
