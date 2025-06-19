import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GrupoComplementosService } from './grupo-complementos.service';
import { CreateGrupoComplementoDto } from './dto/create-grupo-complemento.dto';
import { UpdateGrupoComplementoDto } from './dto/update-grupo-complemento.dto';

@Controller('grupo-complementos')
export class GrupoComplementosController {
  constructor(private readonly grupoComplementosService: GrupoComplementosService) {}

  @Post()
  create(@Body() createGrupoComplementoDto: CreateGrupoComplementoDto) {
    return this.grupoComplementosService.create(createGrupoComplementoDto);
  }

  @Get()
  findAll() {
    return this.grupoComplementosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoComplementosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGrupoComplementoDto: UpdateGrupoComplementoDto) {
    return this.grupoComplementosService.update(id, updateGrupoComplementoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grupoComplementosService.remove(id);
  }
}
