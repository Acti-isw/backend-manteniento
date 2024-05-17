import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ItemInventarioService } from '../services/item-inventario.service';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { ItemInventarioDTO } from '../dto/item-inventario.dto';

@Controller('item-inventario')
@ApiTags('item-inventario')
export class ItemInventarioController {
  constructor(private readonly iteInvService: ItemInventarioService) {}

  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post('createIteInvHer')
  async createIteInv(@Body() data: ItemInventarioDTO) {
    return this.iteInvService.createItemInventario(data);
  }
}
