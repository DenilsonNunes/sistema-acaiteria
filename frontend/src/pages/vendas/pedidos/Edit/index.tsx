import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import ProdutosPedido from "../../pedido_de_venda/components/produtos_pedido";
import { useFetchOrderById } from "@/hooks/sales/useOrders";
import LoadingSpinner from "@/components/loading-spinner";
import ResumoTotaisPedido from "../../pedido_de_venda/components/resumo_totais_pedido";
import AcaoSalvarPedido from "../../pedido_de_venda/components/acao_salvar_pedido";
import { usePedidoStore } from "@/stores/usePedidoStore";


const EditOrder = () => {

  const navigate = useNavigate();

  const { idPedido } = useParams();
  const id = idPedido ? Number(idPedido) : undefined;

  const { data: order, isLoading, isError, error } = useFetchOrderById(id as number);



  const {} = usePedidoStore();
  

















  if(isLoading) {
    return (
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }

  if(isError) {
    return (
      <div>
        <p>Erro ao buscar pedido: {(error as any)?.response?.data?.message ?? "Pedido não encontrado"}</p>
      </div>
    )
  }

  if (!order) {
    return <p>Pedido não encontrado</p>;
  }


  return (

    <section>

      <div className="flex justify-center items-center bg-gray-200 rounded-lg h-12">
        <p className="font-medium text-2xl">Pedido #{order?.id}</p>
      </div>

      <div className="flex w-full gap-2 mt-4">

        <div className="grid gap-1 w-20">
          <Label>Cod</Label>
          <Input disabled value={order?.idCliente}/>
        </div>

        <div className="grid gap-1 w-full">
          <Label>Cliente</Label>
          <Input disabled type="text" value={order?.nomeCliente}/>
        </div>
      </div>

      <p className="font-medium text-2xl my-2">Itens</p>

      <ProdutosPedido/>

          <button 
            onClick={() => {
 
              navigate('/vendas/pedido-de-venda')
            }}
            className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-20 cursor-pointer'
          >
            Adicionar mais produtos
          </button>
  

      {/* Resumo totais pedido */}
      <div className="mb-14">
        <ResumoTotaisPedido/>
      </div>

      {/* Ação Salvar Pedido */}
      <AcaoSalvarPedido/>



    </section>
  )

}

export default EditOrder