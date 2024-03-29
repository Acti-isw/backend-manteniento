import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntradaItemController } from './salida-entrada-item.controller';

describe('SalidaEntradaItemController', () => {
  let controller: SalidaEntradaItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalidaEntradaItemController],
    }).compile();

    controller = module.get<SalidaEntradaItemController>(SalidaEntradaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
