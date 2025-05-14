import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ClientesModule } from 'src/clientes/clientes.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';

@Module({
  imports: [ProdutosModule, UsuariosModule, ClientesModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
