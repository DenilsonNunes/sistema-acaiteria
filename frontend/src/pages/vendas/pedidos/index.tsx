import AcoesVendas from "@/components/acoesFooterMobile/acoes-vendas"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import TablePedidos from "./tablePedidos/table"






const Pedidos = () => {

  const navigate = useNavigate();
  
  return (


    <section>

      <div className="flex justify-between mb-4">
        <p className="font-medium text-2xl">Pedidos</p>
        <Button
          className="hidden sm:flex items-center gap-2 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-600"
          onClick={() => {
            navigate('/vendas/pedido-de-venda');
          }}
        >
          <Plus />
          Novo pedido
        </Button>
      </div>

      <div>
        <TablePedidos/>
      </div>

      <AcoesVendas/>
    </section>
  )
}

export default Pedidos