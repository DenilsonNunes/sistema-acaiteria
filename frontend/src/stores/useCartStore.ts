
import type { Customer } from "@/types/customer/customer";
import type { Cart, ComplementoItemCart, ItemCart } from "@/types/sales/cart/cart";
import { v4 as uuidv4 } from "uuid";

import { create } from "zustand";
import { persist } from "zustand/middleware";







interface CartState {
  cart: Cart;
  complementosItemCart: ComplementoItemCart[];
  itemCartEditando?: ItemCart;

  
  adicionaLocalConsumoCart: (localConsumo: number) => void;
  identificarClienteCart: (cliente: Pick<Customer, 'id' | 'nome'>) => void;
  removerClienteCart: () => void;

  adicionarItemCart: (item: ItemCart) => void;
  diminuirQtdItemCart: (item: ItemCart) => void;

  limparCart: () => void;
  removerItemCart: (item: string) => void;

  selecionarItemParaEditarCart: (item: ItemCart) => void;
  salvarEdicaoItemCart: () => void;



  aumentarQtdComplementoItemCart: (item: ComplementoItemCart) => void;
  diminuirQtdComplementoItemCart: (item: ComplementoItemCart) => void;

}







export const useCartStore = create(
  
  persist<CartState>(

    (set, get) => ({

      cart: { 
        localConsumo: 1,
        valorTotalCart: 0,
        itens: [],
      },

      complementosItemCart: [],
      itemCartEditando: undefined,


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
          uuid: uuidv4(), // gera id único pra cada item do carrinho
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

        const {cart} = get();
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


        // Agora sim, verifica o novo tamanho
        if (novosItens.length > 0) {
          set({
            cart: {
              idCliente: cart.idCliente,
              nomeCliente: cart.nomeCliente,
              localConsumo: cart.localConsumo,
              itens: novosItens,
              valorTotalCart,
            },
          });
        } else {
          set({
            cart: undefined
          })
          localStorage.removeItem('@CartStorage');
        }
        
      },
    
      limparCart: () =>
        set({
          cart: {
            valorTotalCart: 0,
            itens: [],
            localConsumo: 1,
          },
            complementosItemCart: []
        }),

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

        // Recalcula valor total
        const valorTotalCart = itens.reduce((acc, item) => {
          const totalComplementos = (item.complementos || []).reduce(
            (soma, c) => soma + c.precoUnitario * (c.quantidade || 1),
            0
          );
          return acc + (item.precoUnitario + totalComplementos) * (item.quantidade || 1);
        }, 0);

        // Atualiza estado do carrinho
        set({
          cart: {
            ...cart,
            itens,
            valorTotalCart,
          },
        });
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

      salvarEdicaoItemCart: () => {
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
                valorTotal:
                  (itemCartEditando.precoUnitario +
                    complementosItemCart.reduce(
                      (acc, c) => acc + c.precoUnitario * (c.quantidade || 1),
                      0
                    )) * itemCartEditando.quantidade,
              }
            : item
        );

        const novoValorTotalCart = novosItens.reduce((acc, item) => {
          const totalComplementos = (item.complementos || []).reduce(
            (soma, c) => soma + c.precoUnitario * (c.quantidade || 1),
            0
          );
          return acc + (item.precoUnitario + totalComplementos) * (item.quantidade || 1);
        }, 0);


        set({  
          cart: {
            ...cart,
            itens: novosItens,
            valorTotalCart: novoValorTotalCart,
          },
          itemCartEditando: undefined,
          complementosItemCart: [],
        });
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




