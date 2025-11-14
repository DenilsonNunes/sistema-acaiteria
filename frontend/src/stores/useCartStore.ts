
import type { Customer } from "@/types/customer/customer";
import type { Cart, ComplementoItemCart, ItemCart, LocalEntrega } from "@/types/sales/cart/cart";

import { create } from "zustand";
import { persist } from "zustand/middleware";







interface CartState {
  cart: Cart;
  complementosItemCart: ComplementoItemCart[];
  itemCartEditando?: ItemCart;

  recalcularTotais:() => void;

  
  adicionaLocalConsumoCart: (localConsumo: number) => void;
  identificarClienteCart: (cliente: Pick<Customer, 'id' | 'nome'>) => void;

  incluirLocalEntrega: (localEntrega: LocalEntrega) => void;
  removerLocalEntrega: () => void;



  removerClienteCart: () => void;

  adicionarItemCart: (item: ItemCart) => void;
  diminuirQtdItemCart: (item: ItemCart) => void;

  limparCart: () => void;
  removerItemCart: (item: string) => void;

  selecionarItemParaEditarCart: (item: ItemCart) => void;
  salvarEdicaoItemCart: (observacaoItem: string) => void;



  aumentarQtdComplementoItemCart: (item: ComplementoItemCart) => void;
  diminuirQtdComplementoItemCart: (item: ComplementoItemCart) => void;

}







export const useCartStore = create(
  
  persist<CartState>(

    (set, get) => ({

      cart: { 
        localConsumo: 1,
        valorSubTotalCart: 0,
        valorTotalCart: 0,
        itens: [],
      },

      complementosItemCart: [],
      itemCartEditando: undefined,

      recalcularTotais: () => {
        const { cart } = get();

        if (!cart) return;

        // subtotal considerando complementos
        const valorSubTotalCart = cart.itens.reduce((acc, item) => {
          const totalComplementos = (item.complementos ?? []).reduce(
            (soma, c) => soma + c.precoUnitario * (c.quantidade ?? 1),
            0
          );

          const totalItem = (item.precoUnitario + totalComplementos) * (item.quantidade ?? 1);

          return acc + totalItem;
        }, 0);

        const taxaEntrega = cart.localEntrega?.valor ?? 0;

        const valorTotalCart = valorSubTotalCart + taxaEntrega;

        set({
          cart: {
            ...cart,
            valorSubTotalCart,
            valorTotalCart,
          },
        });
      },

      adicionaLocalConsumoCart: (localConsumo: number) => {
        set((state) => ({
          cart: {
            ...state.cart,
            localConsumo,
          },
        }));
      },
        
      identificarClienteCart: ({ id, nome }) => {
        const { cart } = get();
        set({
          cart: {
            ...cart,
            idCliente: id,
            nomeCliente: nome,
          }
        });
      },

      removerClienteCart: () => {
        const { cart } = get();
        set({
          cart: {
            ...cart,
            idCliente: undefined,
            nomeCliente: undefined,
          }
        });
      },
          
      adicionarItemCart: (newItem: ItemCart) => {
        const { cart } = get();
        // -----------------------------
        // Função de igualdade entre itens
        // -----------------------------
        const isSameCartItem = (item1: ItemCart, item2: ItemCart) => {
          if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) return false;

          const comps1 = item1.complementos || [];
          const comps2 = item2.complementos || [];

          if (comps1.length !== comps2.length) return false;

          const sorted1 = [...comps1].sort((a, b) => a.id - b.id);
          const sorted2 = [...comps2].sort((a, b) => a.id - b.id);

          return sorted1.every((c1, idx) => {
            const c2 = sorted2[idx];
            return (
              c1.id === c2.id &&
              c1.nomeComplemento === c2.nomeComplemento &&
              c1.quantidade === c2.quantidade &&
              c1.precoUnitario === c2.precoUnitario &&
              c1.idGrupoComplementos === c2.idGrupoComplementos
            );
          });
        };

        // -----------------------------
        // Inicializa novo item
        // -----------------------------
        const itemParaAdicionar: ItemCart & { quantidade: number } = {
          ...newItem,
          complementos: newItem.complementos || [],
          quantidade: 1,
        };

        let novosItens: (ItemCart & { quantidade: number })[] = [];

        // -----------------------------
        // Se não existir cart ainda
        // -----------------------------
        if (!cart) {
          novosItens = [itemParaAdicionar];

          set({
            cart: {
              localConsumo: 1,
              itens: novosItens,
            },
            complementosItemCart: [],
          });

          get().recalcularTotais();
          return;
        }

        // -----------------------------
        // Verifica se item já existe
        // -----------------------------
        const itemExistente = cart.itens.find((i) => isSameCartItem(i, newItem));

        if (!itemExistente) {
          novosItens = [...cart.itens, itemParaAdicionar];
        } else {
          novosItens = cart.itens.map((i) =>
            isSameCartItem(i, newItem)
              ? { ...i, quantidade: (i.quantidade ?? 1) + 1 }
              : i
          );
        }

        // -----------------------------
        // Atualiza itens e recalcula totais
        // -----------------------------
        set({
          cart: {
            ...cart,
            itens: novosItens,
          },
          complementosItemCart: [],
        });

        get().recalcularTotais();
      },

      diminuirQtdItemCart: (itemParaRemover: ItemCart) => {
        const { cart } = get();
        if (!cart) return;

        // ---------------------------------
        // Função para verificar se dois itens são "iguais"
        // ---------------------------------
        const isSameCartItem = (item1: ItemCart, item2: ItemCart) => {
          if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) return false;

          const comps1 = item1.complementos || [];
          const comps2 = item2.complementos || [];

          if (comps1.length !== comps2.length) return false;

          const sorted1 = [...comps1].sort((a, b) => a.id - b.id);
          const sorted2 = [...comps2].sort((a, b) => a.id - b.id);

          return sorted1.every((c1, idx) => {
            const c2 = sorted2[idx];
            return (
              c1.id === c2.id &&
              c1.nomeComplemento === c2.nomeComplemento &&
              c1.quantidade === c2.quantidade &&
              c1.precoUnitario === c2.precoUnitario &&
              c1.idGrupoComplementos === c2.idGrupoComplementos
            );
          });
        };

        // ---------------------------------
        // Localiza o item no carrinho
        // ---------------------------------
        const itemExistente = cart.itens.find((item) => isSameCartItem(item, itemParaRemover));
        if (!itemExistente) return;

        let novosItens: (ItemCart & { quantidade: number })[];

        // ---------------------------------
        // Se quantidade > 1 → diminui
        // Se quantidade == 1 → remove
        // ---------------------------------
        if ((itemExistente.quantidade ?? 1) > 1) {
          novosItens = cart.itens.map((item) =>
            isSameCartItem(item, itemParaRemover)
              ? { ...item, quantidade: (item.quantidade ?? 1) - 1 }
              : item
          );
        } else {
          novosItens = cart.itens.filter((item) => !isSameCartItem(item, itemParaRemover));
        }

        // ---------------------------------
        // Se removeu tudo → apaga carrinho
        // ---------------------------------
        if (novosItens.length === 0) {
          set({ cart: undefined });
          localStorage.removeItem('@CartStorage');
          return;
        }

        // ---------------------------------
        // Atualiza itens e recalcula total
        // ---------------------------------
        set({
          cart: {
            ...cart,
            itens: novosItens,
          },
        });

        get().recalcularTotais();
      },


      incluirLocalEntrega: (localEntrega: LocalEntrega) => {
        const { cart } = get();
        set({
          cart: {
            ...cart,
            localEntrega: {
              id: localEntrega.id,
              bairroRegiao: localEntrega.bairroRegiao,
              valor: localEntrega.valor
            }
          }
        });

        get().recalcularTotais();
      },
      
      removerLocalEntrega: () => {
        const { cart } = get();
        if (!cart) return;

        set({
          cart: {
            ...cart,
            localEntrega: undefined
          }
        });

        get().recalcularTotais();
      },

    
      limparCart: () => {
        set({
          cart: {
            valorTotalCart: 0,
            itens: [],
            localConsumo: 1,
          },
            complementosItemCart: []
        });

      },


      removerItemCart: (uuid: string) => {
        const { cart } = get();
        if (!cart) return;

        // Remove o item do carrinho
        const itens = cart.itens.filter(item => item.uuid !== uuid);

        // Se nenhum item sobrou → limpar carrinho e localStorage
        if (itens.length === 0) {
          localStorage.removeItem("@CartStorage"); // limpa o localStorage
          set({ cart: undefined, complementosItemCart: [] }); // limpa estado do carrinho
          return;
        }



        // Atualiza estado do carrinho
        set({
          cart: {
            ...cart,
            itens,
          },
        });

        get().recalcularTotais();

      },
          
      aumentarQtdComplementoItemCart: (newAddOn: ComplementoItemCart) => {
        const { complementosItemCart } = get();

        const existente = complementosItemCart.find((item) => item.id === newAddOn.id);
        let novos: ComplementoItemCart[];

        if (!existente) {
          novos = [
            ...complementosItemCart,
            {
              id: newAddOn.id,
              idGrupoComplementos: newAddOn.idGrupoComplementos,
              nomeComplemento: newAddOn.nomeComplemento,
              quantidade: 1,
              precoUnitario: Number(newAddOn.precoUnitario), // <-- corrigido
            },
          ];
        } else {
          novos = complementosItemCart.map((item) =>
            item.id === newAddOn.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        }

        set({ complementosItemCart: novos });
      },

    
      diminuirQtdComplementoItemCart: (itemRemover) => {
        const { complementosItemCart } = get();

        const existente = complementosItemCart.find((item) => item.id === itemRemover.id);
        if (!existente) return;

        let novos: ComplementoItemCart[];

        if (existente.quantidade > 1) {
          novos = complementosItemCart.map((item) =>
            item.id === itemRemover.id
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          );
        } else {
          novos = complementosItemCart.filter((item) => item.id !== itemRemover.id);
        }

        set({ complementosItemCart: novos });
      },

      salvarEdicaoItemCart: (observacaoItem) => {
        const { cart, itemCartEditando, complementosItemCart } = get();
        if (!itemCartEditando) return;

        const isSameCartItem = (item1: ItemCart, item2: ItemCart) => {
          if (item1.id !== item2.id || item1.nomeProduto !== item2.nomeProduto) return false;

          const comps1 = item1.complementos || [];
          const comps2 = item2.complementos || [];

          if (comps1.length !== comps2.length) return false;

          const sorted1 = [...comps1].sort((a, b) => a.id - b.id);
          const sorted2 = [...comps2].sort((a, b) => a.id - b.id);

          return sorted1.every((c1, idx) => {
            const c2 = sorted2[idx];
            return (
              c1.id === c2.id &&
              c1.nomeComplemento === c2.nomeComplemento &&
              c1.quantidade === c2.quantidade &&
              c1.precoUnitario === c2.precoUnitario &&
              c1.idGrupoComplementos === c2.idGrupoComplementos
            );
          });
        };

        const novosItens = cart.itens.map((item) =>
          isSameCartItem(item, itemCartEditando)
            ? {
                ...itemCartEditando,
                complementos: complementosItemCart,
                observacaoItem: observacaoItem,
                valorTotal:
                  (itemCartEditando.precoUnitario +
                    complementosItemCart.reduce(
                      (acc, c) => acc + c.precoUnitario * (c.quantidade || 1),
                      0
                    )) * itemCartEditando.quantidade,
              }
            : item
        );

        set({  
          cart: {
            ...cart,
            itens: novosItens,
          },
          itemCartEditando: undefined,
          complementosItemCart: [],
        });

        get().recalcularTotais();

      },

      selecionarItemParaEditarCart: (item: ItemCart) => {
        set({
          itemCartEditando: item,
          complementosItemCart: item.complementos || [],
        });
      },

    
    }),
    {
      name: '@CartStorage'
    }

  )


);




