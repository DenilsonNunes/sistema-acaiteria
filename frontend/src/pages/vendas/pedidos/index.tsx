import { HandHelping, Plus, Store, Truck } from "lucide-react"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


import AcoesVendas from "@/components/acoesFooterMobile/acoes-vendas"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import TablePedidos from "./tablePedidos/table"
import { useSales } from "@/hooks/sales/useSales"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"

import { Badge } from "@/components/ui/badge"
import { PedidoLocalConsumo, PedidoStatus } from "@/types/sales/sales_order/salesOrder"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatDateTime } from "@/utils/formateDateTime"
import { DeleteButton } from "@/components/button/delete-button"
import { useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import { toast } from "sonner"
import { EditButton } from "@/components/button/edit-button"
import { usePedidoStore } from "@/stores/usePedidoStore"
import { useDeleteSalesOrder, useFetchAllOrders } from "@/hooks/sales/useOrders"






const Pedidos = () => {

  const navigate = useNavigate();


  const { data: orders, isLoading, isError } = useFetchAllOrders();
  const deleteOrder = useDeleteSalesOrder();




  const { carregarPedidoExistente } = usePedidoStore();

  const [openModalDelteOrder, setOpenModalDelteOrder] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null);
  





  const handleDeleteOrder = async () => {

    if (!pedidoSelecionado) return;

    try {

      const response = await deleteOrder.mutateAsync(pedidoSelecionado);

      toast.success('Deletar pedido', {
        description: `${response.message}`,
        richColors: true,
        closeButton: true,
        duration: 4000,
        position: "top-right"
      })

        
      setOpenModalDelteOrder(false);
      setPedidoSelecionado(null);


      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

     const message = error.response.data.message;

      toast.error('Deletar pedido', {
        description: `${message}`,
        richColors: true,
        closeButton: true,
        duration: 4000,
        position: "top-right"
      })

    }

  };








  if(isLoading){
    return (
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }

  if(isError) {
    return (
      <div>Tente novamente mais tarde</div>
    )
  }
  



  return (


    <section>

      <div className="flex justify-between mb-4">
        <p className="font-medium text-2xl">Pedidos</p>
        <Button
          className="hidden sm:flex items-center gap-2 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-600"
          onClick={() => {
            navigate('/vendas/pedido-de-venda');
          }}
        >
          <Plus size={24} strokeWidth={3}/>
          Novo pedido
        </Button>
      </div>


      {/* Tabela pedidos DESKTOP */}
      <div className="hidden sm:block">
        <TablePedidos/>
      </div>

      {/* Pedidos MOBILE */}
      <div className="sm:hidden mb-25">
    
        {orders && orders.map((order) => (   
          <div className="grid px-4 pb-4 border rounded-xl shadow-md mb-3 bg-white">

            <div className="flex gap-2 justify-end">

              <div className="flex my-2">
                <DeleteButton 
                  size={26}  
                  disabled={order.status != 1}
                  onClick={()=> {
                    setOpenModalDelteOrder(true);
                    setPedidoSelecionado(order.id)
                  }} 
                />
              </div>

              <div className="my-2">
                <EditButton 
                  size={26}
                  disabled={order.status != 1}
                  onClick={()=> {
                    carregarPedidoExistente(order);
                    navigate(`/vendas/pedidos/${order.id}/editar`);
                
                  }} 
                />
              </div>


            </div>

            <div className="flex items-center justify-between">
              <span className="text-md text-gray-500">Nº Pedido</span>
              <span className="font-bold text-fuchsia-700">#{order.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-md text-gray-500">Data/hora</span>
              <span className="text-gray-500">{formatDateTime(order.data_criacao)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-md text-gray-500">Cliente</span>
              <p className="font-medium">{order.nomeCliente}</p>            
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-md text-gray-500">Valor total</span>
              <span className="font-bold text-lg text-fuchsia-700">
                R$ {formatarMoedaBRL(order.valorTotal)}
              </span>
            </div>

            <div className="flex justify-between">
              {/* Local consumo */}
              <div className="flex w-full">
      
                {order.localConsumo === PedidoLocalConsumo.ESTABELECIMENTO ? (
                  <Badge className="w-22 flex gap-2 bg-fuchsia-700 rounded-2xl">
                    <Store style={{ width: 16, height: 16 }} strokeWidth={2} />
                    Local
                  </Badge>
                ) : order.localConsumo === PedidoLocalConsumo.RETIRAR ? (
                  <Badge className="w-22 flex gap-2 bg-orange-500  rounded-2xl">
                    <HandHelping style={{ width: 16, height: 16 }} strokeWidth={2}/>
                    Retirar
                  </Badge>
                ) : order.localConsumo === PedidoLocalConsumo.ENTREGA && (
                  <Badge className="w-22 flex gap-2 bg-green-600  rounded-2xl">
                    <Truck style={{ width: 16, height: 16}} strokeWidth={2}/>
                    Entrega
                  </Badge>
                )}
      
              </div>

              {/* Status do pedido */}
              <div>
                {order.status === PedidoStatus.AGUARDANDO_PRODUCAO ? (
                  <Badge className="w-48 text-md bg-yellow-100 text-yellow-600  px-1.5  rounded-2xl">
                    Aguardando Produção
                  </Badge>
                ) : order.status === PedidoStatus.EM_PRODUCAO ? (
                  <div
                    className="w-48 text-md bg-blue-100 text-blue-500  py-1  rounded-2xl leading-tight font-semibold text-center animate-pulse-slow"
                  >
                    Em Produção
                  </div>
                ) : order.status === PedidoStatus.CONCLUIDO_PRODUCAO ? (
                  <Badge className="w-48 text-md bg-green-100 text-green-600 px-1.5  rounded-2xl leading-tight">
                    Produção Concluída
                  </Badge>
                ) :  order.status === PedidoStatus.PARA_ENTREGA ? (

                  <Badge className="w-48 text-md bg-violet-200 text-violet-500 px-1.5  rounded-2xl leading-tight">
                    Para Entrega
                  </Badge>
            
                ) : order.status === PedidoStatus.AGUARDANDO_RETIRADA ? (

                  <Badge className="w-48 text-md bg-orange-100 text-orange-500 px-1.5  rounded-2xl leading-tight">
                    Aguardando Retirada
                  </Badge>

                ) : order.status === PedidoStatus.CANCELADO ? (

                  <Badge className="w-48 bg-red-100 text-red-500 px-1.5  rounded-2xl leading-tight">
                    Cancelado
                  </Badge>

                ) : (
                  <Badge className="w-48 bg-gray-100 text-gray-500 px-1.5  rounded-2xl leading-tight">
                    Outro Status
                  </Badge>
                )}
              </div>             

            </div>
            
            <Accordion
              type="single"
              collapsible
              className="w-full mt-2 shadow"
            >
          
              <AccordionItem value="item-1">

                <AccordionTrigger className="flex py-1 px-4 items-center bg-gray-200 hover:no-underline rounded-t rounded-b-none">
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-lg">Itens</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance border-x border-b px-2">
                  <>
                    {order.itensPedido && order.itensPedido.map((item) => (
                      <div 
                        className={`grid  ${order.itensPedido.length > 1 && 'border-b'}`}
                      >

                        <div className="grid mx-4 mt-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-lg">{item.quantidade}x </p>
                            <p className="text-lg">{item.produtos.nomeProduto}</p>
                            <p className="text-md font-medium text-fuchsia-700">R$ {formatarMoedaBRL(Number(item.precoUnitario))}</p>
                          </div>
                      
                        
                        </div>

                        <div className="grid mb-2">

                          {item.complementosItem && item.complementosItem.map((compl) => (
                            <div key={compl.id} className="flex ml-12 gap-2">
                              <p className="font-medium">{compl.quantidade}x</p>
                              <p>{compl.complementos.nomeComplemento}</p>
                              {Number(compl.precoUnitario) > 0 && (
                                <p className="text-fuchsia-700">R$ {formatarMoedaBRL(Number(compl.precoUnitario))}</p>
                              )}
                            </div>
                          ))}

                        </div>

                      </div>
                
                    ))}
                
                  </>
                  
          
                </AccordionContent>


                
              </AccordionItem>
          

            </Accordion>

          
          
          </div>
        ))}

        <AlertDialog open={openModalDelteOrder} onOpenChange={setOpenModalDelteOrder}>

          <AlertDialogContent className="grid gap-20">

            <AlertDialogHeader className="p-0">
              <AlertDialogTitle className="text-2xl">Confirmação</AlertDialogTitle>
              <AlertDialogDescription className="text-lg">
               Deseja realmente deletar o pedido: {pedidoSelecionado} ?
              </AlertDialogDescription>
            </AlertDialogHeader>


            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-fuchsia-700 hover:bg-fuchsia-800"
                onClick={handleDeleteOrder}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialog>


      </div>

      <AcoesVendas/>
    </section>
  )
}

export default Pedidos