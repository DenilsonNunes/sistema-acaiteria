import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useChangeKitchenOrderStatus, useFetchAllOrders } from "@/hooks/sales/useOrders"
import { PedidoLocalConsumo, type PedidoStatus } from "@/types/sales/sales_order/salesOrder"
import { formatHours } from "@/utils/formateDateAndTime"
import { ChevronRight, Clock4, HandHelping, Store, Truck } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"





const HomeMonitorPreparo = () => {

  const [idOrder, setIdOrder] = useState<number>(0)

  const {data: orders} = useFetchAllOrders();
  
  const updateOrder = useChangeKitchenOrderStatus();


  const handleUpdateStatusOrder = async (idOrder: number, status: number) => {


    try {

      await updateOrder.mutateAsync({
        idOrder: idOrder,
        status: status
      });

   
      toast.success('Pedido alterado com sucesso', {
        richColors: true,
        closeButton: true,
        duration: 3000,
        position: "top-right"
      })


      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

      toast.error('Alterar Pedido', {
        description: 'Houve um erro ao alterar o pedido.', 
        richColors: true,
        closeButton: true,
        duration: 3000,
        position: "top-right"
      })

    }

  };



  return (
    <section className="w-full h-screen">

      <h1 className="text-2xl mb-4">Monitor de preparação</h1>


      <div className="grid grid-cols-3 gap-2">

        <div className="bg-yellow-100 border border-yellow-400 rounded shadow p-2">

          <div className="border-b border-y-amber-400 mb-4 py-1">
            <p className="font-medium text-yellow-800">Aguardando produção</p>
          </div>


          {orders && 
            orders.filter(order => order.status === 1)
            .map((order) => (

              <div className="w-full max-w-sm grid gap-2 bg-white border rounded-lg p-2 mb-2">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-lg">Pedido #{order.id}</p>
                    <p className="text-gray-500"><span className=" text-gray-500 mr-1">Cliente:</span>{order.nomeCliente}</p>
                  </div>

                  
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white"
                  >
                    <Clock4/>
                    {formatHours(order.data_criacao)}
                  </Badge>


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

                <Separator/>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full mt-2"
                >
              
                  <AccordionItem value="item-1">

                    <AccordionTrigger className="flex py-1 px-4 items-center bg-gray-200 hover:no-underline rounded-none">
                      <div className="flex flex-col w-full">
                        <p className="font-medium text-lg">Itens</p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-2">
                      {order.itensPedido.map((item) => (
                        <div className="grid mb-2">
                          <div className="flex gap-2">
                            <p>{item.quantidade}x</p>
                            <p>{item.produtos.nomeProduto}</p>
                          </div>
                          {item.complementosItem.map((compl)=> (
                            <div className="flex ml-4 text-gray-500 gap-0.5">
                              <p >{compl.quantidade}x</p>
                              <span className={`${Number(compl.precoUnitario) > 0 && "text-fuchsia-600"}`}>{compl.complementos.nomeComplemento}</span> 
                            </div>
                          ))}
                        
                        </div>

                      ))}
            
                    </AccordionContent>


                    
                  </AccordionItem>
              

                </Accordion>

                <div className="grid gap-1">
                  <Label>Observação:</Label>
                  <Textarea disabled>{order.observacao}</Textarea>
                </div>

                <div>
                  <button 
                    className="flex justify-center w-full bg-blue-500 hover:bg-blue-400 text-white rounded py-1 font-medium cursor-pointer"
                    onClick={() => {
                      handleUpdateStatusOrder(order.id, 2)
                    }}
                    >
                    Avançar pedido
                    <ChevronRight/>
                  </button>
                </div>

              </div>

          ))}

        </div>

        <div className="bg-blue-100 border border-blue-500  rounded shadow p-2">

          <div className="border-b border-y-blue-400 mb-4 py-1"> 
            <p className="font-medium text-blue-800">Em produção</p>
          </div>

          {orders && 
            orders.filter(order => order.status === 2)
            .map((order) => (

              <div className="w-full max-w-sm grid gap-2 bg-white border rounded-lg p-2 mb-2">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-lg">Pedido #{order.id}</p>
                    <p className="text-gray-500"><span className=" text-gray-500 mr-1">Cliente:</span>{order.nomeCliente}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white"
                  >
                    <Clock4/>
                    {formatHours(order.data_criacao)}
                  </Badge>

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

                <Separator/>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full mt-2"
                >
              
                  <AccordionItem value="item-1">

                    <AccordionTrigger className="flex py-1 px-4 items-center bg-gray-200 hover:no-underline rounded-none">
                      <div className="flex flex-col w-full">
                        <p className="font-medium text-lg">Itens</p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-2">
                      {order.itensPedido.map((item) => (
                        <div className="grid mb-2">
                          <div className="flex gap-2">
                            <p>{item.quantidade}x</p>
                            <p>{item.produtos.nomeProduto}</p>
                          </div>
                          {item.complementosItem.map((compl)=> (
                            <div className="flex ml-4 text-gray-500 gap-0.5">
                              <p >{compl.quantidade}x</p>
                              <span className={`${Number(compl.precoUnitario) > 0 && "text-fuchsia-600"}`}>{compl.complementos.nomeComplemento}</span> 
                            </div>
                          ))}
                        
                        </div>

                      ))}
            
                    </AccordionContent>


                    
                  </AccordionItem>
              

                </Accordion>


                <div className="grid gap-1">
                  <Label>Observação:</Label>
                  <Textarea disabled>{order.observacao}</Textarea>
                </div>

                <Separator/>

                <div>
                  <button 
                    className="flex justify-center w-full bg-green-500 hover:bg-green-400 text-white rounded py-1 font-medium cursor-pointer"
                    onClick={()=> (handleUpdateStatusOrder(order.id, 3))}
                    >
                    Concluir produção
                    <ChevronRight/>
                  </button>
                </div>

              </div>

          ))}

        </div>

        <div className="bg-green-100 border border-green-500  rounded shadow p-2">

          <div className="border-b border-y-green-500 mb-4 py-1">
            <p className="font-medium text-green-800">Concluída produção</p>
          </div>

            {orders && 
              orders.filter(order => order.status === 3)
              .map((order) => (

                <div className="w-full max-w-sm grid gap-2 bg-white border rounded-lg p-2 mb-2">

                  <div className="flex items-start gap-2 justify-between">

                    <div>
                      <p className="font-medium text-lg">Pedido #{order.id}</p>
                      <p className="text-gray-500"><span className=" text-gray-500 mr-1">Cliente:</span>{order.nomeCliente}</p>
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white"
                    >
                      <Clock4/>
                      {formatHours(order.data_criacao)}
                    </Badge>

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

                  <Separator/>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full mt-2"
                  >
                
                    <AccordionItem value="item-1">

                      <AccordionTrigger className="flex py-1 px-4 items-center bg-gray-200 hover:no-underline rounded-none">
                        <div className="flex flex-col w-full">
                          <p className="font-medium text-lg">Itens</p>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="p-2">
                        {order.itensPedido.map((item) => (
                          <div className="grid mb-2">
                            <div className="flex gap-2">
                              <p>{item.quantidade}x</p>
                              <p>{item.produtos.nomeProduto}</p>
                            </div>
                            {item.complementosItem.map((compl)=> (
                              <div className="flex ml-4 text-gray-500 gap-0.5">
                                <p >{compl.quantidade}x</p>
                                <span className={`${Number(compl.precoUnitario) > 0 && "text-fuchsia-600"}`}>{compl.complementos.nomeComplemento}</span> 
                              </div>
                            ))}
                          
                          </div>

                        ))}
              
                      </AccordionContent>


                      
                    </AccordionItem>
                

                  </Accordion>


                  <div className="grid gap-1">
                    <Label>Observação:</Label>
                    <Textarea disabled>{order.observacao}</Textarea>
                  </div>

                </div>

            ))}

        </div>

      </div>


    </section>
  )
}

export default HomeMonitorPreparo