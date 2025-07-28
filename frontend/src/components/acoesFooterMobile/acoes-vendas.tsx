import { House, Plus, ReceiptText } from "lucide-react"
import { Link } from "react-router-dom"

const AcoesVendas = () => {
  return (
    <div className="sm:hidden flex items-center h-18 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 shadow border-t z-50">

        <div className="flex flex-col items-center">
          <button>
            <House size={28}/>
          </button>
          <p className="font-bold">Home</p>
        </div>

        <div className="flex flex-col items-center transform -translate-y-5.5">
          <Link to='/vendas/pedido-de-venda'>
            <button className="rounded-full h-16 w-16 flex items-center justify-center bg-fuchsia-700 shadow-lg border-4 border-fuchsia-200 text-white mb-2">
              <Plus size={32} />
            </button>   
          </Link>
          <p className="font-bold">Novo Pedido</p>
        </div>

        <div className="flex flex-col items-center">
          <button>
            <ReceiptText size={28}/>
          </button>
          <p className="font-bold">Pedidos</p>
        </div>


    </div>
  )
}

export default AcoesVendas