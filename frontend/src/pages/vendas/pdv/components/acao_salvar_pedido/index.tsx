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
import { useState } from 'react'
import ResumoTotaisPedido from '../resumo_totais_cart'
import { buildPedidoFromCart } from '@/utils/cartToSalesOrder'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useCreateOrder } from '@/hooks/sales/useOrders'
import { useCartStore } from '@/stores/useCartStore'
import { pedidoEmEdicao } from '@/utils/pedidoUtils'
import DrawerSucessSaveOrder from '@/pages/vendas/components/drawer_sucess_save_order'
import { SelecaoLocalDeEntrega } from '@/pages/vendas/components/selecao-local-de-entrega'









const AcaoSalvarPedido = () => {


  const [observacao, setObservacao] = useState('');
  const [dataSuccessoPedido, setDataSuccessoPedido] = useState({});
  


  const {cart, adicionaLocalConsumoCart, limparCart, identificarClienteCart } = useCartStore();
  const { mutateAsync: createOrder, isPending} = useCreateOrder();


  const [openDrawerConfirmarPedido, setOpenDrawerConfirmarPedido] = useState(false);
  const [openDrawerSuccessOrder, setOpenDrawerSuccessOrder] = useState(false);



  
  










  const handleCreateSalesOrder = async () => {

    const salesOrder = buildPedidoFromCart( cart, observacao );


    try {

      const response = await createOrder(salesOrder);

      if(response.success) {
        
        setDataSuccessoPedido({
          idPedido: response.data.idPedido,
          nomeCliente: response.data.nomeCliente,
          valorTotal: response.data.valorTotal,
          message: response.message
        });

        limparCart();
        setOpenDrawerConfirmarPedido(false);
        setOpenDrawerSuccessOrder(true);
        localStorage.removeItem("@CartStorage");

      }

      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

      toast.error('Erro', {
        description: 'Houve um erro ao criar o pedido.', 
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
          onClick={handleCreateSalesOrder}  
          className='w-full cursor-pointer bg-green-500 text-white font-medium rounded py-3 text-lg hover:bg-green-600'
        >
          Salvar pedido
        </button>
      </div>




      {/* Ação salvar pedido MOBILE */}
      {pedidoEmEdicao() ? (
        <div>
          <Button
            onClick={() => {
              setOpenDrawerConfirmarPedido(true); 
              adicionaLocalConsumoCart(1);
            }}
            className="md:hidden flex w-full fixed bottom-0 left-0 right-0 text-2xl bg-green-500 hover:bg-green-400  rounded-none h-15"
          >
            <Save style={{ width: "30px", height: "30px", flexShrink: 0 }} />
            Salvar alterações
          </Button>
        </div>
      ) :(
        <>
          <Button
            onClick={() => {
              setOpenDrawerConfirmarPedido(true); 
              adicionaLocalConsumoCart(1);
              if(!cart.idCliente){
                identificarClienteCart({id: 1, nome: 'Consumidor Final'})
              }
            }}
            className="md:hidden flex w-full justify-between fixed bottom-0 left-0 right-0 text-2xl bg-green-500 hover:bg-green-400 rounded-none h-15"
          >
            Avançar
            <ChevronRight className="flex-shrink-0" style={{ width: '46px', height: '46px' }} />
          </Button>
        </>
      )}     

      {/* Drawer confirmação do pedido */}
      <Drawer 
        open={openDrawerConfirmarPedido} onOpenChange={setOpenDrawerConfirmarPedido}              
      >

        <DrawerContent className='px-4'>
                          
          <DrawerHeader className='p-0 my-4'>
            <DrawerTitle className='text-xl mb-2'>Confirmação do pedido</DrawerTitle>                   
          </DrawerHeader>

          <div className='grid gap-6 w-full'>

            <div className='grid gap-2'>
              <Label className='text-md'>
                {cart?.idCliente && cart.idCliente !== 1
                  ? 'Cliente'
                  : 'Nome para identificação do pedido'}
              </Label>

              {cart?.idCliente !== 1 && (
                <Input 
                  readOnly  
                  value={cart?.nomeCliente}          
                />
              )}

              {cart?.idCliente === 1 && (
                <Input   
                  defaultValue={cart?.nomeCliente}
                   onChange={(e) => identificarClienteCart({id: 1, nome:e.target.value})}         
                />
              )}

            </div>

            {/* Seleção local de consumo */}
            <div className='grid gap-2'>
              <Label className='text-md'>Local de consumo</Label>
                
              <RadioGroup 
                className='flex' 
                defaultValue="1"
                value={String(cart?.localConsumo ? cart.localConsumo : 1)}
                onValueChange={(value) => adicionaLocalConsumoCart(Number(value))}
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

              <SelecaoLocalDeEntrega/>

            </div>

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
                handleCreateSalesOrder();            
              }}
            >
              {isPending && (
                <Loader2Icon
                  className='animate-spin'
                  style={{ width: 30, height: 30, flexShrink: 0 }}
                />
              )}
              Salvar Pedido
            </Button>
          </DrawerFooter>                                                     


        </DrawerContent>

      </Drawer>

      {/* Drawer sucesso criar pedido */}
      <DrawerSucessSaveOrder
        open={openDrawerSuccessOrder} 
        onOpenChange={setOpenDrawerSuccessOrder}
        pedidoInfo={dataSuccessoPedido} 
      />

        
    </div>
  )
}

export default AcaoSalvarPedido