import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ComplementosService } from './complementos.service';
import { CreateComplementoDto } from './dto/create-complemento.dto';
import { UpdateComplementoDto } from './dto/update-complemento.dto';

@Controller('complementos')
export class ComplementosController {
  constructor(private readonly complementosService: ComplementosService) {}

  @Post()
  create(@Body() createComplementoDto: CreateComplementoDto) {
    return this.complementosService.create(createComplementoDto);
  }

  @Get()
  findAll() {
    return this.complementosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.complementosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateComplementoDto: UpdateComplementoDto) {
    return this.complementosService.update(id, updateComplementoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.complementosService.remove(id);
  }
}
