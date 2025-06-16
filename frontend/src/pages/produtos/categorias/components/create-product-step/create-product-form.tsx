import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



import {  FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFullSchema, type FullCreateProducSchema } from "./schema"



import StepProduct from "./step1-product"
import StepAddOnsGroup from "./step2-AddOns-Group"
import StepAddOns from "./step3-addOns"
import { Button } from "@/components/ui/button"
import { useState } from "react"






const CreateProductForm = () => {


  const [currentStep, setCurrentStep] = useState('detalhes');

// No componente principal do formulário:
    const methods = useForm<FullCreateProducSchema>({
      resolver: zodResolver(createFullSchema),
      defaultValues: {
        produto: {
          idCategoria: 1,
          status: true,
          nomeProduto: '',
          preco: 0
        },
        grupoComplementos: {
          nomeGrupoComplementos: '',
          obrigatorio: false,
          qtdMin: 0,
          qtdMax: 0,
        },
        complementos: {
          nomeComplemento: '',
          descricao: '',
          status: true,
          preco: 0,
        }
      },
      mode: 'onChange',
    });


  const { trigger, handleSubmit, formState: { errors }, reset } = methods;


  
  // Função para validar a etapa atual antes de avançar
  const handleNextStep = async () => {

    let isValid = false;

    if (currentStep === 'detalhes') {

      isValid = await trigger('produto');

      if (isValid) setCurrentStep('grupoComplementos');

    } else if (currentStep === 'grupoComplementos') {

      isValid = await trigger('grupoComplementos');

      if (isValid) setCurrentStep('complementos');
    }
  };

  // Função para voltar para a etapa anterior
  const handlePreviousStep = () => {

    if (currentStep === 'complementos') {
      setCurrentStep('grupoComplementos');
    } else if (currentStep === 'grupoComplementos') {
      setCurrentStep('detalhes');
    }
  };

  // Função de envio final
  const handleCreateProduct = (data: FullCreateProducSchema) => {
    console.log('Dados do formulário:', data);
    // Aqui você pode enviar os dados para a API ou realizar outras ações
  };






  return (
    <div className="mx-4 mt-2">
      <Dialog onOpenChange={(open)=>{
          if (!open) {
            reset() // reseta o formulario
          }
      }}>

        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded font-medium">
            + Adicionar item
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
            <Separator className="h-[1px] w-full bg-gray-300 mt-4" />
          </DialogHeader>

          <FormProvider {...methods}>

            <form onSubmit={handleSubmit(handleCreateProduct)} className="w-full">

              <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
                <TabsList className="overflow-x-auto scrollbar-hide">
                  <TabsTrigger value="detalhes" className="data-[state=active]:bg-gray-300">
                    Detalhes do Produto
                  </TabsTrigger>
                  <TabsTrigger value="grupoComplementos" className="data-[state=active]:bg-gray-300" disabled={currentStep !== 'grupoComplementos'}>
                    Grupo de Complementos
                  </TabsTrigger>
                  <TabsTrigger value="complementos" className="data-[state=active]:bg-gray-300" disabled={currentStep !== 'complementos'}>
                    Complementos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="detalhes" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
                  <StepProduct />
                </TabsContent>
                <TabsContent value="grupoComplementos" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
                  <StepAddOnsGroup />
                </TabsContent>
                <TabsContent value="complementos" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
                  <StepAddOns />
                </TabsContent>
              </Tabs>

              <div className={`mt-4 flex ${currentStep === 'detalhes' ? 'justify-end' : 'justify-between'}`}>
                {currentStep !== 'detalhes' && (
                  <Button type="button" onClick={handlePreviousStep} variant="outline">
                    Voltar
                  </Button>
                )}
                {currentStep !== 'complementos' ? (
                  <Button type="button" onClick={handleNextStep} className="bg-blue-600 text-white hover:bg-blue-700">
                    Avançar
                  </Button>
                ) : (
                  <Button type="submit" className="bg-green-500 text-white hover:bg-green-600 px-8">
                    Salvar
                  </Button>
                )}
              </div>

            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductForm;