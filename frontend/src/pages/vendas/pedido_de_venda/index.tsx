


import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/loading-spinner";
import { CloudAlert } from "lucide-react";
import PedidoAtual from "./components/pedido-atual";
import AcoesVendas from "@/components/acoesFooterMobile/acoes-vendas";
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";
import { useCategories } from "@/hooks/categories/useCategories";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";












const PedidoDeVenda = () => {

  const { fetchCategories } = useCategories();
  const {data: categories, isLoading, isError} = fetchCategories;




  if(isLoading) {

    return (
      <section className="w-full h-screen  flex items-center justify-center">
        <LoadingSpinner size={120}/>
      </section>
    )

  }

  
  if(isError) {

    return (
      <section className="w-full px-4 h-screen  flex items-center justify-center">
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
      
        <div className="py-2 px-2">

          <Tabs defaultValue={categories?.length ? String(categories[0].id) : undefined}>
            <TabsList className="h-12 flex justify-start  w-full overflow-x-auto scrollbar-hide whitespace-nowrap shadow">
              {categories && categories.map((category, index) => (
                <TabsTrigger 
                  key={index} 
                  value={String(category.id)}
                  className={"data-[state=active]:text-fuchsia-600"}
                >
                  {category.descricao}
                </TabsTrigger>

              ))}
            </TabsList>

            {categories && categories.map((category, index) => (
              <TabsContent key={index} value={String(category.id)}>

                {category.produtos.length ? (   

                  <div className="w-full bg-gray-100 h-screen pt-4 rounded-lg shadow">

                    <p className="text-2xl font-medium ml-4 mb-4">{category.descricao}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 px-2">

                      {category.produtos.map((product, index) => (

                        <Link 
                          key={index} to={`/vendas/pedido-de-venda/produto/${product.id}`}                          
                        >

                          <div className="flex flex-col p-1 shadow-md bg-white rounded">

                            <div className="flex items-center h-40 justify-center border rounded-lg overflow-hidden bg-gray-100">

                              {product.imagemUrl ? (
                                <img
                                  src={product.imagemUrl}
                                  alt={product.nomeProduto}
                                  className="w-full object-cover rounded"
                                />
                              ) : (
                                <span className="text-lg text-gray-500">Sem Foto</span>
                              )}

                            </div>
                            
                            <div>
                              <p className="text-lg font-bold text-gray-700">{product.nomeProduto}</p>
                              <p className="text-gray-600">{product.descricao}</p>
                              <p className="mt-4 text-lg font-bold">
                                R$ {formatarMoedaBRL(product.preco)}
                              </p>
                              
                            </div>

                          </div>
                        
                        </Link>


                      ))}

                    </div>
                    
                  </div>

                ) : (
                  <p className="text-muted-foreground italic">
                    Nenhum produto nesta categoria.
                  </p>
                )}
              </TabsContent>
            ))}

          </Tabs>
        </div>

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