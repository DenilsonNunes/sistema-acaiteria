import AcoesVendas from "@/components/acoesFooterMobile/acoes-vendas"
import AcaoSalvarPedido from "../pdv/components/acao_salvar_pedido"
import ProdutosCart from "../pdv/components/produtos_cart"
import { useCartStore } from "@/stores/useCartStore"
import ResumoTotaisCart from "../pdv/components/resumo_totais_cart"
import { useNavigate } from "react-router-dom"
import { IdentificarCliente } from "../components/identificar_cliente"

const ResumoCart = () => {

  const { cart } = useCartStore();

  const navigate = useNavigate();


  
  return (

    <section>

      {/* Produtos do carrinho */}
      {cart?.itens?.length > 0 ? (
        <>

          {/* IdentificarCliente */}
          <div className='mb-4'>
            <IdentificarCliente/>
          </div>

          {/* Produtos do carrinho */}
          <ProdutosCart/>

          {/* Resumo totais */}
          <div className='mb-6'>
            <ResumoTotaisCart/>
          </div>

          <button 
            onClick={() => navigate('/vendas/pdv')}
            className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-20 cursor-pointer'
          >
            Adicionar mais produtos
          </button>

          
        </>

      ) : (
        <>
          <p className='text-center mt-10'>Não existem itens no carrinho</p>

          <AcoesVendas/>
                                              
        </>
      )}


      <AcaoSalvarPedido/>

    </section>

  )
}

export default ResumoCart