// context/PedidoContext.tsx
import type { Cart, ItemPedido } from "@/types/pedido_de_venda/pedidoVenda"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { createContext, useEffect, useState, type ReactNode } from "react"




type PedidoContextType = {
  cart: Cart[]
  adicionarItem: (item: ItemPedido) => void
  removerItem: (itemParaRemover: Cart) => void
  limparPedido: () => void
  valorTotalPedido: string
}


interface PedidoProviderProps {
  children: ReactNode;
}





export const PedidoVendaContext = createContext({} as PedidoContextType)




const PedidoProvider = ({ children }: PedidoProviderProps) => {

  
  const [cart, setCart] = useState<Cart[]>([])
  const [valorTotalPedido, setValorTotalPedido] = useState('')


  // Quando o carrinho muda, recalcula o total
  useEffect(() => {
    calculaTotalPedido(cart);
  }, [cart]);


  const adicionarItem = (newItem: ItemPedido) => {

    console.log("OQue chega", newItem);

    setCart((prevCart) => {

      const itemExistente = prevCart.find((item) => item.id === newItem.id);

      console.log('Cheguei aqui', itemExistente);

      if (!itemExistente) {
        // Se não existe, adiciona novo
        return [
          ...prevCart,
          {
            id: newItem.id,
            nomeProduto: newItem.nomeProduto,
            quantidade: 1,
            preco: newItem.preco,
            precoTotal: newItem.preco,
            adicionais: [],
          },
        ];

        
      } else {
        // Se já existe, atualiza quantidade e preço
        return prevCart.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
                precoTotal: ((item.quantidade + 1) * item.preco),
              }
            : item
        );
      }


    });
    
  };


  const removerItem = (itemParaRemover: Cart) => {

    setCart((prevCart) => {

      const itemExistente = prevCart.find((item) => item.id === itemParaRemover.id);

      if (!itemExistente) return prevCart; // não faz nada se o item não existir

      if (itemExistente.quantidade > 1) {
        // Diminui a quantidade e atualiza o total
        return prevCart.map((item) =>
          item.id === itemParaRemover.id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
                precoTotal: (item.quantidade - 1) * item.preco,
              }
            : item
        );
      } else {
        // Remove o item se a quantidade for 1
        return prevCart.filter((item) => item.id !== itemParaRemover.id);
      }
      
    });
  };


  const limparPedido = () => {
    setCart([])
  }


const calculaTotalPedido = (items: Cart[]) => {

  const total = items.reduce((acc, item) => {
    return acc + (Number(item.precoTotal));
  }, 0);

  const totalFormatado = formatarMoedaBRL(total);
  setValorTotalPedido(totalFormatado);

};

  return (
    <PedidoVendaContext.Provider
      value={{ adicionarItem, removerItem, limparPedido, cart, valorTotalPedido }}
    >
      {children}
    </PedidoVendaContext.Provider>
  )
}

export default PedidoProvider