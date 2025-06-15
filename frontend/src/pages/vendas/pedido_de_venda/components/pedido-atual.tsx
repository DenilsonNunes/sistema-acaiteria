import { Button } from '@/components/ui/button'
import { PedidoVendaContext } from '@/contexts/PedidoContext'
import  { useContext } from 'react'




import fotoAcai from '../../../../assets/acai.jpeg'
import AcoesVendas from '@/components/acoesFooter/acoes-vendas'
import { ArrowLeft, ChevronRight, Save, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'




const PedidoAtual = () => {

  const navigate = useNavigate()

  const {cart, adicionarItem, removerItem, valorTotalPedido} = useContext(PedidoVendaContext)


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

        <p className="text-2xl font-medium text-gray-800">Pedido atual</p>

      </div>

      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (

            <div key={index} className="w-full mb-1 flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-lg">

              <div className='flex justify-between'>

                <div className='flex gap-2'>

                  <div>
                    <img src={fotoAcai} alt="Copo açai" className="w-28 h-auto object-cover rounded" />
                  </div>

                  <div>
                    {/* Topo */}
                    <div className='flex items-center gap-1'>
                      <p>{item.quantidade}x</p>
                      <p className="text-lg font-medium">{item.descricao}</p>
                    </div>

                    <div className='ml-4'>
                      <p>acompanhamentos</p>
                      <p><span className='font-medium'>1x</span> Banana</p>
                      <p><span className='font-medium'>1x</span> Granola</p>
                      <p><span className='font-medium'>1x</span> Leite em pó</p>
                      <p><span className='font-medium'>1x</span> Banana</p>
                    </div>
                  </div>

                </div>

                <div>
                  <button className='text-red-500 p-1.5 bg-red-200 rounded'>
                    <Trash2/>
                  </button>
                </div>

              </div>

              <div className="flex flex-col justify-between w-full">

                {/* Base */}
                <div className="flex items-center justify-between">

                  <div className='flex items-center gap-1'>
                    <p className='font-medium'>R$</p>
                    <p className="text-2xl font-bold">{item.precoTotal.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                  </div>


                  <div className="flex items-center gap-2">
                    <Button
                      size="icon" className="w-10 h-10 p-0 text-2xl bg-fuchsia-700 text-white hover:bg-fuchsia-600 cursor-pointer"
                      onClick={() => removerItem(item)}
                    >
                      -
                    </Button>
                    <span className="font-medium text-lg">{item.quantidade}</span>
                    <Button 
                      size="icon" className="w-10 h-10 p-0 text-2xl font-bold bg-fuchsia-700 text-white hover:bg-fuchsia-600 cursor-pointer"
                      onClick={()=>adicionarItem(item)}
                    >
                      +
                    </Button>
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

          <div className="flex justify-between bg-gray-300 rounded-lg p-4 mb-16">
            <p className="font-bold text-lg">Total</p>
            <div className='flex items-center gap-1'>
              <p>R$</p>
              <p className="font-bold text-2xl">{valorTotalPedido}</p>
            </div>
          </div>

          <button className='w-full h-15 flex flex-col items-center justify-center bg-green-500 pl-4 cursor-pointer fixed bottom-0 left-0 right-0 px-4'>
            <div className='flex items-center'>
              <p className='text-2xl font-medium'>Salvar Pedido</p>
              <Save size={36}/>
            </div>
          </button>


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