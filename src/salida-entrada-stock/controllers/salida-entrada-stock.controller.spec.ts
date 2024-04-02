import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntradaStockController } from './salida-entrada-stock.controller';

describe('SalidaEntradaItemController', () => {
  let controller: SalidaEntradaStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalidaEntradaStockController],
    }).compile();

    controller = module.get<SalidaEntradaStockController>(
      SalidaEntradaStockController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
