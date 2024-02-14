import { Test, TestingModule } from '@nestjs/testing';
import { ItemInventarioService } from './item-inventario.service';

describe('ItemInventarioService', () => {
  let service: ItemInventarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemInventarioService],
    }).compile();

    service = module.get<ItemInventarioService>(ItemInventarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
