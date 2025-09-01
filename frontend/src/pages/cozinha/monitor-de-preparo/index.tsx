import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Clock4 } from "lucide-react"


const pedidos = [
  {
    idPedido: 245,
    cliente: "Denilson Nunes",
    produtos: [
      { 
        id: 5, 
        descricao: "Copo 500ML", 
        qtd: 2,
        adicionais: [
          {id: 4, nomeAdicional: "Leite condensado", qtd: 1},
          {id: 2, nomeAdicional: "Banana", qtd: 1},
          {id: 8, nomeAdicional: "Leite condensado", qtd: 1},
          {id: 9, nomeAdicional: "Granola", qtd: 1},
        ]
      },
      { 
        id: 2, 
        descricao: "Copo 400ML", 
        qtd: 1,
        adicionais: [
          {id: 4, nomeAdicional: "Leite condensado", qtd: 1},
          {id: 2, nomeAdicional: "Banana", qtd: 1},
          {id: 8, nomeAdicional: "Leite condensado", qtd: 1},
          {id: 9, nomeAdicional: "Granola", qtd: 1},
        ]
      },
    ]
  }
]




const HomeMonitorPreparo = () => {

  return (
    <section className="w-full h-screen">

      <h1 className="text-2xl mb-4">Monitor de preparação</h1>


      <div className="grid grid-cols-3 gap-2">

        <div className="bg-yellow-100 border border-yellow-400 rounded shadow p-2">

          <div className="border-b border-y-amber-400 mb-4 py-1">
            <p className="font-medium text-yellow-800">Aguardando preparação</p>
          </div>


    

          {pedidos.map((pedido) => (

            <div className="w-full max-w-sm grid gap-2 bg-white border rounded-lg p-2">

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-lg">Pedido: #{pedido.idPedido}</p>
                  <p className="text-gray-500"><span className=" text-gray-500 mr-1">Cliente:</span>{pedido.cliente}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white"
                >
                  <Clock4/>
                  22:10
                </Badge>
              </div>

              <Separator/>



              <div>

                <p className="font-medium">items</p>
                
                {pedido.produtos.map((produto) => (
                  <>
                    <div className="flex gap-2">
                      <p>{produto.qtd}x</p>
                      <p>{produto.descricao}</p>
                    </div>
                    {produto.adicionais.map((add)=> (
                      <p className="ml-4 text-gray-500">{add.qtd}x {add.nomeAdicional}</p>
                    ))}
                  
                  </>

                ))}

              </div>

              <Separator/>

              <div>
                <p className="text-sm">Obs:</p>
              </div>

              <Separator/>

              <div>
                <button 
                  className="flex justify-center w-full bg-blue-500 hover:bg-blue-400 text-white rounded py-1 font-medium cursor-pointer"
                  >
                  Avançar pedido
                  <ChevronRight/>
                </button>
              </div>

            </div>

          ))}

        </div>



        <div className="bg-blue-100 border border-blue-500 text-blue-800 rounded shadow px-2">

          <div className="border-b border-y-blue-400 mb-4 py-1"> 
            <p className="font-medium">Em preparação</p>
          </div>

          <div>
            <button 
              className="flex justify-center w-full bg-green-500 hover:bg-green-400 text-white rounded py-1 font-medium cursor-pointer"
              >
              Concluir pedido
              <ChevronRight/>
            </button>
          </div>
          
        </div>

        <div className="bg-green-100 border border-green-500 text-green-800  rounded shadow">

          <div className="border-b border-y-green-500 mb-4 py-1">
            <p className="font-medium">Finalizado</p>
          </div>

        </div>

      </div>


    </section>
  )
}

export default HomeMonitorPreparo