import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PayloadParam } from 'src/auth/param/payload.param';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto, @PayloadParam() payloadParam: JwtPayload) {
    return this.pedidosService.create(createPedidoDto, payloadParam);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePedidoDto: UpdatePedidoDto, @PayloadParam() payloadParam: JwtPayload) {
    return this.pedidosService.update(id, updatePedidoDto, payloadParam);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}
