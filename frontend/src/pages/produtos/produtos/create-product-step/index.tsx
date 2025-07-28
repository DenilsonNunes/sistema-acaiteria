import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Minus, Plus, Save, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { createProductSchema, type CreateProductStepSchema } from "./schema";
import type { Category } from "@/types/produtos/category";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "@/hooks/categories/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateProductWithAddons } from "@/hooks/products/useCreateProductWithAddons";
import LoadingSpinner from "@/components/loading-spinner";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";







const ProductFormStep = () => {

  const navigate = useNavigate();

  const { categoryId } = useParams();

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [temComplementos, setTemComplementos] = useState<string | null>(null);
  const [accordionOpenIndex, setAccordionOpenIndex] = useState<string | undefined>("0");


  const {mutate, reset: resetMutation, isPending, isSuccess} = useCreateProductWithAddons();

  const {fetchCategories} = useCategories();
  const { data: categories, isLoading, isError } = fetchCategories;





  const { control, handleSubmit, formState: { errors }, register, setValue, watch, trigger, getValues } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      nomeProduto: "",
      descricao: "",
      preco: 0,
      status: true,
      idCategoria: Number(categoryId),
      imagem: null,
      gruposComplementos: [],
    },
    mode: "onChange"
  });

  const dadosProduto = getValues();

  const status = watch('status');
  const selectedCategory = watch("idCategoria")


  const { fields, append, remove } = useFieldArray({
    control,
    name: "gruposComplementos",
  });



  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setValue('imagem', file);
      trigger('imagem');
    }
  };





  const handleCreateProduct = (data: CreateProductStepSchema) => {

    mutate(data);
    // Aqui você pode enviar os dados para sua API
  };

  const nextStep = async () => {

    if (step === 1) {

      const isValidProduct = await trigger([
        "nomeProduto",
        "descricao",
        "preco",
        "status",
        "idCategoria",
        "imagem",
      ]);

      if (!isValidProduct) return;

      setStep(step + 1);

    } else if(step === 2) {

      if (temComplementos === "sim") {
        const isValidGrupos = await trigger("gruposComplementos");

        if (!isValidGrupos) return;
      }

      // Se for "nao", ou validou os grupos
      setStep(3);

    }
  };


  const prevStep = () =>  {

    if(step === 3) {

      setStep(2);

    } else if (step === 2) {

      setStep(1);

    }

  }


  const handleValueTemComplementos = (value: string) => {

    if(value === "sim"){

      setTemComplementos(value);

    } else {

      setValue("gruposComplementos", []);
      setTemComplementos(value);


    }
  };




  if(isPending) {
    return (
      <div className='w-full max-w-5xl p-30 flex items-center justify-center'>
        <LoadingSpinner size={100}/>
      </div>
    )
  }

  if(isError) {
    return (
      <div className='w-full max-w-5xl p-30 flex items-center justify-center'>
        <p className='text-lg'>Houve um erro ao criar o produto</p>
      </div>
    )
  }


  if(isSuccess) {

    toast.success("Produto criado com sucesso!", {
      richColors: true,
      closeButton: true,
      position: "top-right"
    })

    navigate('/produtos/categorias');
  }





  return (

    <form onSubmit={handleSubmit(handleCreateProduct)} className="flex w-full justify-center mt-4">

      <div className="w-full max-w-4xl justify-center">

        <div 
          className={
            `w-full flex justify-start  bg-gray-300 py-2 px-4 gap-8 font-medium rounded mb-4 
            shadow  overflow-x-auto whitespace-nowrap scrollbar-hide
          `}
        >

          <div className="grid">
            <p className={`${step === 1 ? 'text-fuchsia-700' : 'text-fuchsia-400 cursor-not-allowed'}`}>Produto</p>
            <div className={`h-1 bg-fuchsia-600 rounded-lg ${step !== 1 && 'hidden'}`}></div>
          </div>

          <div className="grid">
            <p className={`${step === 2 ? 'text-fuchsia-700' : 'text-fuchsia-400 cursor-not-allowed'}`}>Grupo de complementos</p>
            <div className={`h-1 bg-fuchsia-600 rounded-lg ${step !== 2 && 'hidden'}`}></div>
          </div>

          <div className="grid">
            <p className={`${step === 3 ? 'text-fuchsia-700' : 'text-fuchsia-400 cursor-not-allowed'}`}>Revisão</p>
            <div className={`h-1 bg-fuchsia-600 rounded-lg ${step !== 3 && 'hidden'}`}></div>
          </div>

        </div>
        
        {/* Step 1: Informações do Produto */}
        {step === 1 && (
          <div className="w-full max-w-2xl mx-auto">

            <div className="grid gap-4 border p-4 rounded-lg">

              <div className="flex items-start flex-col sm:flex-row">
                {/* IMAGEM */}
                <div className="grid mb-2 mr-4">

                  <Label className="mb-2">Imagem</Label>
                  <div className="flex gap-2 items-center">

                    {/* Wrapper para input invisível e label estilizado */}
                    <label
                      htmlFor="fileInput"
                      className={`${!fileImage && 'border-2 border-dotted border-gray-400'} w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition`}
                    >
                      {fileImage ? (
                        <img
                          src={URL.createObjectURL(fileImage)}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ImagePlus size={30} />
                      )}
                                                      
                    </label>

                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    
                  </div>

                </div>

                <div className="grid w-full gap-4">
                  <div className="grid w-full">
                    <Label className="mb-2">Nome do produto</Label>
                    <Input
                      placeholder="Ex: Copo 400ml"
                      {...register("nomeProduto")}
                    />
                    {errors.nomeProduto && (
                      <p className="text-red-500 text-sm">{errors.nomeProduto.message}</p>
                    )}
                  </div>

                  <div className="grid w-full">
                    <Label className="mb-2">Descrição</Label>
                    <Textarea
                      placeholder="Informe a descrição"
                      {...register("descricao")}
                    />
                    {errors.descricao  && (
                      <p className="text-red-500 text-sm">{errors.descricao.message}</p>
                    )}
                  </div>
                </div>

              </div>

              <div className="flex items-start justify-between">

                <div className='grid gap-2'>

                  <Label>Categoria</Label>
                  <Select
                    value={selectedCategory?.toString() ?? ''}                     
                    onValueChange={(val) => {
                      setValue("idCategoria", Number(val))
                      trigger("idCategoria")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories && categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                  {errors.idCategoria && <p className="text-sm text-red-500">{errors.idCategoria.message}</p>}

                </div>

                <div className="grid gap-2">

                  <div className="flex items-start gap-8">

                    <div className="grid gap-2">
                      <Label>Preço</Label>
                      <div className="relative w-full max-w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                        <Input
                          type="number"
                          placeholder="0,00"
                          className="pl-10"
                          {...register("preco", { valueAsNumber: true })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 w-24">

                      <Label>Status</Label>
                      <div className="flex gap-2">
                        <Switch
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                          checked={status}
                          onCheckedChange={(checked) => setValue("status", checked)}
                        />
                        <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativo" : "Inativo"}</Label>
                      </div>

                    </div>

                  </div>


                  {errors.preco && (
                    <p className="text-red-500 text-sm">{errors.preco.message}</p>
                  )}

                </div>


              </div>

            </div>

          </div>
        )}

        {/* Step 2: Informações do Grupo de complementos/complementos */}
        {step === 2 && (

          <div className="grid w-full">
  
            <div className="flex flex-col gap-2 mb-6">
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
            </div>
                    
            {fields.map((grupo, index) => {
              
              const nomeGrupo = watch(`gruposComplementos.${index}.nomeGrupoComplementos`);

              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={accordionOpenIndex} // ← controlado
                  onValueChange={setAccordionOpenIndex} // ← atualiza ao abrir/fechar
                  key={grupo.id}
                >
                  <AccordionItem value={String(index)} className="mb-2">
                    <AccordionTrigger
                      className="flex items-center py-2 px-4 bg-gray-300 hover:no-underline rounded-none"
                    >
                      <div className="flex w-full items-center justify-between">

                        <p className="text-xl">
                          {nomeGrupo || `Grupo ${index + 1}`}
                        </p>
      
                        {errors.gruposComplementos?.[index]?.complementos?.message && (

                          <Badge className="bg-red-200 border border-red-300 text-red-500">
                            {errors.gruposComplementos[index].complementos.message}
                          </Badge>

                        )}                

                        <button
                          type="button"
                          className="cursor-pointer p-1 text-red-600 hover:bg-red-200 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation(); // Evita que o Accordion seja acionado
                            remove(index);
                          }}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                    </AccordionTrigger>

                  <AccordionContent className="w-full flex flex-col items-center justify-center border-x border-b px-4 pt-4">
                    
                      <div className="grid gap-8 w-full max-w-2xl border p-4 rounded-lg mb-4">
                        <div className="flex w-full items-center gap-2">
                          <div className="grid w-full">
                            <Label className="mb-2">Nome do grupo de complementos</Label>
                            <Input
                              placeholder="Nome"
                              {...register(`gruposComplementos.${index}.nomeGrupoComplementos`)}
                            />
                            <div
                              className={`flex items-center ${
                                errors.gruposComplementos?.[index]?.nomeGrupoComplementos
                                  ? 'justify-between'
                                  : 'justify-end'
                              }`}
                            >
                              {errors.gruposComplementos?.[index]?.nomeGrupoComplementos && (
                                <span className="text-red-500 text-sm">
                                  {errors.gruposComplementos[index].nomeGrupoComplementos.message}
                                </span>
                              )}
                              <p className="text-xs text-gray-500">
                                {(nomeGrupo?.length || 0)}/40 caracteres
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-3">
                          <Label>Obrigatório ?</Label>
                          <Controller
                            control={control}
                            name={`gruposComplementos.${index}.obrigatorio`}
                            render={({ field }) => (
                              <RadioGroup
                                className="flex gap-8"
                                value={field.value ? "ob" : "op"}
                                onValueChange={(value) => field.onChange(value === "ob")}
                              >
                                <div className="flex items-center gap-1">
                                  <RadioGroupItem value="op" id={`op-${index}`} />
                                  <Label htmlFor={`op-${index}`}>Opcional</Label>
                                </div>
                                <div className="flex items-center gap-1">
                                  <RadioGroupItem value="ob" id={`ob-${index}`} />
                                  <Label htmlFor={`ob-${index}`}>Obrigatório</Label>
                                </div>
                              </RadioGroup>
                            )}
                          />
                        </div>

                        <div className="grid">
                          <div className="flex gap-8">
                            <div className="grid gap-1">
                              <Label>Mínimo</Label>
                              <Controller
                                control={control}
                                name={`gruposComplementos.${index}.qtdMinComplemento`}
                                render={({ field }) => (
                                  <div className="w-28 px-2 py-1 flex items-center justify-between gap-4 border border-gray-300 rounded-lg">
                                    <button
                                      type="button"
                                      onClick={() => field.onChange(Math.max(0, field.value - 1))}
                                      className="cursor-pointer"
                                    >
                                      <Minus size={20} />
                                    </button>
                                    <span className="font-medium w-4 text-center">{field.value}</span>
                                    <button
                                      type="button"
                                      onClick={() => field.onChange(field.value + 1)}
                                      className="font-bold cursor-pointer"
                                    >
                                      <Plus size={20} />
                                    </button>
                                  </div>
                                )}
                              />
                            </div>

                            <div className="grid gap-1">
                              <Label>Máximo</Label>
                              <Controller
                                control={control}
                                name={`gruposComplementos.${index}.qtdMaxComplemento`}
                                render={({ field }) => (
                                  <div className="w-28 px-2 py-1 flex items-center justify-between gap-4 border border-gray-300 rounded-lg">
                                    <button
                                      type="button"
                                      onClick={() => field.onChange(Math.max(0, field.value - 1))}
                                      className="cursor-pointer"
                                    >
                                      <Minus size={20} />
                                    </button>
                                    <span className="font-medium w-4 text-center">{field.value}</span>
                                    <button
                                      type="button"
                                      onClick={() => field.onChange(field.value + 1)}
                                      className="cursor-pointer"
                                    >
                                      <Plus size={20} />
                                    </button>
                                  </div>
                                )}
                              />
                              {errors.gruposComplementos?.[index]?.qtdMaxComplemento && (
                                <span className="text-sm text-red-500">
                                  {errors.gruposComplementos[index].qtdMaxComplemento.message}
                                </span>
                              )}
                            </div>
                          </div>
                          {errors.gruposComplementos?.[index]?.qtdMinComplemento && (
                            <span className="text-sm text-red-500">
                              {errors.gruposComplementos[index].qtdMinComplemento.message}
                            </span>
                          )}
                        </div>

                      </div>
                      
                        {/* FieldArray para Complementos */}
                        <ComplementosFieldArray
                          control={control}
                          register={register}
                          errors={errors}
                          grupoIndex={index}
                        />
                    </AccordionContent>

                  </AccordionItem>
                </Accordion>
              );
            })}

            {temComplementos === "sim" && (

              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded"
                  onClick={() =>
                    append({
                      nomeGrupoComplementos: "",
                      obrigatorio: false,
                      qtdMaxComplemento: 0,
                      qtdMinComplemento: 0,
                      complementos: [],
                    })
                  }
                >
                  <Plus />

                  {watch('gruposComplementos').length === 0 ? "Criar grupo de complementos" : "Criar outro grupo"}
                </Button>
              </div>

            )}
                  
          </div>
        )}

        {/* Step 3: Revisão salvar */}
        {step === 3 && (
     
          <div className="grid w-full">



            {dadosProduto.gruposComplementos?.length > 0 && (

              <>
              
                <h2 className="text-lg font-semibold mb-2">Grupos de Complementos</h2>
                

                {dadosProduto.gruposComplementos.map((grupo, index) => (
        
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      key={index}
                    >
                      <AccordionItem value="1" className="mb-2">
                        <AccordionTrigger
                          className="flex items-center py-2 px-4 bg-gray-300 hover:no-underline rounded-none"
                        >
                          <div className="flex w-full items-center justify-between">

                            <div className="grid">
                              <p className="text-lg">{grupo.nomeGrupoComplementos}</p>
                              <p className="text-xs font-medium text-gray-700">{grupo.complementos.length} opções</p>
                            </div>

                            {grupo.obrigatorio ? (
                              <Badge className="bg-blue-600 rounded">Obrigatório</Badge>
                            ): (
                              <Badge className="rounded" variant="secondary">Opcional</Badge>
                            )}
                      
                          </div>
                                                                                          
                        </AccordionTrigger>
        
                      <AccordionContent className="w-full flex flex-col border-x border-b px-4 pt-4 gap-2">
                        
                        {grupo.complementos.map((complemento) => (
                  
                          <div className="flex items-center justify-between border-b pb-2">

                            <div className="flex items-center gap-6">

                              <div className="flex items-center justify-center border w-15 h-15 rounded-lg overflow-hidden bg-gray-100">
                                {complemento.imagem ? (
                                  <img
                                    src={URL.createObjectURL(complemento.imagem)}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <span className="text-sm text-center text-gray-500">Sem Foto</span>
                                )}
                              </div>
                              
                              <p>{complemento.nomeComplemento}</p>

                            </div>
                        
                            <p><span className="text-xs font-medium">R$</span> {formatarMoedaBRL(complemento.preco)}</p>

                          </div>                                                                                                          

                        ))}

     
                      </AccordionContent>
        
                      </AccordionItem>

                    </Accordion>

                ))}
              
              </>

              
            )}




            <div className="flex justify-between mb-8">
              
              <Button variant="outline" onClick={prevStep} className="cursor-pointer rounded">
                Voltar
              </Button>

              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 cursor-pointer rounded"
              >
                <Save />
                Salvar
              </Button>
            </div>

          </div>
        )}

        <Separator className="mt-4 mb-2"/>


        {step <= 2 && (
          
          <div className="flex justify-between mt-1">
            <Button
              disabled={step === 1}
              variant="outline"
              onClick={prevStep}
              className="cursor-pointer rounded"
            >
              Voltar
            </Button>

            {step !== 2 && (

              <Button
                type="button"
                onClick={nextStep}
                className="cursor-pointer"
              >
                Próximo
              </Button>

            )}

            {step === 2 && temComplementos === "sim" && watch('gruposComplementos').length > 0 && (
            
              <Button
                type="button"
                onClick={nextStep}
                className="cursor-pointer"
              >
                Próximo
              </Button>

            )}

     
          </div>
        )}


      </div>


    </form>
  );
}

// Componente para gerenciar complementos dentro de cada grupo
function ComplementosFieldArray({ control, register, errors, grupoIndex }) {

  const { fields, append, remove } = useFieldArray({
    control,
    name: `gruposComplementos.${grupoIndex}.complementos`,
  });


  return (

    <div className="grid w-full max-w-2xl border">

      <div className="flex items-center justify-between bg-gray-200 py-2 px-4">

        <h3 className="text-lg font-medium">Complementos</h3>
     
        <button 
          type="button" 
          className="flex gap-2 text-md text-white font-medium items-center bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer rounded px-2 py-1" 
          onClick={() =>
            append({
              nomeComplemento: "",
              descricao: "",
              preco: 0,
              status: true,
              imagem: null,
            })
          }
        >
          <Plus size={20}/>
          Adicionar complementos
        </button>
      

      </div>

      

      <div className="px-4">

        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">

          {fields.map((complemento, compIndex) => (

            <div key={complemento.id} className="border rounded-lg p-4 mb-2">

              <div className="flex items-start flex-col sm:flex-row">

                {/* IMAGEM */}
                <div className="grid mb-4 mr-4">
                  <Label className="mb-2">Imagem</Label>
                  <div className="flex gap-2 items-center">
                    <Controller
                      control={control}
                      name={`gruposComplementos.${grupoIndex}.complementos.${compIndex}.imagem`}
                      render={({ field }) => (
                        <label
                          htmlFor={`fileInput-${grupoIndex}-${compIndex}`}
                          className={`${!field.value && 'border-2 border-dotted border-gray-400'} w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition`}
                        >
                          {field.value ? (
                            <img
                              src={URL.createObjectURL(field.value)}
                              alt="Preview"
                              className="object-cover w-full h-full rounded-lg"
                            />
                          ) : (
                            <ImagePlus size={30} />
                          )}
                          <input
                            id={`fileInput-${grupoIndex}-${compIndex}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-3 w-full">

                  <div className="grid w-full">
                    <Label className="mb-2">Nome do complemento</Label>
                    <Input 
                      {...register(
                        `gruposComplementos.${grupoIndex}.complementos.${compIndex}.nomeComplemento`
                      )}                       
                    />
                    <div className={`flex items-center ${errors.gruposComplementos?.[grupoIndex]?.complementos?.[compIndex]?.nomeComplemento ? 'justify-between' : 'justify-end'}`}>
                      {errors.gruposComplementos?.[grupoIndex]?.complementos?.[compIndex]?.nomeComplemento && (
                        <span className="text-red-500 text-sm">
                          {
                            errors.gruposComplementos[grupoIndex].complementos[compIndex].nomeComplemento.message
                          }
                        </span>
                      )}
                      <p className="text-xs text-gray-500">{0}/80 caracteres</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Descrição</Label>
                    <Textarea placeholder="Informe a descrição do complemento" 
                      {...register(
                        `gruposComplementos.${grupoIndex}.complementos.${compIndex}.descricao`
                      )}
                    />
                    <div className={`flex items-center ${errors.gruposComplementos?.[grupoIndex]?.complementos?.[compIndex]?.descricao ? 'justify-between' : 'justify-end'}`}>
                      {errors.gruposComplementos?.[grupoIndex]?.complementos?.[compIndex]?.descricao && (
                        <span className="text-red-500 text-sm">
                          {errors.gruposComplementos[grupoIndex].complementos[compIndex].descricao.message}
                        </span>
                      )}
                      <p className="text-xs text-gray-500">{0}/200 caracteres</p>
                    </div>
                  </div>

                </div>


              </div>
                        


              <div className="grid">

                <div className="flex items-start gap-8"> 

                  <div className="grid">

                    <Label className="mb-2">Preço</Label>

                    <div className="w-full max-w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                          R$
                        </span>
                        <Input
                          type="number"
                          placeholder="0,00"
                          className="pl-10"
                          {...register(
                            `gruposComplementos.${grupoIndex}.complementos.${compIndex}.preco`,
                            { valueAsNumber: true }
                          )}
                        />
                      </div>
                    </div>



                  </div>

                  <div className="grid gap-4">
                    <Label>Status</Label>
                    <div className="flex gap-2">
                      <Controller
                        control={control}
                        name={`gruposComplementos.${grupoIndex}.complementos.${compIndex}.status`}
                        render={({ field }) => (
                          <>
                            <Switch
                              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(checked)}
                            />
                            <Label className={field.value ? 'text-green-600' : 'text-red-600'}>
                              {field.value ? 'Ativado' : 'Pausar'}
                            </Label>
                          </>
                        )}
                      />
                    </div>
                  </div>

                </div>




                {errors.gruposComplementos?.[grupoIndex]?.complementos?.[compIndex]?.preco && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.gruposComplementos[grupoIndex].complementos[compIndex].preco.message}
                  </span>
                )}
                      
              </div>

              <div className="flex justify-end">

                <button
                  type="button" 
                  className="cursor-pointer p-0.5 text-red-600"
                  onClick={() => remove(compIndex)}
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>



    </div>

  );
}


export default ProductFormStep