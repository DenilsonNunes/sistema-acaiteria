// context/PedidoContext.tsx

import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { createContext, useEffect, useState, type ReactNode } from "react"








interface ItemAdicional {
  id: number;
  nomeComplemento: string;
  quantidade: number;
  preco: number;
}




type ItemPedido = {
  id: number;
  nomeProduto: string;
  preco: number;
  adicionais?: ItemAdicional[]
}

type Cart = {

  id: number;
  nomeProduto: string;
  preco: number;
  precoTotal: number;
  quantidade: number;
  adicionais: ItemAdicional[]

}










type PedidoContextType = {
  cart: Cart[]
  adicionarItem: (item: ItemPedido) => void
  removerItem: (itemParaRemover: Cart) => void
  limparPedido: () => void
  valorTotalPedido: string

  addAdicional: (adicional: ItemAdicional) => void
  adicionaisProduto: ItemAdicional[]
}


interface PedidoProviderProps {
  children: ReactNode;
}





export const PedidoVendaContext = createContext({} as PedidoContextType)




const PedidoProvider = ({ children }: PedidoProviderProps) => {

  
  const [cart, setCart] = useState<Cart[]>([])
  const [adicionaisProduto, setAdicionaisProdutos] = useState<ItemAdicional[]>([]);
  const [valorTotalPedido, setValorTotalPedido] = useState('')


  // Quando o carrinho muda, recalcula o total
  useEffect(() => {
    calculaTotalPedido(cart);
  }, [cart]);



  


  const adicionarItem = (newItem: ItemPedido) => {


    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === newItem.id);

      if (!itemExistente) {
        // Se o item ainda não existe, adiciona com os adicionais
        return [
          ...prevCart,
          {
            id: newItem.id,
            nomeProduto: newItem.nomeProduto,
            quantidade: 1,
            preco: Number(newItem.preco),
            precoTotal: Number(newItem.preco),
            adicionais: newItem.adicionais || [],
          },
        ];
      } else {
        // Se o item já existe, atualiza quantidade e precoTotal
        return prevCart.map((item) => {
          if (item.id === newItem.id) {
            // Atualiza a quantidade do produto e o precoTotal
            const novaQuantidade = item.quantidade + 1;
            const novoPrecoTotal = novaQuantidade * Number(item.preco);

            // Mantém os adicionais do item inalterados (sem somar quantidades)
            return {
              ...item,
              quantidade: novaQuantidade,
              precoTotal: novoPrecoTotal,
              adicionais: item.adicionais, // Não altera os adicionais
            };
          }

          return item;
        });
      }
    });


  };


const addAdicional = (newAddOn: ItemAdicional) => {

  setAdicionaisProdutos(prevAdd => {
    // Garantir que prevAdd não seja undefined
    if (!prevAdd) {
      prevAdd = [];
    }

    const existeAdicional = prevAdd.find(item => item.id === newAddOn.id);

    if (!existeAdicional) {
      // Se o item ainda não existe, adiciona com os adicionais
      const novoAdicional = [
        ...prevAdd,
        {
          id: newAddOn.id,
          nomeComplemento: newAddOn.nomeComplemento,            
          quantidade: 1,
          preco: Number(newAddOn.preco),
        },
      ];

      return novoAdicional;

    } else {
      // Se já existe o adicional, percorre para aumentar a quantidade
      const novosAdicionais = prevAdd.map(item => {
        if (item.id === newAddOn.id) {
          console.log('Entrei aqui, existe o adicional');
          const novaQuantidade = item.quantidade + 1;
          console.log('Nova quantidade', novaQuantidade);

          return {
            ...item,
            quantidade: novaQuantidade,
          };
        }

        // Retorna o item original se não for o que precisa ser atualizado
        return item;
      });

      return novosAdicionais;
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

  console.log("Como fica os adicionais?", adicionaisProduto);

  return (
    <PedidoVendaContext.Provider
      value={{ adicionarItem, removerItem, limparPedido, cart, valorTotalPedido, addAdicional, adicionaisProduto }}
    >
      {children}
    </PedidoVendaContext.Provider>
  )
}

export default PedidoProvider