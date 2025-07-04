import { Button } from '@/components/ui/button'
import { PedidoVendaContext } from '@/contexts/PedidoContext'
import  { useContext } from 'react'




import fotoAcai from '../../../../assets/acai.jpeg'
import AcoesVendas from '@/components/acoesFooterMobile/acoes-vendas'
import { ArrowLeft, Minus, Plus, Save, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatarMoedaBRL } from '@/utils/formataMoedaBRL'




const PedidoAtual = () => {

  const navigate = useNavigate()

  const {cart, adicionarItem, removerItem, valorTotalPedido} = useContext(PedidoVendaContext);


  return (


    <div>

      <div className='flex items-center mb-4'>

        <button
          onClick={() => navigate('/vendas/pedido-de-venda')}
          className="md:hidden rounded-full h-10
          
          w-10 flex items-center justify-center bg-white shadow shadow-black/80 text-black mr-22"
        >
          <ArrowLeft size={26} />
        </button>

        <div className='flex justify-center items-center h-12 bg-gray-200 mt-2 w-full rounded-lg shadow'>
          <p className="text-2xl font-medium text-gray-800">Pedido atual</p>
        </div>


      </div>

      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (

            <div key={index} className="w-full mb-1 flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-lg">

              <div className='flex justify-between'>

                <div className='flex gap-2'>

                  <div className="flex items-center justify-center border w-18 h-18 rounded-lg overflow-hidden bg-gray-100">
                    {5 === 6? (
                      <img
                        src=""
                        alt=""
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

                    <div className='ml-4'>
                      <p>acompanhamentos</p>
                      {item.adicionais.map(( adicional)=> (
                        <p><span className='font-medium'>{adicional.quantidade}x</span> {adicional.nomeComplemento}</p>
                      ))}
                    </div>
                  </div>

                </div>

                <div>
                  <button className='text-red-500 p-1.5 bg-red-200 rounded-full cursor-pointer hover:border border-red-400'>
                    <Trash2/>
                  </button>
                </div>

              </div>

              <div className="flex flex-col justify-between w-full">

                {/* Base */}
                <div className="flex items-center justify-between">

                  <div className='flex items-center gap-1'>
                    <p className='font-medium'>R$</p>
                    <p className="text-2xl font-bold">{formatarMoedaBRL(item.precoTotal)}</p>
                  </div>


                  <div className="flex items-center gap-4">

                    <button
                      className="bg-fuchsia-700 text-white border-2 border-fuchsia-300 rounded-full cursor-pointer"
                      onClick={() => removerItem(item)}
                    >
                      <Minus size={24} />
                    </button>

                    <span className="font-medium text-lg">{item.quantidade}</span>

                      <button
                        onClick={()=>adicionarItem(item)}
                        className="bg-fuchsia-700 text-white border-2 border-fuchsia-300 rounded-full  cursor-pointer"
                      >
                        
                        <Plus size={24} />
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

          <div className='md:block flex w-full border'>
            <button 
              className='w-full cursor-pointer bg-green-500 text-white font-medium rounded py-3 text-lg hover:bg-green-600'
            >
              Salvar pedido
            </button>
          </div>


          <div className='md:hidden flex w-full h-15 fixed bottom-0 left-0 right-0'>

            <button 
              className='w-full flex flex-col items-center justify-center bg-blue-500 text-white cursor-pointer'
              onClick={() => navigate('/vendas/pedido-de-venda')}  
            >
              <div className='flex items-center'>
                <ArrowLeft size={26} />
                <p className='text-lg font-medium'>Escolher mais itens</p>
              </div>

            </button>

            <button 
              className='w-full flex flex-col items-center justify-center bg-green-600 text-white cursor-pointer'               
            >
              <div className='flex items-center gap-2'>
                <p className='text-2xl font-medium'>Salvar Pedido</p>
                <Save size={30}/>
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


    </div>
  
  )
}

export default PedidoAtual