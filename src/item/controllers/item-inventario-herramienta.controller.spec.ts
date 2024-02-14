import { Test, TestingModule } from '@nestjs/testing';
import { ItemInventarioHerramientaController } from './item-inventario-herramienta.controller';

describe('ItemInventarioHerramientaController', () => {
  let controller: ItemInventarioHerramientaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemInventarioHerramientaController],
    }).compile();

    controller = module.get<ItemInventarioHerramientaController>(ItemInventarioHerramientaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
