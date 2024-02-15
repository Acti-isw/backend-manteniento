import { Test, TestingModule } from '@nestjs/testing';
import { SalidaEntHerService } from './salida-ent-her.service';

describe('SalidaEntHerService', () => {
  let service: SalidaEntHerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalidaEntHerService],
    }).compile();

    service = module.get<SalidaEntHerService>(SalidaEntHerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
