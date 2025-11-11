import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaxasDeEntregaService } from './taxas-de-entrega.service';
import { CreateTaxasDeEntregaDto } from './dto/create-taxas-de-entrega.dto';
import { UpdateTaxasDeEntregaDto } from './dto/update-taxas-de-entrega.dto';

@Controller('configuracoes/taxas-de-entrega')
export class TaxasDeEntregaController {
  constructor(private readonly taxasDeEntregaService: TaxasDeEntregaService) {}

  @Post()
  create(@Body() createTaxasDeEntregaDto: CreateTaxasDeEntregaDto) {
    return this.taxasDeEntregaService.create(createTaxasDeEntregaDto);
  }

  @Get()
  findAll() {
    return this.taxasDeEntregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taxasDeEntregaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaxasDeEntregaDto: UpdateTaxasDeEntregaDto) {
    return this.taxasDeEntregaService.update(+id, updateTaxasDeEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taxasDeEntregaService.remove(id);
  }
}
