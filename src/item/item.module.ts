import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { ItemInventarioService } from './services/item-inventario.service';
import { InventarioModule } from 'src/inventario/inventario.module';
import { ItemInventarioHerramientaService } from './services/item_inventario-herramienta.service';
import { HerramientasModule } from 'src/herramientas/herramientas.module';
import { ItemInventarioHerramientaController } from './controllers/item-inventario-herramienta.controller';

@Module({
  providers: [
    ItemService,
    ItemInventarioService,
    ItemInventarioHerramientaService,
  ],
  controllers: [ItemController, ItemInventarioHerramientaController],
  imports: [PrismaModule, InventarioModule, HerramientasModule],
})
export class ItemModule {}
