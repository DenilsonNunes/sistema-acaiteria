// stores/usePedidoStore.ts
import type { Customer } from "@/types/customer/customer";
import type { Cart, ComplementoItemCart, ItemCart } from "@/types/sales/cart/cart";
import type { Orders } from "@/types/sales/orders/orders";

import { v4 as uuidv4 } from "uuid";

import { create } from "zustand";
import { persist } from "zustand/middleware";







interface PedidoState {
  orderEdit: Cart;
  complementosItemPedido: ComplementoItemCart[];

  itemPedidoEditando?: ItemCart;
  idPedidoEmEdicao: number | null;
  
  
  adicionaLocalConsumoPedido: (localConsumo: number) => void;
  identificarClientePedido: (cliente: Pick<Customer, 'id' | 'nome'>) => void;
  removerClientePedido: () => void;

  adicionarItemPedido: (item: ItemCart) => void;
  diminuirQtdItemPedido: (item: ItemCart) => void;

  limparCart: () => void;
  removerItemPedido: (item: string) => void;


  aumentarQtdComplementoItemPedido: (item: ComplementoItemCart) => void;
  diminuirQtdComplementoItemPedido: (item: ComplementoItemCart) => void;

  selecionarItemParaEditar: (item: ItemCart) => void;
  salvarEdicaoItem: () => void;

  carregarPedidoExistente: (order: Orders) => void;

}







export const usePedidoStore = create(
  
  persist<PedidoState>(

    (set, get) => ({

      orderEdit: { 
        cartItemId: '',
        localConsumo: 1,
        valorTotalCart: 0,
        itens: [],
      },

      complementosItemPedido: [],
      itemPedidoEditando: undefined,
      idPedidoEmEdicao: null,


      adicionaLocalConsumoPedido: (localConsumo: number) => {
        set((state) => ({
          orderEdit: {
            ...state.orderEdit,
            localConsumo,
          },
        }));
      },
        
      identificarClientePedido: ({ id, nome }) => {
        const { orderEdit } = get();
        set({
          orderEdit: {
            ...orderEdit,
            idCliente: id,
            nomeCliente: nome,
          }
        });
      },

      removerClientePedido: () => {
        const { orderEdit } = get();
        set({
          orderEdit: {
            ...orderEdit,
            idCliente: undefined,
            nomeCliente: undefined,
          }
        });
      },
          
      adicionarItemPedido: (newItem: ItemCart) => {
        const { orderEdit } = get();

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

        if (!orderEdit) {
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
          const itemExistente = orderEdit.itens.find((item) => isSameCartItem(item, newItem));

          let novosItens: (ItemCart & { quantidade: number })[];
          if (!itemExistente) {
            // Novo item
            novosItens = [...orderEdit.itens, itemParaAdicionar];
          } else {
            // Incrementa quantidade do item existente
            novosItens = orderEdit.itens.map((item) =>
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
            ...orderEdit, // <-- mantém idCliente, nomeCliente e outras infos do pedido
            itens: novosItens,
            valorTotalCart,
          };
        }

        set({
          orderEdit: novoCart,
          complementosItemPedido: [],
        });
      },


      diminuirQtdItemPedido: (itemParaRemover: ItemCart) => {

        const { orderEdit,  } = get();
        if (!orderEdit) return;

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
        const itemExistente = orderEdit.itens.find((item) => isSameCartItem(item, itemParaRemover));
        if (!itemExistente) return;

        let novosItens: (ItemCart & { quantidade: number })[];

        if ((itemExistente.quantidade || 1) > 1) {
          // Decrementa quantidade
          novosItens = orderEdit.itens.map((item) =>
            isSameCartItem(item, itemParaRemover)
              ? { ...item, quantidade: (item.quantidade || 1) - 1 }
              : item
          );
        } else {
          // Remove item do carrinho
          novosItens = orderEdit.itens.filter((item) => !isSameCartItem(item, itemParaRemover));
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
          orderEdit: {
            idCliente: orderEdit.idCliente,
            nomeCliente: orderEdit.nomeCliente,
            localConsumo: orderEdit.localConsumo,
            itens: novosItens,
            valorTotalCart,
          },
        });
        
      },
    
      limparCart: () =>
        set({
          orderEdit: {
            valorTotalCart: 0,
            itens: [],
            localConsumo: 1,
          },
          idPedidoEmEdicao: null,
          complementosItemPedido: []
        }),

      removerItemPedido: (uuid: string) => {
        const { orderEdit } = get();
        if (!orderEdit) return;

        // Remove o item do carrinho
        const itens = orderEdit.itens.filter(item => item.uuid !== uuid);

        // Se nenhum item sobrou → limpar carrinho e localStorage
        if (itens.length === 0) {
          localStorage.removeItem("@OrderStorage"); // limpa o localStorage
          set({ orderEdit: undefined, complementosItemPedido: [] }); // limpa estado do carrinho
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
          orderEdit: {
            ...orderEdit,
            itens,
            valorTotalCart,
          },
        });
      },
          
      aumentarQtdComplementoItemPedido: (newAddOn: ComplementoItemCart) => {
        const { complementosItemPedido } = get();

        const existente = complementosItemPedido.find((item) => item.id === newAddOn.id);
        let novos: ComplementoItemCart[];

        if (!existente) {
          novos = [
            ...complementosItemPedido,
            {
              id: newAddOn.id,
              idGrupoComplementos: newAddOn.idGrupoComplementos,
              nomeComplemento: newAddOn.nomeComplemento,
              quantidade: 1,
              precoUnitario: Number(newAddOn.precoUnitario), // <-- corrigido
            },
          ];
        } else {
          novos = complementosItemPedido.map((item) =>
            item.id === newAddOn.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        }

        set({ complementosItemPedido: novos });
      },

    
      diminuirQtdComplementoItemPedido: (itemRemover) => {
        const { complementosItemPedido } = get();

        const existente = complementosItemPedido.find((item) => item.id === itemRemover.id);
        if (!existente) return;

        let novos: ComplementoItemCart[];

        if (existente.quantidade > 1) {
          novos = complementosItemPedido.map((item) =>
            item.id === itemRemover.id
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          );
        } else {
          novos = complementosItemPedido.filter((item) => item.id !== itemRemover.id);
        }

        set({ complementosItemPedido: novos });
      },

      
      salvarEdicaoItem: () => {
        const { orderEdit, itemPedidoEditando, complementosItemPedido } = get();
        if (!orderEdit || !itemPedidoEditando) return;

        const novosItens = orderEdit.itens.map(item =>
          item.uuid === itemPedidoEditando.uuid
            ? {
                ...item,
                quantidade: itemPedidoEditando.quantidade, // mantém quantidade editada
                complementos: complementosItemPedido, // novos complementos
                valorTotal:
                  (item.precoUnitario +
                    complementosItemPedido.reduce(
                      (acc, c) => acc + c.precoUnitario * (c.quantidade || 1),
                      0
                    )) * itemPedidoEditando.quantidade,
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
          orderEdit: {
            ...orderEdit,
            itens: novosItens,
            valorTotalCart: novoValorTotalCart,
          },
          itemPedidoEditando: undefined,
          complementosItemPedido: [],
        });
      },

      selecionarItemParaEditar: (item: ItemCart) => {
        set({
          itemPedidoEditando: item,
          complementosItemPedido: item.complementos || [],
        });
      },

      // NOVO: carregar pedido existente do backend
      carregarPedidoExistente: (order: Orders) => {
        
        localStorage.removeItem("@CartStorage");

        localStorage.removeItem("@OrderStorage");


        const itens = order.itensPedido.map((i) => {
          const precoComplementos = i.complementosItem.reduce(
            (acc, c) => acc + Number(c.precoUnitario) * c.quantidade,
            0
          );

          return {
            id: i.idProduto,
            uuid: uuidv4(), // gera id único pra cada item do carrinho
            nomeProduto: i.produtos.nomeProduto,
            imagemUrl: i.produtos.imagemUrl,
            quantidade: i.quantidade,
            precoUnitario: Number(i.precoUnitario),
            precoTotalComplementos: precoComplementos,
            valorTotal: (Number(i.precoUnitario) + precoComplementos) * i.quantidade,
            complementos: i.complementosItem.map((c) => ({
              id: c.idComplemento,
              idGrupoComplementos: c.complementos.idGrupoComplementos,
              nomeComplemento: c.complementos.nomeComplemento,
              quantidade: c.quantidade,
              precoUnitario: Number(c.precoUnitario),
            })),
          };
        });

        // soma do carrinho (produtos + complementos)
        const valorTotalCart = itens.reduce((acc, item) => acc + item.valorTotal, 0);

        set({
          orderEdit: {
            idCliente: order.idCliente ?? undefined,
            nomeCliente: order.nomeCliente ?? undefined,
            localConsumo: order.localConsumo,
            valorTotalCart,
            itens,
          },
          idPedidoEmEdicao: order.id
        });


      },
    
    }),
    {
      name: '@OrderStorage'
    }

  )


);




