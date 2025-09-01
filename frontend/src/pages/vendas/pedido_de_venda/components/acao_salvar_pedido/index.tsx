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
import { InputAutoCompleteCliente } from '../input-autocomplete-cliente'
import { usePedidoStore } from '@/stores/usePedidoStore'
import { Separator } from '@/components/ui/separator'
import ResumoTotaisPedido from '../resumo_totais_pedido'
import { buildPedidoFromCart } from '@/utils/cartToSalesOrder'
import { z } from 'zod'
import { useSales } from '@/hooks/sales/useSales'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateOrder, useUpdateOrder } from '@/hooks/sales/useOrders'





const schema = z.string().nonempty('Por favor, informe o cliente.');




const AcaoSalvarPedido = () => {

  const navigate = useNavigate();


  const [observacao, setObservacao] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [nomeCliente, setNomeCliente] = useState<string>('Consumidor Final');
  


  const {cart, adicionaLocalConsumo, identificarCliente, limparCart, pedidoEmEdicao } = usePedidoStore();
  const { mutateAsync: createOrder, isError, isPending, isSuccess } = useCreateOrder();
  const updateOrder = useUpdateOrder();


  const [openDrawerConfirmarPedido, setOpenDrawerConfirmarPedido] = useState(false);
  const [openDrawerSuccess, setOpenDrawerSuccess] = useState(false);

  const [identificaCliente, setIdentificaCliente] = useState<boolean>( cart.idCliente !== 1 && pedidoEmEdicao ? true : false);


  
  








  useEffect(()=> {

    if(!identificaCliente && !pedidoEmEdicao) {

      identificarCliente({id: 1, nome: nomeCliente})

    } 

  }, [identificaCliente, nomeCliente, identificarCliente, pedidoEmEdicao])

  


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
        setOpenDrawerSuccess(true);
        localStorage.removeItem("@CartStorage");

      }

      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

      toast.error('Criar Pedido', {
        description: 'Houve um erro ao criar o pedido.', 
        richColors: true,
        closeButton: true,
        duration: 3000,
        position: "top-right"
      })

    }

  };


  const handleUpdateSalesOrder = async () => {


    const result = schema.safeParse(inputSearch);

    if(identificaCliente) {

      if (!result.success) {
        setErro(result.error.errors[0].message);
        return;
      }

    } 

    setErro(null);

    const dataOrder = buildPedidoFromCart( cart, observacao );


    try {

      if (pedidoEmEdicao !== null) {

        const response = await updateOrder.mutateAsync({
          idPedido: pedidoEmEdicao,
          data: dataOrder,
        });

        if(response.id) {
          limparCart();
          setOpenDrawerConfirmarPedido(false);
          setOpenDrawerSuccess(true);
          localStorage.removeItem("@CartStorage");
        }

      }


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
            
            if(pedidoEmEdicao) {
              setOpenDrawerConfirmarPedido(true); 

            } else {
              setOpenDrawerConfirmarPedido(true); 
              adicionaLocalConsumo(1);
              identificarCliente({id: 1, nome: nomeCliente})
            }


          }}
          className="md:hidden flex w-full fixed bottom-0 left-0 right-0 text-2xl bg-green-500 hover:bg-green-400  rounded-none h-15"
        >
          <Save style={{ width: "30px", height: "30px", flexShrink: 0 }} />
          {pedidoEmEdicao ? "Salvar AAlterações" : "Salvar Pedido"}
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
                  onValueChange={(value) => adicionaLocalConsumo(Number(value))}
                >

                  <div className="w-full flex items-center gap-1 bg-green-100 p-2 rounded border border-green-600 whitespace-nowrap">
                    <RadioGroupItem value={String(PedidoLocalConsumoEnum.ESTABELECIMENTO)} id="local"  className='bg-white'/>
                    <Label htmlFor="local" className="whitespace-nowrap">Local</Label>
                  </div>

                  <div className="w-full flex items-center gap-1  bg-orange-100 p-2 rounded border border-orange-600">
                    <RadioGroupItem value={String(PedidoLocalConsumoEnum.ENTREGA)} id="entrega"  className='bg-white'/>
                    <Label htmlFor="entrega">Entrega</Label>
                  </div>

                  <div className="w-full flex items-center gap-1 bg-cyan-100 p-2 rounded border border-cyan-600">
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
                //onClick={() => setOpen(false)}
                onClick={()=> {
                  if(pedidoEmEdicao){
                    handleUpdateSalesOrder();
                  } else {
                    handleCreateSalesOrder();
                  }
                }}
              >
                {isPending && (
                  <Loader2Icon
                    className='animate-spin'
                    style={{ width: 30, height: 30, flexShrink: 0 }}
                  />
                )}

                {pedidoEmEdicao ? "Salvar Alteraçõessss" : "Salvar Pedido"}
              </Button>
            </DrawerFooter>                                                     

  
          </DrawerContent>

        </Drawer>

      </>

      {/* Drawer sucesso criar pedido */}
      <Drawer 
        open={openDrawerSuccess} onOpenChange={setOpenDrawerSuccess}                
      >

        <DrawerContent className='px-4'>

          <div className="mx-auto w-full max-w-sm">
                        
            <DrawerHeader className='p-0 my-4'>
              <DrawerTitle className='flex items-center justify-center gap-2 text-lg mb-2 text-green-600'>
                <CircleCheckBig />
                Pedido Criado com Sucesso!
              </DrawerTitle>
              <div className='flex flex-col items-start'>
                <p className='text-gray-700'><strong>Pedido Nº:</strong> {25}</p>
                <p className='text-gray-700'>
                  <strong>Cliente: </strong>
                  Denilson Nunes
                </p>
                <p className='text-gray-700'>
                  <strong>Total: </strong>
                  R$ 27,00
                </p>
              </div>
            </DrawerHeader>
            <DrawerFooter className='p-0 mb-4'>
              <Button
                className='rounded text-lg bg-fuchsia-600 hover:bg-fuchsia-500 w-full'
                onClick={() => { 
                  navigate('/vendas/pedidos')  
                }}
              >
                <ScrollText style={{ width: "22px", height: "22px", flexShrink: 0 }}/>
                Ir para os pedidos
              </Button>
              <Button
                className='rounded text-lg bg-green-500 hover:bg-green-600 w-full'
                onClick={() => { 
                  navigate('/vendas/pedido-de-venda')  
                }}
              >
                <Plus strokeWidth={3}  style={{ width: "22px", height: "22px", flexShrink: 0 }}/>
                Novo pedido
              </Button>
            </DrawerFooter>             

        
          </div>

        </DrawerContent>

      </Drawer>    
        
    </div>
  )
}

export default AcaoSalvarPedido