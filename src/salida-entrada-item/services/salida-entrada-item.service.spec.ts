import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntradaItemService } from './salida-entrada-item.service';

describe('SalidaEntradaItemService', () => {
  let service: SalidaEntradaItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalidaEntradaItemService],
    }).compile();

    service = module.get<SalidaEntradaItemService>(SalidaEntradaItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
