import AcoesVendas from "@/components/acoesFooterMobile/acoes-vendas"
import { Button } from "@/components/ui/button"
import { HandHelping, Plus, Store, Truck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import TablePedidos from "./tablePedidos/table"
import { useSales } from "@/hooks/sales/useSales"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { Input } from "@/components/ui/input"

import { Badge } from "@/components/ui/badge"
import { PedidoLocalConsumo, PedidoStatus } from "@/types/sales/sales_order/salesOrder"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"






const Pedidos = () => {

  const navigate = useNavigate();
  


    const { fetchOrders } = useSales();
    const {data: orders, isLoading, isError} = fetchOrders;





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
          <div className="grid p-4 border rounded-xl shadow-md mb-3 bg-white">

            <div className="flex items-center justify-between">
              <span className="text-md text-gray-500">Nº Pedido</span>
              <span className="font-bold text-fuchsia-700">#{order.id}</span>
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

              <div className="flex w-full">
      
                {order.localConsumo === PedidoLocalConsumo.ESTABELECIMENTO ? (
                  <Badge className="w-22 flex gap-2 bg-fuchsia-700 rounded leading-tight">
                    <Store style={{ width: 16, height: 16 }} strokeWidth={2} />
                    Local
                  </Badge>
                ) : order.localConsumo === PedidoLocalConsumo.RETIRAR ? (
                  <Badge className="w-22 flex gap-2 bg-orange-500 rounded leading-tight">
                    <HandHelping style={{ width: 16, height: 16 }} strokeWidth={2}/>
                    Retirar
                  </Badge>
                ) : order.localConsumo === PedidoLocalConsumo.ENTREGA && (
                  <Badge className="w-22 flex gap-2 bg-green-600 rounded leading-tight">
                    <Truck style={{ width: 16, height: 16}} strokeWidth={2}/>
                    Entrega
                  </Badge>
                )}
      
              </div>
            
              <div>
                {order.status === PedidoStatus.AGUARDANDO_PRODUCAO ? (
                  <Badge className="w-48 text-md bg-yellow-100 text-yellow-600  px-1.5 rounded">
                    Aguardando Produção
                  </Badge>
                ) : order.status === PedidoStatus.EM_PRODUCAO ? (
                  <div
                    className="w-48 text-md bg-blue-100 text-blue-500  py-1 rounded leading-tight font-semibold text-center animate-pulse-slow"
                  >
                    Em Produção
                  </div>
                ) : order.status === PedidoStatus.CONCLUIDO_PRODUCAO ? (
                  <Badge className="w-48 text-md bg-green-100 text-green-600 px-1.5 rounded leading-tight">
                    Produção Concluída
                  </Badge>
                ) :  order.status === PedidoStatus.PARA_ENTREGA ? (

                  <Badge className="w-48 text-md bg-violet-200 text-violet-500 px-1.5 rounded leading-tight">
                    Para Entrega
                  </Badge>
            
                ) : order.status === PedidoStatus.AGUARDANDO_RETIRADA ? (

                  <Badge className="w-48 text-md bg-orange-100 text-orange-500 px-1.5 rounded leading-tight">
                    Aguardando Retirada
                  </Badge>

                ) : order.status === PedidoStatus.CANCELADO ? (

                  <Badge className="w-48 bg-red-100 text-red-500 px-1.5 rounded leading-tight">
                    Cancelado
                  </Badge>

                ) : (
                  <Badge className="w-48 bg-gray-100 text-gray-500 px-1.5 rounded leading-tight">
                    Outro Status
                  </Badge>
                )}
              </div>             

            </div>
            
            <Accordion
              type="single"
              collapsible
              className="w-full mt-2"
              defaultValue="item-1"
            >
          
              <AccordionItem value="item-1">

                <AccordionTrigger className="flex py-1 px-4 items-center bg-gray-200 hover:no-underline rounded-t rounded-b-none">
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-lg">Itens</p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 text-balance py-4 border-x border-b">
                  
                  <p>TEste</p>
             
                </AccordionContent>


                
              </AccordionItem>
          

            </Accordion>

            
          
          </div>
        ))}


      </div>





      <AcoesVendas/>
    </section>
  )
}

export default Pedidos