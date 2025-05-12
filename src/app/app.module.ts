import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [ProdutosModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
