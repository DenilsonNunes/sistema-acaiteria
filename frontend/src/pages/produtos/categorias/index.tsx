import { useCategories } from "@/hooks/categories/useCategories"
import CreateCategoryDialog from "./components/create-category-dialog/create-category-dialog"
import { Separator } from "@/components/ui/separator"
import CreateProductForm from "./components/create-product-step/create-product-form"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import LoadingSpinner from "@/components/loading-spinner"
import { CircleAlert, Copy, SquarePen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { Button } from "@/components/ui/button"





const HomeCategory = () => {

  const {fetchCategories} = useCategories();
  const { data: categories, isLoading, isError } = fetchCategories;


  return (

    <section className="flex flex-col items-center justify-center px-2">


      {!isLoading && !isError && (

        <div className="w-full max-w-6xl">

          <div className="mb-4 mt-4">
            <CreateCategoryDialog/> 
          </div>

          {categories?.map((category, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2 mb-4"
            >
              <p className="text-lg font-medium">{category.descricao}</p>

              <Separator className="bg-gray-300 mb-2" />

              {category.produtos.length > 0 ? (
                <Table className="bg-white rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-center">Preço (R$)</TableHead>
                      <TableHead className="text-center">Status venda</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.produtos.map((product,) => (
                      <TableRow key={product.id}>
                        <TableCell className="flex items-center gap-4">
                          <div className="flex items-center justify-center border w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
                            {product.imagemUrl ? (
                              <img
                                src={product.imagemUrl}
                                alt="Preview"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <span className="text-sm text-gray-500">Sem Foto</span>
                            )}
                          </div>
                          {product.nomeProduto}
                        </TableCell>

                        <TableCell className="text-center">{formatarMoedaBRL(product.preco)}</TableCell>

                        <TableCell className="text-center">
                          {product.status ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-500 px-1.5"
                            >
                              ativo
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-500 px-1.5"
                            >
                              inativo
                            </Badge>
                          )}
                        </TableCell>
                        
                        <TableCell className="flex gap-2 justify-center">

                          <Tooltip>
                            <TooltipTrigger>
                              <button className="cursor-pointer p-0.5  text-blue-600">
                                <Copy size={20} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Duplicar produto</p>
                            </TooltipContent>
                          </Tooltip>


                          <Tooltip>
                            <TooltipTrigger>
                              <button className="cursor-pointer p-0.5  text-orange-600 ">
                                <SquarePen size={20}/>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Editar produto</p>
                            </TooltipContent>
                          </Tooltip>


                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="mt-4">
                  <p className="text-center text-gray-600">
                    Não existe nenhum item cadastrado com essa categoria
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <CreateProductForm category={category} />
              </div>
            </div>
          ))}

        
        </div>

      )}


      {isLoading && (
        <div className="flex items-center justify-center py-15">
          <LoadingSpinner size={100}/>
        </div>
      )}

      {isError && 

        <div className="flex flex-col items-center justify-center mt-4 gap-4">
          <CircleAlert color="red" size={96}/>
          <h1 className="font-medium text-red-600">Erro ao buscar as categorias</h1>
        </div>
      }




    </section>

  )
}

export default HomeCategory

/*
           
*/