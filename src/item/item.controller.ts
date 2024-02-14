import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDTO, ItemUpdateDTO } from './dto/item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  async createCategory(@Body() unidad: ItemDTO) {
    return this.itemService.createItem(unidad);
  }

  @Put('update')
  async updateCategory(@Body() categoria: ItemUpdateDTO) {
    return this.itemService.updateItem(categoria);
  }

  @Get('all')
  async findCategories() {
    return this.itemService.findItems();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number) {
    return this.itemService.findItemById(id);
  }

  @Delete(':id')
  async deleteItemById(@Param('id') id: number) {
    return this.itemService.deleteItem(id);
  }
}
