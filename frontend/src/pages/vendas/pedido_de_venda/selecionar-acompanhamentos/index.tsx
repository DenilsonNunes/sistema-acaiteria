
import { Textarea } from '@/components/ui/textarea';
import fotoAcai from '../../../../assets/acai.jpeg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { ArrowLeft, ChevronRight, Minus, Plus} from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from '@/components/loading-spinner';
import { useSelectSideDishes } from '@/hooks/sales/sales_order/useSelectSideDishes';

import { formatarMoedaBRL } from '@/utils/formataMoedaBRL';
import { PedidoVendaContext } from '@/contexts/PedidoContext';
import { Badge } from '@/components/ui/badge';
import { usePedidoStore } from '@/stores/usePedidoStore';
import { Button } from '@/components/ui/button';










const SelecionarAcompanhamentos = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const idProduto = useMemo(() => id, [id]);
  const [blockAddButton, setBlockAddButton ] = useState(false);


  const {aumentarQtdAdicionalItem, adicionaisProduto, adicionarItem, diminuirQtdAdicionalItem} = usePedidoStore();


  const {data: addOnGroup, isLoading, isError} = useSelectSideDishes(idProduto);

  console.log('Como fica o cart', adicionaisProduto);

  
  /*
  
  
    useEffect(()=>{
  
      if(5 >= 4) {
  
        // Rola até o item 2 após o estado atualizar
        setTimeout(() => {
          //Fecha o item 1 e abre o item 2
          setAccordionValue("item-2")
  
          itemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 200) // Delay pequeno para garantir que o DOM foi atualizado
  
      }
  
  
    },[count])
  
  
  */





  if(isLoading) {
    return (
      <div className='w-full max-w-5xl p-30 flex items-center justify-center'>
        <LoadingSpinner size={100}/>
      </div>
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
    
    <section className="flex px-2 w-full mt-4">

      <div className="w-full max-w-5xl">

        <div className="relative">
          <img src={fotoAcai} alt="Copo açaí" className="w-full h-40 object-cover rounded" />

          <button
            onClick={() => navigate('/vendas/pedido-de-venda')}
            className="md:hidden absolute top-2 left-2 rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg shadow-black/80 text-black"
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

                  // procura se o complemento já foi escolhido
                  const selecionado = adicionaisProduto.find((p) => p.id === addOn.id);
                  const quantidade  = selecionado?.quantidade ?? 0;

                  const totalSelecionadosDoGrupo = adicionaisProduto
                    .filter((item) => item.idGrupoComplementos === addOnGroup.id)
                    .reduce((acc, item) => acc + item.quantidade, 0);

                  const atingiuMaximo = totalSelecionadosDoGrupo >= addOnGroup.qtdMaxComplemento;

                  // Se atingiu o máximo e esse complemento ainda não foi selecionado, aplica opacidade
                  const desabilita = atingiuMaximo && (!selecionado || quantidade === 0);


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
                              onClick={() => diminuirQtdAdicionalItem({
                                id: addOn.id,
                                idGrupoComplementos: addOn.idGrupoComplementos,
                                preco: Number(addOn.preco),
                                nomeComplemento: addOn.nomeComplemento,
                                quantidade: 1
                              })}
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
                          onClick={() => aumentarQtdAdicionalItem({
                            id: addOn.id,
                            idGrupoComplementos: addOn.idGrupoComplementos,
                            preco: Number(addOn.preco),
                            nomeComplemento: addOn.nomeComplemento,
                            quantidade: 1
                          })}
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

        <div className='mt-2 mb-24'>
          <div className='h-15 bg-gray-300 flex items-center mb-1'>
            <p className='ml-4 text-lg font-medium'>Observação</p>
          </div>
          <Textarea placeholder="Ex: Banana cortar em fatias grossas." />
        </div>

       
      
        
        <div className='fixed bottom-0 left-0 right-0 bg-white'>
          <Button
            className='w-full md:ml-12 h-18 bg-green-500 hover:bg-green-600 rounded-none cursor-pointer px-6'
            onClick={() => {
              if (!addOnGroup) return;
              adicionarItem({
                id: addOnGroup.id,
                nomeProduto: addOnGroup.nomeProduto,
                imagemUrl: addOnGroup.imagemUrl,
                preco: Number(addOnGroup.preco),
                adicionais: [...adicionaisProduto]
              });
              navigate('/vendas/carrinho');
            }}
          >
            <div className='w-full justify-between flex items-center'>

              <p className='text-2xl font-bold'>Avançar</p>
              <div className='flex items-center'>
                <p className='text-xl font-bold'>R$ {formatarMoedaBRL(String(addOnGroup?.preco))}</p>
                <ChevronRight className="flex-shrink-0" style={{ width: '46px', height: '46px' }} />
              </div>

            </div>
          </Button>

        </div>
        
      



      </div>

    </section>
  )
  

  
}

export default SelecionarAcompanhamentos



