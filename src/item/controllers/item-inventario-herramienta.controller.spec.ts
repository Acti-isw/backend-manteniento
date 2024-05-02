import { Test, TestingModule } from '@nestjs/testing';
import { ItemInventario } from './item-inventario-herramienta.controller';

describe('ItemInventarioHerramientaController', () => {
  let controller: ItemInventario;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemInventario],
    }).compile();

    controller = module.get<ItemInventario>(ItemInventario);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
