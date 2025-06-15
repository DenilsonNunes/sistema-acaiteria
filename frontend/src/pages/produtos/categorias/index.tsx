import { useCategories } from "@/hooks/useCategories"
import CreateCategoryDialog from "./components/create-category-dialog"
import { Separator } from "@/components/ui/separator"
import CreateProductCategory from "./components/create-product-category-dialog"
import CreateProductCategoryDialog from "./components/create-product-category-dialog"




const HomeCategory = () => {

  const {data: categories} = useCategories()


  
  return (

    <section className="mx-4 mt-2">

      <div className="mb-4">
        <CreateCategoryDialog/> 
      </div>


      {categories?.map((category)=> (
        <div className="w-full bg-gray-100 border border-gray-300 rounded p-2 mb-4">

          <p className="text-lg font-medium">{category.descricao}</p>

          <Separator className="bg-gray-300"/>

          <div className="mt-4">
            <p className="text-center text-gray-600">Não exite nem um item cadastrado com essa categoria</p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <CreateProductCategoryDialog category={category}/>
          </div>

        </div>
      ))}


    </section>

  )
}

export default HomeCategory

/*
           
*/