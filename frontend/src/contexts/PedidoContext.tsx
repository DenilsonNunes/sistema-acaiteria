// context/PedidoContext.tsx
import { createContext, useContext, useState, ReactNode } from "react"

type ItemPedido = {
  id: string
  nome: string
  preco: number
  quantidade: number
}

type PedidoContextType = {
  itens: ItemPedido[]
  adicionarItem: (item: ItemPedido) => void
  removerItem: (id: string) => void
  limparPedido: () => void
}


interface PedidoProviderProps {
  children: ReactNode;
}





const PedidoContext = createContext<PedidoContextType | undefined>(undefined)




const PedidoProvider = ({ children }: PedidoProviderProps) => {

  const [itens, setItens] = useState<ItemPedido[]>([])

  const adicionarItem = (item: ItemPedido) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === item.id)
      if (existente) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removerItem = (id: string) => {
    setItens((prev) => prev.filter((i) => i.id !== id))
  }

  const limparPedido = () => {
    setItens([])
  }

  return (
    <PedidoContext.Provider
      value={{ itens, adicionarItem, removerItem, limparPedido }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoProvider