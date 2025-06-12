
import { useState } from "react";


import fotoAcai from '../../../assets/acai.jpeg'
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import type { Product } from "@/types/produtos/product";
import AcompanhamentosDialog from "./escolha-acompanhamentos-dialog";












const PedidoDeVenda = () => {


  const [opeAcompanhamentos, setOpenAcompanhamentos] = useState(false);


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






  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/produtos');
      return response.data;
    },
  });


  console.log('Produtos', products)



  return (


    <section className="flex w-full">

      {!opeAcompanhamentos && (

        <>
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

                  {products && products.map((product) => (

                    <div 
                      key={product.id} className="flex flex-col p-1 shadow-md bg-white rounded"
                      onClick={()=> setOpenAcompanhamentos(true)}
                    >

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
                  ))}

                </div>


              </div>

            )}

          </div>

          {/* PEDIDO ATUAL*/}
          <div className="w-[30%] overflow-y-auto h-screen px-2 hidden lg:block">

            <p className="text-2xl font-medium  mb-6 text-gray-800">Pedido atual</p>

            <div className="w-full mb-4 flex items-center justify-between gap-2">

              <div>
                <img src={fotoAcai} alt="Copo açai" className="w-28 h-auto object-cover rounded" />
              </div>

              <div className="flex flex-col justify-between h-22 w-full">
                {/* Topo */}
                <p className="text-lg font-medium">Copo 300ML</p>

                {/* Base */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">R$ 13,00</p>

                  <div className="flex items-center gap-2">
                    <Button size="icon" className="w-6 h-6 p-0 text-lg bg-fuchsia-700 text-white hover:bg-fuchsia-600 cursor-pointer">
                      -
                    </Button>
                    <span className="font-medium">4</span>
                    <Button size="icon" className="w-6 h-6 p-0 text-lg font-bold bg-fuchsia-700 text-white hover:bg-fuchsia-600 cursor-pointer">
                      +
                    </Button>
                  </div>
                </div>
              </div>

            </div>

            <div className="w-full flex items-center justify-between gap-2">

              <div>
                <img src={fotoAcai} alt="Copo açai" className="w-28 h-auto object-cover rounded" />
              </div>

              <div className="flex flex-col justify-between h-22 w-full">
                {/* Topo */}
                <p className="text-lg font-medium">Copo 300ML</p>

                {/* Base */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">R$ 13,00</p>

                  <div className="flex items-center gap-2">
                    <Button size="icon" className="w-6 h-6 p-0 text-lg bg-fuchsia-700 text-white hover:bg-fuchsia-600">
                      -
                    </Button>
                    <span className="font-medium">4</span>
                    <Button size="icon" className="w-6 h-6 p-0 text-lg font-bold bg-fuchsia-700 text-white hover:bg-fuchsia-600">
                      +
                    </Button>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-2 bg-gray-300 rounded-lg p-4">

              <div className="flex justify-between">
                <p>SubTotal</p>
                <p className="font-medium">R$ 105,00</p>
              </div>

              <div className="flex items-center justify-between">
                <p>Desconto</p>
                <p className="font-medium text-sm text-red-600">- R$ 20,00</p>
              </div>

            </div>

            <div className="mx-2 border-t-2 border-dashed border-gray-500" />

            <div className="flex justify-between bg-gray-300 rounded-lg p-4">
              <p className="font-bold">Total</p>
              <p className="font-medium">R$ 98,00</p>
            </div>

          </div>

        </>


      )}

      {opeAcompanhamentos && (

        <AcompanhamentosDialog/>  

      )}

      
      
      



    </section>


  )
}

export default PedidoDeVenda