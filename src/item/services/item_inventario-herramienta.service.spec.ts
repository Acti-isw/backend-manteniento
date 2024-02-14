import { Test, TestingModule } from '@nestjs/testing';
import { ItemInventarioHerramientaService } from './item_inventario-herramienta.service';

describe('ItemInventarioHerramientaService', () => {
  let service: ItemInventarioHerramientaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemInventarioHerramientaService],
    }).compile();

    service = module.get<ItemInventarioHerramientaService>(ItemInventarioHerramientaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
