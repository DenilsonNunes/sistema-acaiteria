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
import { useLocation, useNavigate } from "react-router-dom"
import TablePedidos from "./tablePedidos/table"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"

import { Badge } from "@/components/ui/badge"
import { PedidoLocalConsumo, PedidoStatus } from "@/types/sales/sales_order/salesOrder"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatDateTime } from "@/utils/formateDateAndTime"
import { DeleteButton } from "@/components/button/delete-button"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import { toast } from "sonner"
import { EditButton } from "@/components/button/edit-button"
import { useDeleteSalesOrder, useFetchAllOrders } from "@/hooks/sales/useOrders"
import { AxiosError } from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "./components/status-badge"
import { usePedidoStore } from "@/stores/usePedidoStore"
import type { Orders } from "@/types/sales/orders/orders"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"



















const Pedidos = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const [status, setStatus] = useState("all")
  const [loading, setLoading] = useState(false);



  const { data: orders, isLoading, isError } = useFetchAllOrders(
      status && status !== "all" ? { status } : undefined
  );

  const {
    mutateAsync: deleteOrder, 
    isPending: isPendingDeleteOrder, 
    isError: isErrorDeleleteOrder
  } = useDeleteSalesOrder();

  const { carregarPedidoExistente } = usePedidoStore();




  const [openModalDelteOrder, setOpenModalDelteOrder] = useState(false);
  const [openDrawerSuccess, setOpenDrawerSuccess] = useState(false);

  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null);
  

  const handleEditarPedido = (order: Orders) => {

    setLoading(true);
    carregarPedidoExistente(order);

    setLoading(false);
    navigate(`/vendas/pedidos/${order.id}/editar`);
  }



  useEffect(() => {
    if (location.state?.openDrawerSuccess) {
      setOpenDrawerSuccess(true)
      // limpa o state da URL pra não abrir de novo caso recarregue
      window.history.replaceState({}, document.title)
      localStorage.removeItem('')
    }
  }, [location.state])



  const handleDeleteOrder = async () => {

    if (!pedidoSelecionado) return;

    try {

      const response = await deleteOrder(pedidoSelecionado);

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

        if(error instanceof AxiosError) {
  
          if(error?.message === 'Network Error') {

              toast.error('Erro', {
                description: `Erro de rede. Verifique sua conexão e tente novamente mais tarde`,
                richColors: true,
                closeButton: true,
                duration: 4000,
                position: "top-right"
              })
          }
  
          if(error.response?.data.message) {
  
            const message = error.response.data.message;

              toast.error('Erro', {
                description: `${message}`,
                richColors: true,
                closeButton: true,
                duration: 4000,
                position: "top-right"
              })
  
          }
        
        }

    }

  };








  if(isLoading || isPendingDeleteOrder){
    return (
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }

  if(loading){
    return(
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }


  if(isError) {
    return (
      <div>Tente novamente mais tarde</div>
    )
  }

  if(isErrorDeleleteOrder) {
    return (
      <div>Tente novamente mais tarde</div>
    )
  }







  return (


    <section className="w-full">

      <div className="flex justify-between mb-4">
        
        <p className="font-medium text-2xl">Pedidos</p>


        <Select
          value={status}
          onValueChange={(value) => setStatus(value)}
        
        >
          <SelectTrigger className="sm:hidden font-medium rounded-full bg-gray-200">

            {status !== 'all' && status !== "" && (
              <StatusBadge status={status.toString()} />
            )}

            <SelectValue  placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="1">Aguardando Produção</SelectItem>
            <SelectItem value="2">Em Produção</SelectItem>
            <SelectItem value="3">Concluído Produção</SelectItem>
            <SelectItem value="4">Aguardando retirada</SelectItem>
            <SelectItem value="5">Para entrega</SelectItem>
            <SelectItem value="6">Concluído</SelectItem>
            <SelectItem value="7">Cancelado</SelectItem>
          </SelectContent>
        </Select>


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

        {orders?.length ? (
          <>
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
                        handleEditarPedido(order)
                      }} 
                    />
                  </div>
    
    
                </div>
    

    

                <div className="flex justify-between">

                  <div className="flex gap-2 items-center justify-between">
                    <span className="text-md text-gray-500">Nº Pedido</span>
                    <span className="font-bold text-fuchsia-700">#{order.id}</span>
                  </div>
       

                  <div className="flex gap-2 items-center justify-between">
                    <span className="text-md text-gray-500">Data/hora</span>
                    <span className="text-gray-500">{formatDateTime(order.data_criacao)}</span>
                  </div>

                </div>

    
                <div className="flex items-center gap-2">
                  <span className="text-md text-gray-500">Cliente</span>
                  <p className="font-medium">{order.nomeCliente}</p>            
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <span className="text-md text-gray-500">Valor total</span>
                  <span className="font-bold text-lg text-fuchsia-700">
                    R$ {formatarMoedaBRL(order.valorTotal)}
                  </span>
                </div>

                <Separator/>

                {order.observacao && (

                  <div className="grid mt-4">
                    <Label className="text-md">Observação</Label>
                    <Textarea value={order.observacao ?? ''} readOnly disabled/>
                  </div>
                )}

    
                {/* Local consumo / Status do pedido */}
                <div className="flex justify-between mt-4">
                  {/* Local consumo */}
                  <div className="flex">
          
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
                  <div className="flex">
                    {order.status === PedidoStatus.AGUARDANDO_PRODUCAO ? (
                      <div className="flex gap-2 items-center">
                        <div className=" h-4 w-4 bg-yellow-500 border-4 border-yellow-100 rounded-full"/>
                        <p className="text-yellow-500 font-medium">Aguardando Produção</p>
                      </div>
    
                    ) : order.status === PedidoStatus.EM_PRODUCAO ? (
    
                      <div className="flex gap-2 items-center">
                        <div className=" h-4 w-4 bg-blue-500 border-4 border-blue-100 rounded-full animate-pulse-slow"/>
                        <p className="text-blue-500 font-medium">Em produção</p>
                      </div>
                      
                    ) : order.status === PedidoStatus.CONCLUIDO_PRODUCAO ? (
    
                      <div className="flex gap-2 items-center">
                        <Badge className="p-0 h-4 w-4 bg-green-600 border-4 border-green-100 rounded-full"/>
                        <p className="text-green-600 font-medium">Produção Concluída</p>              
                      </div>
    
                    ) :  order.status === PedidoStatus.PARA_ENTREGA ? (
    
                      <div className="flex gap-2 items-center">
                        <Badge className="p-0 h-4 w-4 bg-violet-500 border-4 border-violet-100 rounded-full"/>
                        <p className="text-violet-500 font-medium">Para entrega</p>              
                      </div>
                
                    ) : order.status === PedidoStatus.AGUARDANDO_RETIRADA ? (
    
                      <div className="flex gap-2 items-center">
                        <Badge className="p-0 h-4 w-4 bg-orange-500 border-4 border-orange-100 rounded-full"/>
                        <p className="text-orange-500 font-medium">Aguardando Retirada</p>              
                      </div>
    
                    ) : order.status === PedidoStatus.CANCELADO ? (
                    
                      <div className="flex gap-2 items-center">
                        <Badge className="p-0 h-4 w-4 bg-red-500  border-4 border-red-100 rounded-full"/>
                        <p className="text-red-500 font-medium">Cancelado</p>              
                      </div>
    
                    ) : (
    
                      <div className="flex gap-2 items-center">
                        <Badge className="p-0 h-4 w-4 bg-gray-500  border-4 border-gray-100 rounded-full"/>
                        <p className="text-gray-500 font-medium">Outro Status</p>              
                      </div>
    
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
    
                    <AccordionContent className="flex flex-col text-balance border-x border-b px-4">
                      <>
                        {order.itensPedido && order.itensPedido.map((item) => (
                          <>
                        
                            <div className='grid'>
      
                              <div className="grid mt-2">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-lg">{item.quantidade}x </p>
                                  <p className="text-lg">{item.produtos.nomeProduto}</p>
                                  <p className="text-md font-medium text-fuchsia-700">R$ {formatarMoedaBRL(Number(item.precoUnitario))}</p>
                                </div>
                                                        
                              </div>
      
                              <div className="grid gap-1 mb-2">
      
                                {item.complementosItem && item.complementosItem.map((compl) => (
                                  <div key={compl.id} className="flex ml-12 gap-2">
                                    <p className="font-medium bg-gray-200 rounded px-1">{compl.quantidade}x</p>
                                    <p>{compl.complementos.nomeComplemento}</p>
                                    {Number(compl.precoUnitario) > 0 && (
                                      <p className="text-fuchsia-700">R$ {formatarMoedaBRL(Number(compl.precoUnitario))}</p>
                                    )}
                                  </div>
                                ))}
      
                              </div>

                              {item.observacaoItem && (<p className="text-muted-foreground">Obs: {item.observacaoItem}</p>)}
                                    
                            </div>
                            <Separator/>
                          
                          </>
                    
                        ))}
                    
                      </>
                      
              
                    </AccordionContent>
    
    
                    
                  </AccordionItem>
              
    
                </Accordion>

              </div>
            ))}
          </>
        ) : (

          !isLoading && (
            <div className="flex justify-center mt-20">
              <p>Nenhum pedido encontrado com este status</p>
            </div>
          ) 

        )}
    

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


