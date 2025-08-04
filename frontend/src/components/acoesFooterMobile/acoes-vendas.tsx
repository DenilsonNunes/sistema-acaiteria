import { House, Plus, ReceiptText } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const AcoesVendas = () => {

  const navigate = useNavigate();


  const location = useLocation();
  const pathnamePedidos = location.pathname;







  return (
    <div className="sm:hidden flex items-center h-18 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 shadow border-t z-50">

        <div className="flex flex-col items-center">

          <button 
            className={
              ` flex flex-col items-center cursor-not-allowed font-medium 
                ${pathnamePedidos.includes('/vendas/home') && 'text-fuchsia-600'}
              `
            }
            onClick={()=> {
              navigate('/vendas/home')
            }}
          >
            <House size={26}/>
            Home
          </button>


        </div>

        <div className="flex flex-col items-center transform -translate-y-6">
          <Link to='/vendas/pedido-de-venda'>
            <button className="rounded-full h-16 w-16 flex items-center justify-center bg-fuchsia-700 shadow-lg border-4 border-fuchsia-200 text-white mb-2">
              <Plus size={32} />
            </button>   
          </Link>
          <p className="font-medium">Novo Pedido</p>
        </div>

        <div className="flex flex-col items-center">
          <button 
            className={
              ` flex flex-col items-center cursor-not-allowed font-medium 
                ${pathnamePedidos.includes('vendas/pedidos') && 'text-fuchsia-600'}
              `
            }
            onClick={()=> {
              navigate('/vendas/pedidos')
            }}
          >
            <ReceiptText size={26} />
            Pedidos
          </button>
        </div>


    </div>
  )
}

export default AcoesVendas