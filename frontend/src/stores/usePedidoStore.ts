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
  removerCliente: (cliente: Pick<Customer, 'id' | 'nome'>) => void;

  adicionarItem: (item: ItemCart) => void;
  diminuirQtdItem: (item: Cart) => void;

  limparCart: () => void;

  aumentarQtdComplementoItem: (item: ItemComplemento) => void;
  diminuirQtdComplementoItem: (item: ItemComplemento) => void;
}





// 👇 função fora do create
const calcularValorTotal = (cart: Cart[]): number => {
  const total = cart.reduce((acc, item) => {
    const totalItem = item.preco * item.quantidade;
    const totalComplementos = item.complementos?.reduce((sum, add) => {
      return sum + (add.preco * add.quantidade);
    }, 0) || 0;

    return acc + totalItem + totalComplementos;
  }, 0);

  return total;
}




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

    // Função auxiliar para comparar dois itens (produto + complementos)
    const isSameCartItem = (item1, item2) => {
      if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) {
        return false;
      }

      const adicionais1 = item1.adicionais || [];
      const adicionais2 = item2.adicionais || [];

      if (adicionais1.length !== adicionais2.length) {
        return false;
      }

      // Ordena os adicionais por id para comparação
      const sortedAdicionais1 = [...adicionais1].sort((a, b) => a.id - b.id);
      const sortedAdicionais2 = [...adicionais2].sort((a, b) => a.id - b.id);

      return sortedAdicionais1.every((adicional1, index) => {
        const adicional2 = sortedAdicionais2[index];
        return (
          adicional1.id === adicional2.id &&
          adicional1.nomeComplemento === adicional2.nomeComplemento &&
          adicional1.quantidade === adicional2.quantidade &&
          adicional1.preco === adicional2.preco &&
          adicional1.idGrupoComplementos === adicional2.idGrupoComplementos
        );
      });
    };

    // Calcula o valor total dos complementos do novo item
    const totalValorComplementoUnitario = (newItem.adicionais || []).reduce(
      (acc, item) => acc + item.preco * (item.quantidade || 1),
      0
    );

    // Procura por um item igual no carrinho (mesmo produto e mesmos complementos)
    const itemExistente = cart.find((item) => isSameCartItem(item, newItem));

    let novoCarrinho;

    if (!itemExistente) {
      // Se não existe, adiciona como novo item
      novoCarrinho = [
        ...cart,
        {
          id: newItem.id,
          nomeProduto: newItem.nomeProduto,
          imagemUrl: newItem.imagemUrl,
          quantidade: 1,
          preco: Number(newItem.preco),
          precoTotalComplementos: totalValorComplementoUnitario,
          valorTotal: Number(newItem.preco + totalValorComplementoUnitario),
          complementos: newItem.adicionais || [],
        },
      ];
    } else {
      // Se existe, incrementa a quantidade e recalcula preços
      const novaQtd = itemExistente.quantidade + 1;
      novoCarrinho = cart.map((item) =>
        isSameCartItem(item, newItem)
          ? {
              ...item,
              quantidade: novaQtd,
              precoTotalComplementos: totalValorComplementoUnitario * novaQtd,
              valorTotal: Number(item.preco * novaQtd + totalValorComplementoUnitario * novaQtd),
            }
          : item
      );
    }

    // Atualiza o estado
    set({
      cart: novoCarrinho,
      valorTotalCart: calcularValorTotal(novoCarrinho),
      adicionaisProduto: [], // Limpa os adicionais temporários
    });
  },


  diminuirQtdItem: (itemParaRemover) => {
    const { cart } = get();

    // Função auxiliar para comparar dois itens (produto + complementos)
    const isSameCartItem = (item1, item2) => {
      if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) {
        return false;
      }

      const adicionais1 = item1.adicionais || [];
      const adicionais2 = item2.adicionais || [];

      if (adicionais1.length !== adicionais2.length) {
        return false;
      }

      // Ordena os adicionais por id para comparação
      const sortedAdicionais1 = [...adicionais1].sort((a, b) => a.id - b.id);
      const sortedAdicionais2 = [...adicionais2].sort((a, b) => a.id - b.id);

      return sortedAdicionais1.every((adicional1, index) => {
        const adicional2 = sortedAdicionais2[index];
        return (
          adicional1.id === adicional2.id &&
          adicional1.nomeComplemento === adicional2.nomeComplemento &&
          adicional1.quantidade === adicional2.quantidade &&
          adicional1.preco === adicional2.preco &&
          adicional1.idGrupoComplementos === adicional2.idGrupoComplementos
        );
      });
    };

    // Procura pelo item correto no carrinho (mesmo produto e mesmos complementos)
    const itemExistente = cart.find((item) => isSameCartItem(item, itemParaRemover));
    if (!itemExistente) return;

    let novoCarrinho;

    if (itemExistente.quantidade > 1) {
      // Diminui a quantidade e recalcula preços
      const novaQuantidade = itemExistente.quantidade - 1;

      const valorComplementosPorUnidade = itemExistente.complementos?.reduce(
        (acc, adicional) => acc + adicional.preco * (adicional.quantidade || 1),
        0
      ) || 0;

      const novoPrecoTotalComplementos = valorComplementosPorUnidade * novaQuantidade;

      novoCarrinho = cart.map((item) =>
        isSameCartItem(item, itemParaRemover)
          ? {
              ...item,
              quantidade: novaQuantidade,
              precoTotalComplementos: novoPrecoTotalComplementos,
              valorTotal: Number(item.preco * novaQuantidade + novoPrecoTotalComplementos),
            }
          : item
      );
    } else {
      // Se for a última unidade, remove do carrinho
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



