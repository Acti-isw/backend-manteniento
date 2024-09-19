import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ItemDTO, ItemUpdateDTO } from '../dto/item.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthenticationGuard, RolesGuard)
@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  async createItem(@Body() Item: ItemDTO) {
    return this.itemService.createItem(Item);
  }

  @Put('update')
  async updateItem(@Body() categoria: ItemUpdateDTO) {
    return this.itemService.updateItem(categoria);
  }

  @Get('all')
  async findItems() {
    return this.itemService.findItems();
  }

  @Get('count')
  async countItems() {
    return this.itemService.countItems();
  }

  @Get(':id')
  async findItemById(@Param('id') id: number) {
    return this.itemService.findItemById(id);
  }

  @Delete(':id')
  async deleteItemById(@Param('id') id: number) {
    return this.itemService.deleteItem(id);
  }
}
