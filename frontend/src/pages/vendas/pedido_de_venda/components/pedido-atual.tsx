


import AcoesVendas from '@/components/acoesFooterMobile/acoes-vendas'
import { CheckCircle2Icon, Minus, Plus, Save, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'




const PedidoAtual = () => {

  const navigate = useNavigate()

  const {cart, adicionarItem, diminuirQtdItem, valorTotalPedido} = usePedidoStore();


  return (


    <section>

      <div className='flex items-center mb-4'>

        <div className='flex justify-center items-center h-12 bg-gray-200 w-full rounded-lg shadow'>
          <p className="text-2xl font-medium text-gray-800">Pedido atual</p>
        </div>

      </div>

      {cart.length > 0 ? (
        <>
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
                      <p className="text-lg font-medium">{item.nomeProduto}</p>
                    </div>

                    <Separator/>


                    {item.adicionais.length > 0 ? (

                      <div>
                        <p>acompanhamentos</p>
                        <div className='ml-4'>
                          {item.adicionais.map(( adicional )=> (
                            <p><span className='font-medium'>{adicional.quantidade}x</span> {adicional.nomeComplemento}</p>
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
                    <Trash2/>
                  </button>
                </div>

              </div>

              <div className="flex flex-col justify-between w-full mt-4">

                {/* Base */}
                <div className="flex items-center justify-between">

                  <div className='flex items-center gap-1'>
                    <p className='font-medium'>R$</p>
                    <p className="text-2xl font-bold">{formatarMoedaBRL(item.precoTotal)}</p>
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

          <div className="mt-2 bg-gray-300 rounded-lg p-4">

            <div className="flex justify-between">
              <p>SubTotal</p>
              <p className="font-medium">R$ {valorTotalPedido}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Desconto</p>
              <p className="font-medium text-sm text-red-600">- R$ 20,00</p>
            </div>

          </div>

          <div className="mx-2 border-t-2 border-dashed border-gray-500" />

          <div className="flex justify-between bg-gray-300 rounded-lg p-4 mb-6">
            <p className="font-bold text-lg">Total</p>
            <div className='flex items-center gap-1'>
              <p>R$</p>
              <p className="font-bold text-2xl">{valorTotalPedido}</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/vendas/pedido-de-venda')}
            className='md:hidden w-full bg-fuchsia-200 rounded py-2 text-lg text-fuchsia-700 font-medium border border-fuchsia-400 mb-20'
          >
            Adicionar mais produtos
          </button>

          <div className='hidden sm:block w-full border'>
            <button 
              className='w-full cursor-pointer bg-green-500 text-white font-medium rounded py-3 text-lg hover:bg-green-600'
            >
              Salvar pedido
            </button>
          </div>


          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>

              <div className="mx-auto w-full max-w-sm px-2">
                <DrawerHeader className='p-0'>

                </DrawerHeader>
                <div>
                  <Alert className='text-green-500  flex flex-col items-center text-xl border-0'>
                    <CheckCircle2Icon style={{ width: "60px", height: "60px", flexShrink: 0 }}/>
                    <AlertTitle>Pedido criado com sucesso !</AlertTitle>
                  </Alert>
                </div>
                <DrawerFooter>
                  <Button 
                    className='bg-fuchsia-700 text-lg hover:bg-fuchsia-800'
                    onClick={() => navigate('/vendas/pedido-de-venda')}
                  >
                    Criar novo pedido
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
  
          </Drawer>


          <div className='md:hidden flex w-full h-15 fixed bottom-0 left-0 right-0'>

            <button 
              className='w-full flex flex-col items-center justify-center bg-green-500 text-white cursor-pointer'               
            >
              <div className='flex items-start gap-2'>
                <Save size={28}/>
                <p className='text-2xl font-medium'>Salvar Pedido</p>
              </div>
            </button>

          </div>


        </>

      )
      :
      (
        <>
          <p className='text-center'>Não existem itens</p>
          <AcoesVendas/>
        </>

       )}


    </section>
  
  )
}



export default PedidoAtual