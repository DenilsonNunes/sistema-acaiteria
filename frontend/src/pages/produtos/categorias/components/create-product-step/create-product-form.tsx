import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFullSchema, type FullCreateProducSchema } from "./schema";
import StepProduct from "./step1-product";
import StepAddOnsGroup from "./step2-AddOns-Group";
import StepAddOns from "./step3-addOns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCreateProduct } from "@/hooks/produtos/useCreateProductCategory";
import LoadingSpinner from "@/components/loading-spinner";
import { CircleAlert, CircleCheck } from "lucide-react";
import type { Category } from "@/types/produtos/category";










const CreateProductForm = ({ category } : {category: Category}) => {

  const {mutate, isPending, isError, isSuccess, reset: resetMutation} = useCreateProduct()

  const [currentStep, setCurrentStep] = useState("detalhes");
  const [openFormAddOns, setOpenFormAddOns] = useState(false);
  const [checkedComplementos, setCheckedComplementos] = useState("");

  const [habilitaBtnProx, setHabilitaBtnProx] = useState(true);
  const [habilitaBtnSalvar, setHabilitaBtnSalvar] = useState(false);




  const methods = useForm<FullCreateProducSchema>({
    resolver: zodResolver(createFullSchema),
    defaultValues: {
      temComplementos: false,
      produto: {
        idCategoria: category.id,
        status: true,
        nomeProduto: "",
        preco: 0,
      },
      grupoComplementos: {
        nomeGrupoComplementos: "",
        obrigatorio: false,
        qtdMin: 0,
        qtdMax: 0,
      },
      complementos: [],
    },
    mode: "onChange",
  });

  const { trigger, handleSubmit, formState: { errors }, reset, setValue, watch } = methods;

  const temComplementos = watch("temComplementos");



  // Função para atualizar o valor de "temComplementos" e salvar o formulário automaticamente se for "não"
  const handleValueTemComplementos = (value: string) => {

    const novoValor = value === "sim";
    setValue("temComplementos", novoValor);
    setCheckedComplementos("sim");

    if (!novoValor) {

      setHabilitaBtnSalvar(true)
      setOpenFormAddOns(false);
      setValue("grupoComplementos", undefined);
      setValue("complementos", []);

    }
  };

  const handleNextStep = async () => {

    if (currentStep === "detalhes") {
      const isValid = await trigger("produto");
      if (!isValid) return;

      setHabilitaBtnProx(false)
      setCurrentStep("grupoComplementos");


    } else if (currentStep === "grupoComplementos") {

      if (checkedComplementos === "") {
        setCheckedComplementos("nao");
      }

      if (temComplementos) {

        const isValid = await trigger("grupoComplementos");

        if (!isValid) return;
        setCurrentStep("complementos");
        setHabilitaBtnProx(false)
        setHabilitaBtnSalvar(true)

        const isValidComplementos = await trigger("complementos")

        console.log('Esta valido complementos ?', isValidComplementos)



      } else {

        const isValidProduct = await trigger("produto");

        if (!isValidProduct) {
          setCurrentStep("detalhes");
          return;
        }

      }
    }
  };

  const handlePreviousStep = () => {

    if (currentStep === "complementos") {

      setCurrentStep("grupoComplementos");
      setHabilitaBtnProx(true)
      setHabilitaBtnSalvar(false)

    } else if (currentStep === "grupoComplementos") {

      setOpenFormAddOns(false);
      setValue("temComplementos", false);
      setCurrentStep("detalhes");
      setHabilitaBtnProx(true)
      setHabilitaBtnSalvar(false)

    }
  };

  const handleCreateProduct = (data: FullCreateProducSchema) => {
    mutate(data)
  };


  return (
    <div className="mx-4 mt-2">
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            reset();
            resetMutation();
            setCurrentStep("detalhes");
            setOpenFormAddOns(false);
            setCheckedComplementos("");
            setHabilitaBtnSalvar(false)
            setHabilitaBtnProx(true)
          }
        }}
      >

        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded font-medium">
            + Adicionar item
          </Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col  sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
            <Separator className="h-[1px] w-full bg-gray-300 mt-4" />
          </DialogHeader>


          {isPending && (
            <div className="flex items-center justify-center py-15">
              <LoadingSpinner size={100}/>
            </div>
          )}

          {isError && 

            <div className="flex flex-col items-center mt-4  gap-4">
              <CircleAlert color="orange" size={96}/>
              <h1 className="font-medium">Erro ao criar o produto</h1>
            </div>
          }


          {isSuccess && 

            <div className="flex flex-col items-center mt-4  gap-4">
              <CircleCheck color="green" size={96}/>
              <h1 className="font-medium text-gray-500">Produto criado com sucesso</h1>
            </div>
            
          }

          {!isPending && !isError && !isSuccess && (

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleCreateProduct)}>

                <Tabs value={currentStep} onValueChange={setCurrentStep}>
                  
                  <TabsList className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide flex">
                    <TabsTrigger value="detalhes" className="data-[state=active]:bg-gray-300">
                      Detalhes do Produto
                    </TabsTrigger>
                    <TabsTrigger value="grupoComplementos" className="data-[state=active]:bg-gray-300" disabled={currentStep !== "grupoComplementos"}>
                      Grupo de Complementos
                    </TabsTrigger>
                    <TabsTrigger value="complementos" className="data-[state=active]:bg-gray-300" disabled={currentStep !== "complementos"}>
                      Complementos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="detalhes" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
                    <StepProduct />
                  </TabsContent>

                  <TabsContent value="grupoComplementos" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
                    <div className="flex flex-col items-start gap-4">
                      {!openFormAddOns && (
                        <>
                          <div className="flex flex-col gap-2">
                            <label className="block font-medium mb-1">Este produto possui complementos?</label>
                            <RadioGroup onValueChange={handleValueTemComplementos}>
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="sim" id="r1" />
                                <Label htmlFor="r1">Sim</Label>
                              </div>
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="nao" id="r2" />
                                <Label htmlFor="r2">Não</Label>
                              </div>
                            </RadioGroup>
                            {checkedComplementos === "" && (<p className=" text-red-500">selecione uma opção</p>)}
                          </div>
                          {temComplementos && (
                            <button
                              type="button"
                              className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded cursor-pointer"
                              onClick={() => {
                                setOpenFormAddOns(true)
                                setHabilitaBtnProx(true)
                              }}
                            >
                              + Criar grupo de complementos
                            </button>
                          )}
                        </>
                      )}
                      {openFormAddOns && <StepAddOnsGroup />}
                    </div>
                  </TabsContent>

                  <TabsContent value="complementos" className="w-full flex flex-col items-center">
                    <StepAddOns />
                  </TabsContent>
                </Tabs>

                <DialogFooter className={`mt-4 flex justify-between`}>

                  {currentStep !== "detalhes" && (
                    <Button type="button" onClick={handlePreviousStep} variant="outline">
                      Voltar
                    </Button>
                  )}


                  {habilitaBtnProx && (
                    <Button type="button" onClick={handleNextStep} className="bg-blue-600 text-white hover:bg-blue-700">
                      Próximo
                    </Button>
                  )}

                  {habilitaBtnSalvar && (
                    <Button type="submit" className="px-12 bg-green-500 hover:bg-green-600">Salvar</Button>
                  )}


                </DialogFooter>

              </form>
            </FormProvider>

          ) }

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductForm;
