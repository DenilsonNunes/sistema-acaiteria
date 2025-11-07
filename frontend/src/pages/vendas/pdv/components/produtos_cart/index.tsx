import { EditButton } from "@/components/button/edit-button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/useCartStore"
import type { ItemCart } from "@/types/sales/cart/cart"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"








const ProdutosCart = () => {

  const navigate = useNavigate();


  const { cart, diminuirQtdItemCart, adicionarItemCart, selecionarItemParaEditarCart, removerItemCart } = useCartStore();
  


  const handleEditarItemCart = (item: ItemCart) => {
    selecionarItemParaEditarCart(item);
    // Redireciona para a página de produto
    navigate(`/vendas/pdv/produto/${item.id}/selecao-acompanhamentos`);
  }


  return (

    <section>
             
      {cart?.itens?.map((item, index) => (

        <div key={index} className="w-full mb-4 flex flex-col bg-gray-100 border border-gray-300 p-2 rounded-lg">

          <div className='flex justify-between'>
            <div className='flex gap-2'>

              {/* Foto */}
              <div className="flex items-center justify-center border border-gray-300 w-15 h-15 rounded-lg overflow-hidden bg-white">
                {item.imagemUrl ? (
                  <img
                    src={item.imagemUrl}
                    alt={item.nomeProduto}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-sm text-center text-gray-500">Sem Foto</span>
                )}
              </div>

              {/* Detalhes */}
              <div>
                <div className='flex items-center gap-1'>
                  <p>{item.quantidade}x</p>
                  <p className="text-lg font-medium">{item.nomeProduto} - </p>
                  <p className='text-sm font-medium text-fuchsia-700'>
                    {formatarMoedaBRL(item.precoUnitario)}
                  </p>
                </div>

                <Separator />

                {(item.complementos && item.complementos.length > 0) ? (
                  <div>
                    <p>acompanhamentos</p>
                    <div className="ml-4">
                      {item.complementos.map((adicional, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="font-medium">{adicional.quantidade}x</span>
                          <p>{adicional.nomeComplemento}</p>
                          {adicional.precoUnitario > 0 && (
                            <span className="text-sm font-medium text-fuchsia-700">
                              {formatarMoedaBRL(adicional.precoUnitario)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">s/acompanhamentos</p>
                )}


              </div>
            </div>

            {/* Ações */}
            <div>
              <button className='text-red-500 cursor-pointer'>
                <Trash2 size={26} onClick={()=> removerItemCart(item.uuid)}/>
              </button>
              <EditButton 
                size={26} 
                onClick={() => handleEditarItemCart(item)}
              />
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex flex-col justify-between w-full mt-4">
            <div className="flex items-center justify-between">
              <div className='flex items-end gap-1'>
                <p className='font-medium'>R$</p>
                <p className="text-2xl font-bold">
                  {formatarMoedaBRL(item.precoUnitario)}
                </p>
              </div>

              <div className="w-28 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => diminuirQtdItemCart(item)}
                  className="font-bold cursor-pointer text-fuchsia-700"
                >
                  <Minus size={24} strokeWidth={3} />
                </button>
                <span className="w-full font-medium text-center">{item.quantidade}</span>
                <button
                  type="button"
                  onClick={() => adicionarItemCart(item)}
                  className="font-bold cursor-pointer text-fuchsia-700"
                >
                  <Plus size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>

      ))}


    </section>


  )
}

export default ProdutosCart