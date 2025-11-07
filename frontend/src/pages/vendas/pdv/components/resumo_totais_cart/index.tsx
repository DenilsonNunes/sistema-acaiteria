import { useCartStore } from "@/stores/useCartStore";
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";





const ResumoTotaisCart = () => {




  const { cart } = useCartStore();





  return (
   
    <section>

      <div className="bg-gray-300 rounded-lg py-2 px-4 sm:py-4">

        <div className="flex justify-between">
          <p>SubTotal</p>
          <p className="font-medium">R$ {formatarMoedaBRL(cart.valorTotalCart)}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Desconto</p>
          <p className="font-medium text-sm text-red-600">- R$ {formatarMoedaBRL(0)}</p>
        </div>

      </div>

      <div className="mx-2 border-t-2 border-dashed border-gray-500" />

      <div className="flex justify-between bg-gray-300 rounded-lg py-2 px-4 sm:py-4">
        <p className="font-bold text-lg">Total</p>
        <div className='flex items-center gap-1'>
          <p>R$</p>
          <p className="font-bold text-2xl">{formatarMoedaBRL(cart.valorTotalCart)}</p>
        </div>
      </div>

    </section>

  )
}

export default ResumoTotaisCart