
import { Textarea } from '@/components/ui/textarea';
import fotoAcai from '../../../../assets/acai.jpeg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { ArrowLeft, ChevronRight} from "lucide-react";
import { useContext, useEffect, useRef, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types/produtos/product';
import LoadingSpinner from '@/components/loading-spinner';
import { useSelectSideDishes } from '@/hooks/sales/sales_order/useSelectSideDishes';
import type { ResponseSelectSideDishes } from '@/types/pedido_de_venda/selectSideDishes';
import { formatarMoedaBRL } from '@/utils/formataMoedaBRL';
import { PedidoVendaContext } from '@/contexts/PedidoContext';
import type { ItemPedido } from '@/types/pedido_de_venda/pedidoVenda';











const SelecionarAcompanhamentos = () => {
   const { id: idProduto } = useParams();

  const navigate = useNavigate();
  const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1");
  const itemRef = useRef<HTMLDivElement>(null);
  
  const {adicionarItem, removerItem, cart} = useContext(PedidoVendaContext);
  

  const {data: addOnGroup, isLoading, isError} = useSelectSideDishes(idProduto)

  const product = {
    id: addOnGroup?.id,
    nomeProduto: addOnGroup?.nomeProduto,
    preco: addOnGroup?.preco
  }

  
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
    <section className="flex px-2 w-full h-screen">

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
          value={accordionValue}
          onValueChange={setAccordionValue}
        >

          {addOnGroup?.GrupoComplementos && addOnGroup.GrupoComplementos.map((addOnGroup)=> (
            <AccordionItem value={String(addOnGroup.id)}>

              <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
                <div className="flex flex-col">
                  <p className="font-medium text-white text-2xl">{addOnGroup.nomeGrupoComplementos}</p>
                  <p className="text-white">Escolha entre {addOnGroup.qtdMinComplemento} e {addOnGroup.qtdMaxComplemento} itens</p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance py-4">

                {addOnGroup.Complementos?.map((addOns, index) => (

                  <div key={index} className='flex items-center justify-between border-b-2'>

                    <div className='flex items-center gap-2'>
                      <div className='w-18 h-16 flex items-center justify-center border mb-1'>
                        FOTO
                      </div>
                      <p className='text-lg'>{addOns.nomeComplemento}</p> 
                    </div>


                    <div className="flex items-center gap-4 mr-4">

      
                      <>                      
                        <button 
                          className="w-8 h-8 p-0 text-4xl font-bold text-fuchsia-700 cursor-pointer flex items-center justify-center"                          
                        >
                          -
                        </button>
                        <span className="text-lg font-medium">5</span>                    
                      </>                    
          

                      <button 
                        className="w-8 h-8 p-0 text-3xl font-bold text-fuchsia-700 cursor-pointer flex items-center justify-center"                        
                      >
                        +
                      </button>
                    </div>

                  </div>


                ))}


              </AccordionContent>
              
            </AccordionItem>
          ))}


          <div className='mt-1'>
            <div className='h-15 bg-gray-300 flex items-center mb-1'>
              <p className='ml-4 text-lg font-medium'>Observação</p>
            </div>
            <Textarea placeholder="Ex: Banana cortar em fatias grossas." />
          </div>

        </Accordion>

        <button 
          className='w-full md:ml-12 h-15 flex justify-between items-center bg-green-500 pl-4 cursor-pointer fixed bottom-0 left-0 right-0 px-4'
          onClick={() => {
            adicionarItem(product);
            navigate('/vendas/carrinho');
          }}
        >
          <p className='text-2xl font-medium'>Avançar</p>
          <div className='flex items-center'>
            <p className='text-lg font-bold'>R$ {formatarMoedaBRL(String(addOnGroup?.preco))}</p>
            <ChevronRight size={50}/>
          </div>
        </button>


      </div>

    </section>
  )
  

  
}

export default SelecionarAcompanhamentos



