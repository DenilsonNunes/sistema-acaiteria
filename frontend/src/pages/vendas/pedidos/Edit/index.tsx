import { useNavigate, useParams } from "react-router-dom";
import ProdutosPedido from "../components/produtos_pedido";
import { useFetchOrderById } from "@/hooks/sales/useOrders";
import LoadingSpinner from "@/components/loading-spinner";
import AcaoSalvarEdicaoPedido from "../components/acao_salvar_edicao_pedido";
import ResumoTotaisPedido from "../components/resumo_totais_pedido";
import { usePedidoStore } from "@/stores/usePedidoStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IdentificarCliente } from "../../components/identificar_cliente";


const EditOrder = () => {

  const { carregarPedidoExistente, idPedidoEmEdicao} = usePedidoStore(); 

  const navigate = useNavigate();

  const { idPedido } = useParams();
  const id = idPedido ? Number(idPedido) : undefined;

  const { data: order, isLoading, isError} = useFetchOrderById(id as number);



  // carregar apenas quando "order" for obtido
  useEffect(() => {
    if (order) {
      carregarPedidoExistente(order);
    }
  }, [order, carregarPedidoExistente]);
  

  if (!order && !isLoading) {

    return ( 
      <div className="flex flex-col gap-4 items-center mt-12">
        <p className="text-2xl">Pedido não encontrado</p>
        <Button 
          variant='outline' 
          onClick={() => {
            navigate(`/vendas/pedidos`);
          }}
        >
          Voltar para os pedidos
        </Button>
      </div>
    
    );
  }



  if(isLoading) {
    return (
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }


  if(isError) {
    return (
      <div>
        <p>Erro ao buscar pedido</p>
      </div>
    )
  }





  return (

    <section className="w-full">

      <div className="grid w-full">
        <IdentificarCliente/>
      </div>

      <p className="font-medium text-2xl my-2">Itens</p>

      <ProdutosPedido/>

      <button 
        onClick={() => {
          navigate('/vendas/pdv');
        }}
        className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-6 cursor-pointer'
      >
        Adicionar mais produtos
      </button>
  

      {/* Resumo totais pedido */}
      <div className="mb-14">
        <ResumoTotaisPedido/>
      </div>

      {/* Ação Salvar Pedido */}
      <AcaoSalvarEdicaoPedido/>

    </section>
  )

}

export default EditOrder