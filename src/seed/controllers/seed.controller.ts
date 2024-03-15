import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from '../services/seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedServices: SeedService) {}

  @Get(':opcion')
  async createCategory(@Param('opcion') op: number) {
    return this.seedServices.callStoredProcedure(op);
  }
}
