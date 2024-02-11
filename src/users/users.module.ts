import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule]
})
export class UsersModule {}
