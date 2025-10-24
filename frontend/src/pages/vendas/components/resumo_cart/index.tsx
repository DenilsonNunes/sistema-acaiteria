


import AcoesVendas from '@/components/acoesFooterMobile/acoes-vendas'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'




import ProdutosCart from '../../pedido_de_venda/components/produtos_cart'
import AcaoSalvarPedido from '../../pdv/components/acao_salvar_pedido'
import { useCartStore } from '@/stores/useCartStore'
import ResumoTotaisCart from '../../pedido_de_venda/components/resumo_totais_pedido'





const ResumoCart = () => {

  const navigate = useNavigate();
  const { cart } = useCartStore();



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
            <ResumoTotaisCart/>
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



export default ResumoCart