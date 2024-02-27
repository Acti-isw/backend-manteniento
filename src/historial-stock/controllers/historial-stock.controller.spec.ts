import { Test, TestingModule } from '@nestjs/testing';
import { HistorialStockController } from './historial-stock.controller';

describe('HistorialStockController', () => {
  let controller: HistorialStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialStockController],
    }).compile();

    controller = module.get<HistorialStockController>(HistorialStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
