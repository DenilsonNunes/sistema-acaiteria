import { DollarSign, ShoppingCart, UsersRound } from "lucide-react"



const Home = () => {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2 ">

      <div className="grid sm:grid-cols-2 gap-4  lg:grid-cols-3">

        <div className="flex flex-col p-4 gap-4 items-start justify-start rounded-xl border border-gray-200 shadow-md">

          <div className="w-full flex items-end gap-2">
            
            <div className="text-gray-500">
              <DollarSign size={30}/>
            </div>
            <p className="text-2xl font-medium text-gray-500 p-0 m-0">Vendas do dia</p>

          </div>
          
          <p className="text-4xl font-medium text-fuchsia-600">2.500,00</p>

        </div>

        <div className="flex flex-col p-4 gap-4 items-start justify-start rounded-xl border border-gray-200 shadow-md">

          <div className="w-full flex items-end gap-2">
            <div className="text-gray-500">
              <UsersRound size={30}/>
            </div>
            <p className="text-2xl font-medium text-gray-500 p-0 m-0">Clientes</p>
          </div>

          <p className="text-4xl font-medium text-fuchsia-600">+2</p>

        </div>

        <div className="flex flex-col p-4 gap-4 items-start justify-start rounded-xl border border-gray-200 shadow-md">

          <div className="w-full flex items-end gap-2">
            <div className="text-gray-500 ">
              <ShoppingCart size={30}/>
            </div>
            <p className="text-2xl font-medium text-gray-500">Pedidos</p>
          </div>


          <p className="text-4xl font-medium text-fuchsia-600">18</p>
   

        </div>

      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min shadow-md" />
    </div>
  )
}

export default Home









