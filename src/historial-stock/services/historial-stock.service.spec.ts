import { Test, TestingModule } from '@nestjs/testing';
import { HistorialStockService } from './historial-stock.service';

describe('HistorialStockService', () => {
  let service: HistorialStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialStockService],
    }).compile();

    service = module.get<HistorialStockService>(HistorialStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
