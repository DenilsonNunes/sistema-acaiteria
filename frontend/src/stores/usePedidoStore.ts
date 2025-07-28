// stores/usePedidoStore.ts
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";
import { create } from "zustand";

interface ItemAdicional {
  id: number;
  idGrupoComplementos: number;
  nomeComplemento: string;
  quantidade: number;
  preco: number;
}

type ItemPedido = {
  id: number;
  nomeProduto: string;
  imagemUrl?: string;
  preco: number;
  adicionais?: ItemAdicional[];
};

type Cart = {
  id: number;
  nomeProduto: string;
  imagemUrl?: string;
  preco: number;
  precoTotal: number;
  quantidade: number;
  adicionais: ItemAdicional[];
};

interface PedidoState {
  cart: Cart[];
  adicionaisProduto: ItemAdicional[];
  valorTotalPedido: string;

  adicionarItem: (item: ItemPedido) => void;
  diminuirQtdItem: (item: Cart) => void;

  limparPedido: () => void;

  aumentarQtdAdicionalItem: (item: ItemAdicional) => void;
  diminuirQtdAdicionalItem: (item: ItemAdicional) => void;
}

export const usePedidoStore = create<PedidoState>((set, get) => ({
  cart: [],
  adicionaisProduto: [],
  valorTotalPedido: "0,00",

  adicionarItem: (newItem) => {
    const { cart } = get();

    const itemExistente = cart.find((item) => item.id === newItem.id);
    let novoCarrinho;

    if (!itemExistente) {
      novoCarrinho = [
        ...cart,
        {
          id: newItem.id,
          nomeProduto: newItem.nomeProduto,
          imagemUrl: newItem.imagemUrl,
          quantidade: 1,
          preco: Number(newItem.preco),
          precoTotal: Number(newItem.preco),
          adicionais: newItem.adicionais || [],
        },
      ];
    } else {
      novoCarrinho = cart.map((item) =>
        item.id === newItem.id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
              precoTotal: (item.quantidade + 1) * item.preco,
            }
          : item
      );
    }

    set({
      cart: novoCarrinho,
      valorTotalPedido: formatarMoedaBRL(
        novoCarrinho.reduce((acc, item) => acc + item.precoTotal, 0)
      ),

      adicionaisProduto: [], // <--- limpa os adicionais após salvar o item
    });

    
  },

  diminuirQtdItem: (itemParaRemover) => {
    const { cart } = get();

    const itemExistente = cart.find((item) => item.id === itemParaRemover.id);
    if (!itemExistente) return;

    let novoCarrinho;

    if (itemExistente.quantidade > 1) {
      novoCarrinho = cart.map((item) =>
        item.id === itemParaRemover.id
          ? {
              ...item,
              quantidade: item.quantidade - 1,
              precoTotal: (item.quantidade - 1) * item.preco,
            }
          : item
      );
    } else {
      novoCarrinho = cart.filter((item) => item.id !== itemParaRemover.id);
    }

    set({
      cart: novoCarrinho,
      valorTotalPedido: formatarMoedaBRL(
        novoCarrinho.reduce((acc, item) => acc + item.precoTotal, 0)
      ),
    });
  },

  limparPedido: () => set({ cart: [], valorTotalPedido: "0,00" }),

  aumentarQtdAdicionalItem: (newAddOn) => {


    const { adicionaisProduto } = get();

    const existente = adicionaisProduto.find((item) => item.id === newAddOn.id);
    let novos;

    if (!existente) {
      novos = [
        ...adicionaisProduto,
        {
          id: newAddOn.id,
          idGrupoComplementos: newAddOn.idGrupoComplementos,
          nomeComplemento: newAddOn.nomeComplemento,
          quantidade: 1,
          preco: Number(newAddOn.preco),
        },
      ];
    } else {
      novos = adicionaisProduto.map((item) =>
        item.id === newAddOn.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    }

    set({ adicionaisProduto: novos });
  },

  diminuirQtdAdicionalItem: (itemRemover) => {

    const { adicionaisProduto } = get();

    const existente = adicionaisProduto.find((item) => item.id === itemRemover.id);
    if (!existente) return;

    let novos;

    if (existente.quantidade > 1) {
      novos = adicionaisProduto.map((item) =>
        item.id === itemRemover.id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      );
    } else {
      novos = adicionaisProduto.filter((item) => item.id !== itemRemover.id);
    }

    set({ adicionaisProduto: novos });
  },


}));
