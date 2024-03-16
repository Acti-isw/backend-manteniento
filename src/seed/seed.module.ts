import { Module } from '@nestjs/common';
import { SeedService } from './services/seed.service';
import { SeedController } from './controllers/seed.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports: [PrismaModule]
})
export class SeedModule {}
