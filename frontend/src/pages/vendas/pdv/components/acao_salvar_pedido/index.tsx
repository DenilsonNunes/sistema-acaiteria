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
import { CircleCheckBig, Loader2Icon, Plus, Save, ScrollText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InputAutoCompleteCliente } from '../../../pedido_de_venda/components/input-autocomplete-cliente'
import { usePedidoStore } from '@/stores/usePedidoStore'
import { Separator } from '@/components/ui/separator'
import ResumoTotaisPedido from '../../../pedido_de_venda/components/resumo_totais_pedido'
import { buildPedidoFromCart } from '@/utils/cartToSalesOrder'
import { z } from 'zod'
import { useSales } from '@/hooks/sales/useSales'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateOrder, useUpdateOrder } from '@/hooks/sales/useOrders'
import DrawerSucessPedido from '../../../pedido_de_venda/components/drawer_sucess_pedido'
import { useCartStore } from '@/stores/useCartStore'





const schema = z.string().nonempty('Por favor, informe o cliente.');




const AcaoSalvarPedido = () => {

  const navigate = useNavigate();


  const [observacao, setObservacao] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [nomeCliente, setNomeCliente] = useState<string>('Consumidor Final');
  


  const {cart, adicionaLocalConsumoCart, identificarClienteCart, limparCart } = useCartStore();
  const { mutateAsync: createOrder, isError, isPending, isSuccess } = useCreateOrder();
  const updateOrder = useUpdateOrder();


  const [openDrawerConfirmarPedido, setOpenDrawerConfirmarPedido] = useState(false);
  const [openDrawerSuccessOrder, setOpenDrawerSuccessOrder] = useState(false);

  const [identificaCliente, setIdentificaCliente] = useState<boolean>( cart.idCliente !== 1);


  
  










  const handleCreateSalesOrder = async () => {


    const result = schema.safeParse(inputSearch);

    if(identificaCliente) {

      if (!result.success) {
        setErro(result.error.errors[0].message);
        return;
      }

    } 

    setErro(null);

    const salesOrder = buildPedidoFromCart( cart, observacao );


    try {

      const response = await createOrder(salesOrder);

      if(response.id) {
  
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
      <>                 
        <Button
          onClick={() => {
  
            setOpenDrawerConfirmarPedido(true); 
            adicionaLocalConsumoCart(1);
            identificarClienteCart({id: 1, nome: nomeCliente})
        
          }}
          className="md:hidden flex w-full fixed bottom-0 left-0 right-0 text-2xl bg-green-500 hover:bg-green-400  rounded-none h-15"
        >
          <Save style={{ width: "30px", height: "30px", flexShrink: 0 }} />
          Salvar Pedido
        </Button>

        <Drawer 
          open={openDrawerConfirmarPedido} onOpenChange={setOpenDrawerConfirmarPedido}              
        >

          <DrawerContent className='px-4'>
                            
            <DrawerHeader className='p-0 my-4'>
              <DrawerTitle className='text-xl mb-2'>Confirmação do pedido</DrawerTitle>                   
            </DrawerHeader>

            <div className='grid gap-2 w-full'>

              <div className='grid gap-2'>
                <Label className='text-md'>Identificar o cliente ?</Label>
                <div className="w-full flex gap-2">

                  <button
                    className={`
                      cursor-pointer py-1 rounded w-full border
                      ${!identificaCliente ? 'bg-red-500 text-white font-medium' : ''}
                    `}
                    onClick={() => {
                      setIdentificaCliente(false);
                    }}
                  >
                    Não
                  </button>
                  <button 
                    className={`
                      cursor-pointer py-1 rounded w-full border font-medium
                      ${identificaCliente ? 'bg-green-500 text-white' : ''}
                    `}
                    onClick={() => {
                      setIdentificaCliente(true);
                    }}
                  >
                    Sim
                  </button>

                </div>

              </div>
              

              {identificaCliente ? (
                <div>
                  <InputAutoCompleteCliente  
                    onChange={setInputSearch}  
                    limparErro={() => erro && setErro(null)}
                    erro={erro}
                  />
                  {erro && <p className="text-red-500 text-sm">{erro}</p>}
                </div>

              ) : (
                <Input
                  placeholder='informe o nome do cliente para controle...'
                  value={nomeCliente}
                  onChange={(e)=> setNomeCliente(e.target.value)}
                  
                />
              )}                          

              <Separator/>

              <div className='grid gap-2'>
                <Label className='text-md'>Local de consumo</Label>
                  
                <RadioGroup 
                  className='flex' 
                  defaultValue="1"
                  value={String(cart.localConsumo ? cart.localConsumo : 1)}
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

              </div>

              <Separator/>

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

      </>

      {/* Drawer sucesso criar pedido */}
      <DrawerSucessPedido 
        open={openDrawerSuccessOrder} 
        onOpenChange={setOpenDrawerSuccessOrder} 
      />

        
    </div>
  )
}

export default AcaoSalvarPedido