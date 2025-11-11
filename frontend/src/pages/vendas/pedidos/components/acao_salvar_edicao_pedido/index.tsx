import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'


import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import {  PedidoLocalConsumo as PedidoLocalConsumoEnum } from '@/types/sales/sales_order/salesOrder'
import { Button } from '@/components/ui/button'
import { ChevronRight, Loader2Icon, Save, } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePedidoStore } from '@/stores/usePedidoStore'
import { buildPedidoFromCart } from '@/utils/cartToSalesOrder'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useUpdateOrder } from '@/hooks/sales/useOrders'
import { pedidoEmEdicao } from '@/utils/pedidoUtils'
import DrawerSucessSaveOrder from '@/pages/vendas/components/drawer_sucess_save_order'
import ResumoTotaisPedido from '../resumo_totais_pedido'









const AcaoSalvarEdicaoPedido = () => {

  const navigate = useNavigate();
  const [dataSuccessEditOrder, setDataSuccessEditOrder] = useState({});

  const { orderEdit, idPedidoEmEdicao, adicionaLocalConsumoPedido, } = usePedidoStore();
  const [observacao, setObservacao] = useState('');


  const { mutateAsync: updateOrder, isPending } = useUpdateOrder();


  const [openDrawerConfirmarAlteracaoPedido, setOpenDrawerConfirmarAlteracaoPedido] = useState(false);
  const [openDrawerSuccessOrder, setOpenDrawerSuccessOrder] = useState(false);



  
  
  useEffect(() => {
    if (orderEdit?.observacao) {
      setObservacao(orderEdit.observacao);
    }
  }, [orderEdit]);









  const handleSaveEditOrder = async () => {

    const salesOrder = buildPedidoFromCart( orderEdit, observacao );


    try {

      const response = await updateOrder({
        idPedido: Number(idPedidoEmEdicao),
        data: salesOrder,
      });


      if(response.success) {

        setDataSuccessEditOrder({
          idPedido: response.data.idPedido,
          nomeCliente: response.data.nomeCliente,
          valorTotal: response.data.valorTotal,
          message: response.message
        });

  
        setOpenDrawerConfirmarAlteracaoPedido(false);
        setOpenDrawerSuccessOrder(true);
        localStorage.removeItem("@OrderStorage");

          setTimeout(() => {
            navigate('/vendas/pedidos');
          }, 2000);

      }

      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

      toast.error('Erro', {
        description: 'Houve um erro ao editar o pedido.', 
        richColors: true,
        closeButton: true,
        duration: 3000,
        position: "top-right"
      })

    }

  };


  return (
    <div>

      {/* Ação salvar pedido DESKTOP */}
      <div className='hidden sm:block w-full border'>
        <button 
          onClick={handleSaveEditOrder}  
          className='w-full cursor-pointer bg-green-500 text-white font-medium rounded py-3 text-lg hover:bg-green-600'
        >
          Salvar altereção
        </button>
      </div>


      {/* Ação salvar pedido MOBILE */}
      {pedidoEmEdicao() && (
        <div className='
            md:hidden flex items-center w-full gap-2 
            fixed bottom-0 left-0 right-0 
            h-15 bg-white/80 backdrop-blur-md 
            px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
          '>

          <Button 
            variant='destructive' className='w-[50%] text-lg'
            onClick={() => {
              navigate('/vendas/pedidos')
              localStorage.removeItem('@OrderStorage')
            }}
          >
            Cancelar alteração
          </Button>

          <Button
            onClick={() => {
              setOpenDrawerConfirmarAlteracaoPedido(true); 
            }}
            className="w-[50%] text-lg bg-green-500 hover:bg-green-400 justify-between"
          >
            Avançar
            <ChevronRight style={{ width: "30px", height: "30px", flexShrink: 0 }} />
          </Button>

        </div>
      )}

      {/* Drawer confirmação alteração do pedido */}
      <Drawer 
        open={openDrawerConfirmarAlteracaoPedido} onOpenChange={setOpenDrawerConfirmarAlteracaoPedido}              
      >

        <DrawerContent className='px-4'>
                          
          <DrawerHeader className='p-0 my-4'>
            <DrawerTitle className='text-xl mb-2'>Confirmação de alteração</DrawerTitle>                   
          </DrawerHeader>

          <div className='grid gap-6 w-full'>

            {/* Identificação cliente */}
            <div className='grid gap-2'>

              <Label className='text-md'>
                {orderEdit?.idCliente && orderEdit.idCliente !== 1
                  ? 'Cliente'
                  : 'Nome para identificação do pedido'}
              </Label>

              <Input 
                readOnly  
                value={orderEdit?.nomeCliente}          
              />

            </div>
          
            {/* Seleção local de consumo */}
            <div className='grid gap-2'>
              <Label className='text-md'>Local de consumo</Label>
                
              <RadioGroup 
                className='flex' 
                defaultValue="1"
                value={String(orderEdit.localConsumo ? orderEdit.localConsumo : 1)}
                onValueChange={(value) => adicionaLocalConsumoPedido(Number(value))}
              >

                <div className="w-full flex items-center gap-1 bg-fuchsia-600 p-2 rounded text-white">
                  <RadioGroupItem value={String(PedidoLocalConsumoEnum.ESTABELECIMENTO)} id="local"  className='bg-white'/>
                  <Label htmlFor="local" className="whitespace-nowrap">Local</Label>
                </div>

                <div className="w-full flex items-center gap-1 bg-green-500 text-white p-2 rounded">
                  <RadioGroupItem value={String(PedidoLocalConsumoEnum.ENTREGA)} id="entrega"  className='bg-white'/>
                  <Label htmlFor="entrega">Entrega</Label>
                </div>

                <div className="w-full flex items-center gap-1 bg-orange-500 p-2 rounded text-white">
                  <RadioGroupItem value={String(PedidoLocalConsumoEnum.RETIRAR)} id="retirada" className='bg-white'/>
                  <Label htmlFor="retirada">Retirada</Label>
                </div>

              </RadioGroup>

            </div>

            {/* Observação do pedido */}
            <div className='grid gap-2'>
              <Label className='text-md'>Observações</Label>
              <Textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}                    
              />
            </div>

          </div>

          <div className='my-4'>
            <ResumoTotaisPedido/>
          </div>                                                 

          <DrawerFooter className='p-0 mb-4'>
            <Button
              className='flex items-center text-2xl bg-green-500 hover:bg-green-400 w-full h-12'
              disabled={isPending}

              onClick={()=> {
                handleSaveEditOrder();            
              }}
            >
              {isPending && (
                <Loader2Icon
                  className='animate-spin'
                  style={{ width: 30, height: 30, flexShrink: 0 }}
                />
              )}
              Confirmar alteração
            </Button>
          </DrawerFooter>                                                     


        </DrawerContent>

      </Drawer>

      
      {/* Drawer sucesso alterar pedido */}
      <DrawerSucessSaveOrder
        open={openDrawerSuccessOrder} 
        onOpenChange={setOpenDrawerSuccessOrder}
        pedidoInfo={dataSuccessEditOrder} 
      />

        
    </div>
  )
}

export default AcaoSalvarEdicaoPedido