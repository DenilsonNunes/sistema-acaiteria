
import { useContext, useEffect, useState } from "react";


import fotoAcai from '../../../assets/acai.jpeg'
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import type { Product } from "@/types/produtos/product";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/loading-spinner";
import { CloudAlert } from "lucide-react";
import { PedidoVendaContext } from "@/contexts/PedidoContext";
import PedidoAtual from "./components/pedido-atual";
import AcoesVendas from "@/components/acoesFooter/acoes-vendas";












const PedidoDeVenda = () => {

  const {adicionarItem, removerItem, cart} = useContext(PedidoVendaContext)


  const [categorySelected, setCategorySelected] = useState('Açai');

  const categorias = [
    'Açai', 
    'Sorvetes', 
    'MilkShake',
    'Lanches',
    'Pizzas',
    'Bebidas',
    'Salgados'
  ]



  const { data: products, isLoading, isError} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/produtos');
      return response.data;
    },
  });







  if(isLoading) {

    return (
      <section className="w-full h-screen  flex items-center justify-center">
        <LoadingSpinner size={120}/>
      </section>
    )

  }

  
  if(isError) {

    return (
      <section className="w-full h-screen  flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center text-orange-700  bg-orange-200 p-4 rounded-lg border-2 border-orange-300 ">
          <CloudAlert size={60} />
          <p className="text-lg">Erro ao carregar a página, tente novamente mais tarde!</p>
        </div>
      </section>
    )

  }



  return (


    <section className="flex w-full">


      {/* SELEÇÃO DOS PRODUTOS */}
      <div className="flex w-full lg:w-[70%] flex-col">

        <div className="bg-gray-200 py-2">
          <ul className="flex ml-2 gap-6 overflow-x-auto scrollbar-hide">
            {categorias.map((item) => (
              <li key={item} 
                className={`cursor-pointer border-b-2 font-medium 
                  ${categorySelected === item ? "border-b-fuchsia-600" : "border-b-transparent"}
                  ${categorySelected === item && "text-fuchsia-600"}
                `}
                onClick={() => setCategorySelected(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {categorySelected === 'Açai' && (

          <div className="w-full bg-gray-100 h-screen pt-4">
            <p className="text-2xl font-medium ml-4 mb-4">Açai</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 px-2">

              {products && products.map((product, index) => (

                <Link 
                  key={index} to={`/vendas/pedido-de-venda/produto/${product.id}`}
                  onClick={()=> adicionarItem(product)}
                >

                  <div className="flex flex-col p-1 shadow-md bg-white rounded">

                    <div>
                      <img src={fotoAcai}  alt="Copo açai" className="w-full h-44 object-cover rounded"/>
                    </div>
                    
                    <div>
                      <p className="text-lg font-bold text-gray-700">{product.descricao}</p>
                      <p className="text-gray-600">{product.qtdAcompanhamentos > 0 && `Com ${product.qtdAcompanhamentos} acompanhamentos`}</p>
                      <p className="text-gray-600">{product.categoria?.descricao === 'Açai' && '3 camadas'}</p>
                      <p className="mt-4 text-lg font-bold">
                        {Number(product.preco).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                      
                    </div>

                  </div>
                
                </Link>


              ))}

            </div>


          </div>

        )}

      </div>

      {/* PEDIDO ATUAL*/}
      <div className="w-[30%] overflow-y-auto h-screen px-2 hidden lg:block">
        <PedidoAtual/>
      </div>

      <AcoesVendas/>

    </section>


  )
}

export default PedidoDeVenda