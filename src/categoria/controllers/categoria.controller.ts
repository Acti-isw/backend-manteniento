import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaDTO, CategoriaUpdateDTO } from '../dto/categoria.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('categorias')
@ApiTags('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post('create')
  async createCategory(@Body() categoria: CategoriaDTO) {
    return this.categoriaService.createCategory(categoria);
  }

  @Put('update')
  async updateCategory(@Body() categoria: CategoriaUpdateDTO) {
    return this.categoriaService.updateCategory(categoria);
  }

  @Get('all')
  async findCategories() {
    return this.categoriaService.findCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number) {
    return this.categoriaService.findCategoryById(id);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: number) {
    return this.categoriaService.deleteCategory(id);
  }
}
