


import AcoesVendas from '@/components/acoesFooterMobile/acoes-vendas'
import { AlertCircleIcon, ArrowLeft, CircleCheckBig, Loader2Icon, Minus, Plus, Save, ScrollText, Trash2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatarMoedaBRL } from '@/utils/formataMoedaBRL'
import { usePedidoStore } from '@/stores/usePedidoStore'
import { Separator } from '@/components/ui/separator'



import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



import { useSales } from '@/hooks/sales/useSales'
import { buildPedidoFromCart } from '@/utils/cartToSalesOrder'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { InputAutoCompleteCliente } from './input-autocomplete-cliente'
import ResumoTotaisPedido from './resumo-totais-pedido'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { PedidoLocalConsumo as PedidoLocalConsumoEnum, PedidoLocalConsumo } from '@/types/sales/sales_order/salesOrder'
import { z } from 'zod'
import { Input } from '@/components/ui/input'





const PedidoAtual = () => {

  const [identificaCliente, setIdentificaCliente] = useState<boolean>();

  const [clienteId, setClienteId] = useState<number>(1);
  const [nomeCliente, setNomeCliente] = useState<string>('');



  const location = useLocation();
  const pathnameCart = location.pathname.includes('vendas/carrinho')

  const navigate = useNavigate();

  const {cart, adicionarItem, diminuirQtdItem, cliente, valorTotalCart, limparCart} = usePedidoStore();

  const { createSalesOrder } = useSales();
  const { isPending, isError, isSuccess } = createSalesOrder;


  const [openDrawerConfirmarPedido, setOpenDrawerConfirmarPedido] = useState(false);
  const [openDrawerSuccess, setOpenDrawerSuccess] = useState(false);

  const [observacao, setObservacao] = useState('');
  const [localConsumo, setLocalConsumo] = useState<PedidoLocalConsumo>(PedidoLocalConsumoEnum.ESTABELECIMENTO);


  const [inputSearch, setInputSearch] = useState('');
  const [erro, setErro] = useState<string | null>(null);


  const schema = z.string().nonempty('Por favor, informe o cliente.');










  const handleCreateSalesOrder = async () => {


    const result = schema.safeParse(inputSearch);

    if(identificaCliente) {

      if (!result.success) {
        setErro(result.error.errors[0].message);
        return;
      }

    }

    setErro(null);


    const salesOrder = buildPedidoFromCart(
      cart, 
      valorTotalCart, 
      clienteId,  
      nomeCliente,
      localConsumo,
      observacao
    );


    try {

      const response = await createSalesOrder.mutateAsync(salesOrder);

      if(response.id) {
        limparCart();
        setOpenDrawerConfirmarPedido(false);
        setOpenDrawerSuccess(true);
      }

      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

      toast.error('Houve um erro ao criar o pedido!', {
        richColors: true,
        closeButton: true,
        duration: 3000,
        position: "top-right"
      })

    }

  };




  useEffect(()=> {


    if(identificaCliente) {

      setClienteId(cliente?.id);
      setNomeCliente(cliente?.nome);


    } else {

      setClienteId(1);

    }

  }, [identificaCliente, cliente])




  return (

    <section>

      <div className='flex items-center mb-4'>

        <div className="relative h-12 bg-gray-200 w-full rounded-lg shadow flex items-center justify-center">
          {/* Ícone à esquerda */}
          <button className="sm:hidden absolute left-3">
            <ArrowLeft />
          </button>

          {/* Texto centralizado */}
          <p className="text-2xl font-medium text-gray-800 text-center w-full">
            {pathnameCart ?  "Resumo do pedido" : "Pedido atual"}
          </p>
        </div>

      </div>

      {cart.length > 0 ? (
        <>

          {/* Produtos do carrinho */}
          {cart.map((item, index) => (

            <div key={index} className="w-full mb-4 flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-lg">

              <div className='flex justify-between'>

                <div className='flex gap-2'>

                  <div className="flex items-center justify-center border border-gray-300 w-15 h-15 rounded-lg overflow-hidden bg-white">
                    {item.imagemUrl ? (
                      <img
                        src={item.imagemUrl}
                        alt={item.nomeProduto}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-sm text-center text-gray-500">Sem Foto</span>
                    )}
                  </div>

                  <div>
                    {/* Topo */}
                    <div className='flex items-center gap-1'>
                      <p>{item.quantidade}x</p>
                      <p className="text-lg font-medium">{item.nomeProduto} - </p>
                      <p className='text-sm font-medium text-fuchsia-700'>{formatarMoedaBRL(item.preco)}</p>
                    </div>

                    <Separator/>


                    {item.complementos.length > 0 ? (

                      <div>
                        <p>acompanhamentos</p>
                        <div className='ml-4'>
                          {item.complementos.map(( adicional, index )=> (
                            <div key={index} className='flex gap-2 items-center'>
                              <span className='font-medium'>{adicional.quantidade}x</span>
                              <p>{adicional.nomeComplemento}</p>
                              {adicional.preco > 0 && (
                                <span className='text-sm font-medium text-fuchsia-700'>{formatarMoedaBRL(adicional.preco)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    ) : (
                      <p className='text-red-500'>s/acompanhamentos</p>
                    )}

                  </div>

                </div>

                <div>
                  <button className='text-red-500  cursor-pointer'>
                    <Trash2 size={26}/>
                  </button>
                </div>

              </div>

              <div className="flex flex-col justify-between w-full mt-4">

                {/* Base */}
                <div className="flex items-center justify-between">

                  <div className='flex items-end gap-1'>
                    <p className='font-medium'>R$</p>
                    <p className="text-2xl font-bold">{formatarMoedaBRL(item.valorTotal)}</p>
                  </div>            

                  <div className="w-28 flex items-center justify-between">

                    <button
                      type="button"
                      onClick={() => diminuirQtdItem(item)}
                      className="font-bold cursor-pointer text-fuchsia-700"
                    >
                      <Minus size={24} strokeWidth={3} />
                    </button>
                    <span className="w-full font-medium text-center">{item.quantidade}</span>
                    <button
                      type="button"
                      onClick={()=>adicionarItem(item)}
                      className="font-bold cursor-pointer text-fuchsia-700"
                    >
                      <Plus size={24} strokeWidth={3}/>
                    </button>
                  </div>


                </div>

              </div>

            </div>

          ))}

          {/* Resumo totais */}
          <div className='mb-6'>
            <ResumoTotaisPedido/>
          </div>

          <button 
            onClick={() => navigate('/vendas/pedido-de-venda')}
            className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-20 cursor-pointer'
          >
            Adicionar mais produtos
          </button>
          
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
              onClick={() => setOpenDrawerConfirmarPedido(true)}
              className="md:hidden flex w-full fixed bottom-0 left-0 right-0 text-2xl bg-green-500 hover:bg-green-400  rounded-none h-15"
            >
              <Save style={{ width: "30px", height: "30px", flexShrink: 0 }} />
              Salvar pedido
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
                      onChange={(e)=> setNomeCliente(e.target.value)}
                      
                    />
                  )}                          

                  <Separator/>

                  <div className='grid gap-2'>
                    <Label className='text-md'>Local de consumo</Label>
                      
                    <RadioGroup 
                      className='flex' 
                      defaultValue="1"
                      value={String(localConsumo)}
                      onValueChange={(value) => setLocalConsumo(Number(value) as PedidoLocalConsumo)}
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
                    onClick={handleCreateSalesOrder}
                  >
                    {isPending && (
                      <Loader2Icon
                        className='animate-spin'
                        style={{ width: 30, height: 30, flexShrink: 0 }}
                      />
                    )}
                    Salvar pedido
                  </Button>
                </DrawerFooter>                                                     

      
              </DrawerContent>
    
            </Drawer>

          </>
        

        </>

      ) : (
        <>
          <p className='text-center'>Não existem itens</p>

            <AcoesVendas/>
          
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
                  
        </>
      )}


    </section>
  
  )
}



export default PedidoAtual