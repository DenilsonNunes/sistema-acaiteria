import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ProdutosService } from '../produtos/produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
    // Validações da imagem
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|jpg|png/g,
        })
        .addMaxSizeValidator({
          maxSize: 1 * (1024 * 1024), // Tamanho maximo 1 MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false, // Permite que o arquivo seja opcional
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.produtosService.create(createProdutoDto, file);
  }

  /*-----------------Metodos de Busca------------------*/
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findOne(id);
  }

  @Get(':id/grupo-complementos')
  findAddOnGroupAndAddOnsByProductId(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findAddOnGroupAndAddOnsByProductId(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.remove(id);
  }

  @Post(':id/duplicar')
  duplicateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { nomeProduto: string }, // Tipando 'data' como um objeto
  ) {
    const { nomeProduto } = data; // Fazendo destructuring corretamente
    return this.produtosService.duplicateProduct(id, nomeProduto);
  }
}
