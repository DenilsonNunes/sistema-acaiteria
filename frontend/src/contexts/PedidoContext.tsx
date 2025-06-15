// context/PedidoContext.tsx
import { createContext, useEffect, useState, type ReactNode } from "react"


type AdicionalItem = {
  id: number;
  descricao: string;
  quantidade: number;
}

type ItemPedido = {
  id: number;
  descricao: string;
  preco: number;
  precoTotal: number;
  quantidade: number;
  adicionais: AdicionalItem[]
}


type PedidoContextType = {
  cart: ItemPedido[]
  adicionarItem: (item: ItemPedido) => void
  removerItem: (itemParaRemover: ItemPedido) => void
  limparPedido: () => void
  valorTotalPedido: string
}


interface PedidoProviderProps {
  children: ReactNode;
}





export const PedidoVendaContext = createContext({} as PedidoContextType)




const PedidoProvider = ({ children }: PedidoProviderProps) => {

  
  const [cart, setCart] = useState<ItemPedido[]>([])
  const [valorTotalPedido, setValorTotalPedido] = useState('')


  // Quando o carrinho muda, recalcula o total
  useEffect(() => {
    calculaTotalPedido(cart);
  }, [cart]);


  const adicionarItem = (newItem: ItemPedido) => {

    setCart((prevCart) => {

      const itemExistente = prevCart.find((item) => item.id === newItem.id);

      if (!itemExistente) {
        // Se não existe, adiciona novo
        return [
          ...prevCart,
          {
            id: newItem.id,
            descricao: newItem.descricao,
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


  const removerItem = (itemParaRemover: ItemPedido) => {

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


const calculaTotalPedido = (items: ItemPedido[]) => {
  const total = items.reduce((acc, item) => {
    return acc + (item.precoTotal);
  }, 0);

  const totalFormatado = total.toLocaleString('pt-br', {minimumFractionDigits: 2})
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