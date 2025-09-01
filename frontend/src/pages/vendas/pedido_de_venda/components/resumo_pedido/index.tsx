


import AcoesVendas from '@/components/acoesFooterMobile/acoes-vendas'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePedidoStore } from '@/stores/usePedidoStore'

import ResumoTotaisPedido from '../resumo_totais_pedido'



import ProdutosCart from '../produtos_cart'
import AcaoSalvarPedido from '../acao_salvar_pedido'





const ResumoPedido = () => {

  const navigate = useNavigate();
  const {cart } = usePedidoStore();



  const location = useLocation();
  const pathnameCart = location.pathname.includes('vendas/carrinho')









  return (

    <section>

      <div className='flex items-center mb-4'>

        <div className="relative h-12 bg-gray-200 w-full rounded-lg shadow flex items-center justify-center">
          {/* Ícone à esquerda */}
          <button 
            className="sm:hidden absolute left-3"
            onClick={() => navigate('/vendas/pedido-de-venda')}
          >
            <ArrowLeft />
          </button>

          {/* Texto centralizado */}
          <p className="text-2xl font-medium text-gray-800 text-center w-full">
            {pathnameCart ?  "Resumo do pedido" : "Pedido atual"}
          </p>
        </div>

      </div>

      {cart.itens && cart.itens.length > 0 ? (
        <>
          {/* Produtos do carrinho */}
          <ProdutosCart/>

          {/* Resumo totais */}
          <div className='mb-6'>
            <ResumoTotaisPedido/>
          </div>

          <button 
            onClick={() => navigate('/vendas/pedido-de-venda')}
            className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-20 cursor-pointer'
          >
            Adicionar mais produtos
          </button>

          
        </>

      ) : (
        <>
          <p className='text-center'>Não existem itens</p>

          <AcoesVendas/>
                                              
        </>
      )}

      <AcaoSalvarPedido/>

    </section>
  
  )
}



export default ResumoPedido