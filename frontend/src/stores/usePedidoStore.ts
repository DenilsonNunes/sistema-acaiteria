// stores/usePedidoStore.ts
import type { Customer } from "@/types/customer/customer";
import type { Cart, ItemCart, ItemComplemento } from "@/types/sales/cart/cart";
import { create } from "zustand";






interface PedidoState {
  cart: Cart[];
  cliente: Pick<Customer, 'id' | 'nome'> | null;
  adicionaisProduto: ItemComplemento[];
  valorTotalCart: number;

  identificarCliente: (cliente: Pick<Customer, 'id' | 'nome'>) => void;
  removerCliente: () => void;

  adicionarItem: (item: ItemCart) => void;
  diminuirQtdItem: (item: Cart) => void;

  limparCart: () => void;

  aumentarQtdComplementoItem: (item: ItemComplemento) => void;
  diminuirQtdComplementoItem: (item: ItemComplemento) => void;
}





// função fora do create
const calcularValorTotal = (cart: Cart[]): number => {
  return cart.reduce((acc, item) => {
    const valorUnitarioTotal = (item.preco + (item.precoTotalComplementos || 0));
    return acc + valorUnitarioTotal * item.quantidade;
  }, 0);
};




export const usePedidoStore = create<PedidoState>((set, get) => ({
  cart: [],
  cliente: null,
  adicionaisProduto: [],
  valorTotalCart: 0,

  identificarCliente: ({ id, nome }) =>
    set(() => ({
      cliente: { id, nome }
    })),

  removerCliente: () =>
    set(() => ({
      cliente: null
    })),

  adicionarItem: (newItem) => {
    const { cart } = get();

    const isSameCartItem = (item1, item2) => {
      if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) {
        return false;
      }

      const comps1 = item1.complementos || [];
      const comps2 = item2.complementos || item2.adicionais || []; // garante compatibilidade

      if (comps1.length !== comps2.length) return false;

      const sorted1 = [...comps1].sort((a, b) => a.id - b.id);
      const sorted2 = [...comps2].sort((a, b) => a.id - b.id);

      return sorted1.every((c1, index) => {
        const c2 = sorted2[index];
        return (
          c1.id === c2.id &&
          c1.nomeComplemento === c2.nomeComplemento &&
          c1.quantidade === c2.quantidade &&
          c1.preco === c2.preco &&
          c1.idGrupoComplementos === c2.idGrupoComplementos
        );
      });
    };

    // Valor total unitário dos complementos
    const precoComplementosUnitario = (newItem.adicionais || []).reduce(
      (acc, item) => acc + item.preco * (item.quantidade || 1),
      0
    );

    const precoProdutoUnitario = Number(newItem.preco);
    const valorUnitarioTotal = precoProdutoUnitario + precoComplementosUnitario;

    const itemExistente = cart.find((item) => isSameCartItem(item, newItem));

   let novoCarrinho;

    if (!itemExistente) {
      // Novo item
      novoCarrinho = [
        ...cart,
        {
          id: newItem.id,
          nomeProduto: newItem.nomeProduto,
          imagemUrl: newItem.imagemUrl,
          quantidade: 1,
          preco: precoProdutoUnitario, // unitário
          precoTotalComplementos: precoComplementosUnitario, // unitário
          valorTotal: valorUnitarioTotal, // unitário
          complementos: newItem.adicionais || [],
        },
      ];
    } else {

    // Incrementa quantidade
    const novaQtd = itemExistente.quantidade + 1;

    novoCarrinho = cart.map((item) =>
      isSameCartItem(item, newItem)
        ? {
            ...item,
            quantidade: novaQtd,
            valorTotal: (item.preco + item.precoTotalComplementos) * novaQtd,
          }
        : item
    );

  }

  // Atualiza estado
  set({
    cart: novoCarrinho,
    valorTotalCart: calcularValorTotal(novoCarrinho),
    adicionaisProduto: [],
  });

  },


  diminuirQtdItem: (itemParaRemover) => {
    const { cart } = get();

    const isSameCartItem = (item1, item2) => {
      if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) {
        return false;
      }

      const comps1 = item1.complementos || [];
      const comps2 = item2.complementos || [];

      if (comps1.length !== comps2.length) return false;

      const sorted1 = [...comps1].sort((a, b) => a.id - b.id);
      const sorted2 = [...comps2].sort((a, b) => a.id - b.id);

      return sorted1.every((c1, index) => {
        const c2 = sorted2[index];
        return (
          c1.id === c2.id &&
          c1.nomeComplemento === c2.nomeComplemento &&
          c1.quantidade === c2.quantidade &&
          c1.preco === c2.preco &&
          c1.idGrupoComplementos === c2.idGrupoComplementos
        );
      });
    };

    const itemExistente = cart.find((item) => isSameCartItem(item, itemParaRemover));
    if (!itemExistente) return;

    let novoCarrinho;

    if (itemExistente.quantidade > 1) {
      const novaQtd = itemExistente.quantidade - 1;

      novoCarrinho = cart.map((item) =>
        isSameCartItem(item, itemParaRemover)
          ? {
              ...item,
              quantidade: novaQtd,
              valorTotal: (item.preco + (item.precoTotalComplementos || 0)) * novaQtd,
            }
          : item
      );
    } else {
      novoCarrinho = cart.filter((item) => !isSameCartItem(item, itemParaRemover));
    }

    set({
      cart: novoCarrinho,
      valorTotalCart: calcularValorTotal(novoCarrinho),
    });
  },


  limparCart: () => set({ cart: [], valorTotalCart: 0 }),

  aumentarQtdComplementoItem: (newAddOn) => {

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

  diminuirQtdComplementoItem: (itemRemover) => {

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



