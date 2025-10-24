import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from 'src/produtos/produtos/produtos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ClientesModule } from 'src/clientes/clientes.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { CategoriasModule } from 'src/produtos/categorias/categorias.module';
import { GrupoComplementosModule } from 'src/produtos/grupo-complementos/grupo-complementos.module';

import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ComplementosModule } from 'src/produtos/complementos/complementos.module';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [
    /*----------Produtos--------- */
    ProdutosModule,
    CategoriasModule,
    GrupoComplementosModule,
    ComplementosModule,
    /*------------fim--------------- */
    UsuariosModule,
    ClientesModule,
    PedidosModule,
    AuthModule,
    PrinterModule,
    // Caminho de arquivo staticos do meu projeto, como images.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files', 'products', 'images'), // caminho que vai salvar as imagens.
      serveRoot: '/files/products/images', // url que vai ser servido as imagens.
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files', 'addOns', 'images'), // caminho que vai salvar as imagens.
      serveRoot: '/files/addOns/images', // url que vai ser servido as imagens.
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ],
})
export class AppModule {}
