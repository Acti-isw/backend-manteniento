import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntHerController } from './salida-ent-her.controller';

describe('SalidaEntHerController', () => {
  let controller: SalidaEntHerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalidaEntHerController],
    }).compile();

    controller = module.get<SalidaEntHerController>(SalidaEntHerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
