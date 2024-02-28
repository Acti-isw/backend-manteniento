import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
