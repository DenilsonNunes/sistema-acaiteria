import { Plus, ReceiptText } from "lucide-react"
import { Link } from "react-router-dom"

const AcoesVendas = () => {
  return (
    <div className="sm:hidden flex items-center h-18 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 shadow border-t z-50">

        <div className="flex flex-col items-center">
          <button>
            <ReceiptText size={28}/>
          </button>
          <p className="font-medium">Home</p>
        </div>

        <div className="flex flex-col items-center">
          <Link to='/vendas/pedido-de-venda'>
            <button className="rounded-full h-14 w-14 flex items-center justify-center bg-fuchsia-700 shadow-lg shadow-fuchsia-300 text-white transform -translate-y-4">
              <Plus size={32} />
            </button>   
          </Link>
          <p className="transform -translate-y-3.5 font-medium">Criar Pedido</p>
        </div>

        <div className="flex flex-col items-center">
          <button>
            <ReceiptText size={28}/>
          </button>
          <p className="font-medium">Pedidos</p>
        </div>


    </div>
  )
}

export default AcoesVendas