import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ComplementosService } from './complementos.service';
import { CreateComplementoDto } from './dto/create-complemento.dto';
import { UpdateComplementoDto } from './dto/update-complemento.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('complementos')
export class ComplementosController {
  constructor(private readonly complementosService: ComplementosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createComplementoDto: CreateComplementoDto,
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
    return this.complementosService.create(createComplementoDto, file);
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
