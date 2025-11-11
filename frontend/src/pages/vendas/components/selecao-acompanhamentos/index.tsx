
import { Textarea } from '@/components/ui/textarea';
import fotoAcai from '../../../../assets/acai.jpeg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { ArrowLeft, ChevronRight, Minus, Plus} from "lucide-react";
import {  useEffect, useMemo, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from '@/components/loading-spinner';
import { useSelectSideDishes } from '@/hooks/sales/sales_order/useSelectSideDishes';

import { formatarMoedaBRL } from '@/utils/formataMoedaBRL';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/useCartStore';
import { usePedidoStore } from '@/stores/usePedidoStore';
import { pedidoEmEdicao } from '@/utils/pedidoUtils';
import ResumoCart from '../../carrinho';
import { v4 as uuidv4 } from "uuid";










const SelecaoAcompanhamentos = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const idProduto = useMemo(() => id, [id]);

  const [valorTotalComplementos, setValorTotalComplementos] = useState<number>(0);
  const [observacao, setObservacao] = useState('');



  const {
    complementosItemCart, 
    aumentarQtdComplementoItemCart, 
    adicionarItemCart, 
    diminuirQtdComplementoItemCart,
    itemCartEditando,
    salvarEdicaoItemCart

  } = useCartStore();

  const { 
    complementosItemPedido,
    salvarEdicaoItem,
    aumentarQtdComplementoItemPedido,
    diminuirQtdComplementoItemPedido,
    idPedidoEmEdicao,
    itemPedidoEditando,
    adicionarItemPedido
  } = usePedidoStore();


  const {data: addOnGroup, isLoading, isError} = useSelectSideDishes(idProduto);


  useEffect(()=> {

    if(localStorage.getItem('@OrderStorage')){

      setValorTotalComplementos(complementosItemPedido.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0));
 
    } else {

      setValorTotalComplementos(complementosItemCart.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0));

    }

  }, [complementosItemPedido, complementosItemCart])


  
  useEffect(() => {
    // se estiver editando item, seta a observação dele
    if (itemCartEditando?.observacaoItem) {
      setObservacao(itemCartEditando.observacaoItem);
    }
  }, [itemCartEditando]);


  if(isLoading) {
    return (
      <LoadingSpinner size={100}/>
    )
  }



  if(isError) {
    return (
      <div className='w-full max-w-5xl p-30 flex items-center justify-center'>
        <p className='text-lg'>Houve um erro ao buscar o produto!</p>
      </div>
    )
  }



  return (

    <section className="flex w-full gap-4 max-w-7xl">

      <div className='flex flex-col w-full lg:w-[70%]'>

        <div className="relative">
          <img src={fotoAcai} alt="Copo açaí" className="w-full h-40 object-cover rounded" />

          <button
            className="md:hidden absolute top-2 left-2 rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg shadow-black/80 text-black cursor-pointer"
            onClick={() => {
              navigate('/vendas/pdv')
            }}
          >
            <ArrowLeft size={26} />
          </button>
        </div>

        <div className='my-4'>
          <p className='text-2xl font-medium'>{addOnGroup?.nomeProduto}</p>
          <p className='font-medium text-gray-600'>{addOnGroup?.descricao}</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
        >

          {addOnGroup?.grupoComplementos && addOnGroup.grupoComplementos.map((addOnGroup, index)=> (
            <AccordionItem key={index} value={String(addOnGroup.id)}>

              <AccordionTrigger className="flex items-center py-1 px-2 bg-fuchsia-700 hover:no-underline rounded-none text-white">
                <div className="flex flex-col w-full">
                  <p className="font-medium text-white text-2xl">{addOnGroup.nomeGrupoComplementos}</p>

                  <div className='flex w-full items-end justify-between'>
                    <p className="text-white">Escolha entre {addOnGroup.qtdMinComplemento} e {addOnGroup.qtdMaxComplemento} itens</p>
                    
                    {addOnGroup.obrigatorio ? (
                      <Badge variant="secondary" className='bg-orange-500 text-white'>                      
                        Obrigatório
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className='bg-gray-300'>                      
                        Não obrigatório
                      </Badge>
                    )}
                  </div>

                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance py-4">

                {addOnGroup.Complementos?.map((addOn) => {
           

                let selecionado: any = null;
                let quantidade = 0;
                let totalSelecionadosDoGrupo = 0;
                let atingiuMaximo = false;
                let desabilita = false;

                // Se o pedido está em edição
                if (pedidoEmEdicao()) {
                  selecionado = complementosItemPedido.find((p) => p.id === addOn.id);
                  quantidade = selecionado?.quantidade ?? 0;

                  totalSelecionadosDoGrupo = complementosItemPedido
                    .filter((item) => item.idGrupoComplementos === addOnGroup.id)
                    .reduce((acc, item) => acc + item.quantidade, 0);

                  atingiuMaximo = totalSelecionadosDoGrupo >= addOnGroup.qtdMaxComplemento;
                  desabilita = atingiuMaximo && (!selecionado || quantidade === 0);
                } 
                // Se é um novo pedido (não em edição)
                else {
                  selecionado = complementosItemCart.find((p) => p.id === addOn.id);
                  quantidade = selecionado?.quantidade ?? 0;

                  totalSelecionadosDoGrupo = complementosItemCart
                    .filter((item) => item.idGrupoComplementos === addOnGroup.id)
                    .reduce((acc, item) => acc + item.quantidade, 0);

                  atingiuMaximo = totalSelecionadosDoGrupo >= addOnGroup.qtdMaxComplemento;
                  desabilita = atingiuMaximo && (!selecionado || quantidade === 0);
                }

                  return (
                    <div
                      key={addOn.id}
                      className={`flex items-center justify-between border-b transition-opacity ${
                        desabilita ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {/* ——— lado esquerdo: foto + nome ——— */}
                      <div className="flex items-center gap-2 mb-4">

                        <div className="flex items-center justify-center border w-15 h-15 rounded-lg overflow-hidden bg-gray-100">
                          {addOn.imagemUrl ? (
                            <img
                              src={addOn.imagemUrl}
                              alt={addOn.nomeComplemento}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-sm text-center text-gray-500">Sem Foto</span>
                          )}
                        </div>

                        <div>
                          <p className="text-lg">{addOn.nomeComplemento}</p>
                          <p className='font-medium text-fuchsia-700'>R$ {formatarMoedaBRL(addOn.preco)}</p>
                        </div>


                      </div>

                      {/* ——— lado direito: botões ——— */}
                      <div className="flex items-center gap-1 h-8 mr-2 rounded-lg  px-1">
                        {/* só mostra o “‑” e o contador se já tiver pelo menos 1 */}
                        {selecionado && (
                          <>
                            <button
                              onClick={() => {
                                if (pedidoEmEdicao()) {
                                  // Se estiver editando pedido
                                  diminuirQtdComplementoItemPedido({
                                    id: addOn.id,
                                    idGrupoComplementos: addOn.idGrupoComplementos,
                                    precoUnitario: Number(addOn.preco),
                                    nomeComplemento: addOn.nomeComplemento,
                                    quantidade: 1,
                                  });
                                } else {
                                  // Se for inclusão (novo pedido)
                                  diminuirQtdComplementoItemCart({
                                    id: addOn.id,
                                    idGrupoComplementos: addOn.idGrupoComplementos,
                                    precoUnitario: Number(addOn.preco),
                                    nomeComplemento: addOn.nomeComplemento,
                                    quantidade: 1,
                                  });
                                }
                              }}
                              className="text-fuchsia-700 cursor-pointer"
                            >
                              <Minus size={24} />
                            </button>

                            <span className="w-6 text-center font-medium">{quantidade}</span>
                          </>
                        )}

                        {/* “+” sempre visível */}
                        <button
                          disabled={atingiuMaximo}                      
                          onClick={() => {
                            
                            if(pedidoEmEdicao()){
                              aumentarQtdComplementoItemPedido({
                                id: addOn.id,
                                idGrupoComplementos: addOn.idGrupoComplementos,
                                precoUnitario: Number(addOn.preco),
                                nomeComplemento: addOn.nomeComplemento,
                                quantidade: 1
                              })
                            } else {
                              aumentarQtdComplementoItemCart({
                                id: addOn.id,
                                idGrupoComplementos: addOn.idGrupoComplementos,
                                precoUnitario: Number(addOn.preco),
                                nomeComplemento: addOn.nomeComplemento,
                                quantidade: 1
                              })
                            }       
                          }}
                          className={`text-fuchsia-700 ${atingiuMaximo ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
                        >
                          <Plus size={24} />
                        </button>

                      </div>
                    </div>
                  );
                })}

              </AccordionContent>
              
            </AccordionItem>
          ))}

        </Accordion>

        <div className='mt-2 sm:mt-0.5 mb-24 sm:mb-2'>
          <div className='h-15 sm:h-10 bg-gray-300 flex items-center mb-1'>
            <p className='ml-4 text-lg font-medium'>Observação</p>
          </div>
          <Textarea 
            placeholder="Ex: Banana cortar em fatias grossas."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>

        <div className='hidden sm:block'>
          <Button
            className='w-full h-14 bg-green-500 hover:bg-green-600 rounded-none cursor-pointer px-6'
            onClick={() => {
              if (!addOnGroup) return;
              adicionarItemCart({
                id: addOnGroup.id,
                uuid: uuidv4(),
                nomeProduto: addOnGroup.nomeProduto,
                imagemUrl: addOnGroup.imagemUrl,
                precoUnitario: Number(addOnGroup.preco),
                quantidade: 1,
                complementos: [...complementosItemCart]
              });
              navigate('/vendas/pedido-de-venda');
            }}
          >
            <div className='w-full justify-between flex items-center'>

              <p className='text-2xl font-bold'>Avançar</p>
              <div className='flex items-center'>
                <p className='text-xl font-bold'>R$ {formatarMoedaBRL(String(Number(addOnGroup?.preco) + valorTotalComplementos))}</p>
                <ChevronRight className="flex-shrink-0" style={{ width: '46px', height: '46px' }} />
              </div>

            </div>
          </Button>
        </div>
        
        <div className='sm:hidden fixed bottom-0 left-0 right-0 h-18 w-full bg-white border-t'>
          
          {pedidoEmEdicao() ? (

            <div className='flex h-full items-center gap-2 px-4'>

              <Button variant='destructive' className='rounded-none w-[50%] text-lg'>
                Cancelar Edição
              </Button>


              <Button
                className='w-[50%] bg-green-500 hover:bg-green-600 rounded cursor-pointer'
                onClick={() => {

                  if (!addOnGroup) return;

                    // Se tiver um item do pedido em edição
                    if(itemPedidoEditando){
                      salvarEdicaoItem();

                    // Se for novo pedido
                    } else {
                      adicionarItemPedido({
                        id: addOnGroup.id,
                        uuid: uuidv4(),
                        nomeProduto: addOnGroup.nomeProduto,
                        imagemUrl: addOnGroup.imagemUrl,
                        precoUnitario: Number(addOnGroup.preco),
                        quantidade: 1,
                        complementos: [...complementosItemPedido],
                      });

                    }

                    navigate(`/vendas/pedidos/${idPedidoEmEdicao}/editar`);              
                  }
                                                                                                                              
                }
              >
                <div className='w-full justify-between flex items-center'>

                  <div className='flex items-center justify-between w-full'>

                    <p className='text-lg font-bold'>
                      Avançar
                    </p>

                    <p className='text-md font-bold'>R$ {formatarMoedaBRL(String(Number(addOnGroup?.preco) + valorTotalComplementos))}</p>

                  </div>
          
                  <div className='flex items-center'>
                    <ChevronRight className="flex-shrink-0" style={{ width: '36px', height: '36px' }} />
                  </div>

                </div>
              </Button>

            </div>

          ) : (
          // adicionando no carrinho
            <Button
              className='w-full bg-green-500 hover:bg-green-600 rounded-none cursor-pointer px-6 h-full'
              onClick={() => {

                if (!addOnGroup) return;
                  // Se for edição de um item do carrinho
                  if (itemCartEditando) {
                    
                    salvarEdicaoItemCart(observacao);

                  } else {

                    adicionarItemCart({
                      id: addOnGroup.id,
                      uuid: uuidv4(),
                      nomeProduto: addOnGroup.nomeProduto,
                      imagemUrl: addOnGroup.imagemUrl,
                      precoUnitario: Number(addOnGroup.preco),
                      quantidade: 1,
                      observacaoItem: observacao,
                      complementos: [...complementosItemCart],
                    });

                  }

                  navigate('/vendas/carrinho');
                
                }
                                                                                                                            
              }
            >
              <div className='w-full justify-between flex items-center'>

                <p className='text-2xl font-bold'>
                  Avançar
                </p>
                

                <div className='flex items-center'>
                  <p className='text-xl font-bold'>R$ {formatarMoedaBRL(String(Number(addOnGroup?.preco) + valorTotalComplementos))}</p>
                  <ChevronRight className="flex-shrink-0" style={{ width: '46px', height: '46px' }} />
                </div>

              </div>
            </Button>

          )}

        </div>
        
    
      </div>

      <div className="w-[30%] overflow-y-auto h-screen hidden lg:block">
        <ResumoCart/>
      </div>


    </section>
  )
  

  
}

export default SelecaoAcompanhamentos



