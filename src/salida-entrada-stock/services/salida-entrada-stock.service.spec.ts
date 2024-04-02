import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntradaStockService } from './salida-entrada-stock.service';

describe('SalidaEntradaItemService', () => {
  let service: SalidaEntradaStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalidaEntradaStockService],
    }).compile();

    service = module.get<SalidaEntradaStockService>(SalidaEntradaStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
