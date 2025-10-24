
import type { Customer } from "@/types/customer/customer";
import type { Cart, ComplementoItemCart, ItemCart } from "@/types/sales/cart/cart";


import { create } from "zustand";
import { persist } from "zustand/middleware";







interface CartState {
  cart: Cart;
  complementosItemCart: ComplementoItemCart[];
  
  adicionaLocalConsumoCart: (localConsumo: number) => void;
  identificarClienteCart: (cliente: Pick<Customer, 'id' | 'nome'>) => void;
  removerClienteCart: () => void;

  adicionarItemCart: (item: ItemCart) => void;
  diminuirQtdItemCart: (item: ItemCart) => void;

  limparCart: () => void;

  aumentarQtdComplementoItemCart: (item: ComplementoItemCart) => void;
  diminuirQtdComplementoItemCart: (item: ComplementoItemCart) => void;

}







export const useCartStore = create(
  
  persist<CartState>(

    (set, get) => ({

      cart: { 
        cartItemId: '',
        localConsumo: 1,
        valorTotalCart: 0,
        itens: [],
      },

      complementosItemCart: [],
      itemEditando: undefined,
      pedidoEmEdicao: null,


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

        // Função para verificar se dois itens são "iguais"
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

        // Inicializa quantidade do novo item
        const itemParaAdicionar: ItemCart & { quantidade: number } = {
          ...newItem,
          complementos: newItem.complementos || [],
          quantidade: 1,
        };

        let novoCart: Cart;

        if (!cart) {
          // Cria carrinho novo
          const valorTotalCart =
            itemParaAdicionar.precoUnitario +
            (itemParaAdicionar.complementos || []).reduce(
              (acc, c) => acc + c.precoUnitario * (c.quantidade || 1),
              0
            );

          novoCart = {
            localConsumo: 1,
            valorTotalCart,
            itens: [itemParaAdicionar],
          };

        } else {
          // Verifica se já existe item igual
          const itemExistente = cart.itens.find((item) => isSameCartItem(item, newItem));

          let novosItens: (ItemCart & { quantidade: number })[];
          if (!itemExistente) {
            // Novo item
            novosItens = [...cart.itens, itemParaAdicionar];
          } else {
            // Incrementa quantidade do item existente
            novosItens = cart.itens.map((item) =>
              isSameCartItem(item, newItem)
                ? { ...item, quantidade: (item.quantidade || 1) + 1 }
                : item
            );
          }

          // Recalcula valor total do carrinho
          const valorTotalCart = novosItens.reduce((acc, item) => {
            const totalComplementos = (item.complementos || []).reduce(
              (soma, c) => soma + c.precoUnitario * (c.quantidade || 1),
              0
            );
            return acc + (item.precoUnitario + totalComplementos) * (item.quantidade || 1);
          }, 0);

          novoCart = {
            localConsumo: cart.localConsumo,
            itens: novosItens,
            valorTotalCart,
          };
        }

        set({
          cart: novoCart,
          complementosItemCart: [],
        });
      },


      diminuirQtdItemCart: (itemParaRemover: ItemCart) => {

        const { cart,  } = get();
        if (!cart) return;

        // Função para verificar se dois itens são "iguais"
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

        // Verifica se o item existe
        const itemExistente = cart.itens.find((item) => isSameCartItem(item, itemParaRemover));
        if (!itemExistente) return;

        let novosItens: (ItemCart & { quantidade: number })[];

        if ((itemExistente.quantidade || 1) > 1) {
          // Decrementa quantidade
          novosItens = cart.itens.map((item) =>
            isSameCartItem(item, itemParaRemover)
              ? { ...item, quantidade: (item.quantidade || 1) - 1 }
              : item
          );
        } else {
          // Remove item do carrinho
          novosItens = cart.itens.filter((item) => !isSameCartItem(item, itemParaRemover));
        }

        // Recalcula o valor total do carrinho
        const valorTotalCart = novosItens.reduce((acc, item) => {
          const totalComplementos = (item.complementos || []).reduce(
            (soma, c) => soma + c.precoUnitario * (c.quantidade || 1),
            0
          );
          return acc + (item.precoUnitario + totalComplementos) * (item.quantidade || 1);
        }, 0);

        set({
          cart: {
            idCliente: cart.idCliente,
            nomeCliente: cart.nomeCliente,
            localConsumo: cart.localConsumo,
            itens: novosItens,
            valorTotalCart,
          },
        });
        
      },
    
      limparCart: () =>
        set({
          cart: {
            valorTotalCart: 0,
            itens: [],
            localConsumo: 1,
          },
          pedidoEmEdicao: null,
          complementosItemCart: []
        }),
          
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

    
    }),
    {
      name: '@CartStorage'
    }

  )


);




