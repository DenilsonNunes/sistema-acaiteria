import { z } from "zod";



const createProductSchema = z.object({
  nomeProduto: z.string().nonempty({message: 'O nome do produto não pode ser vazio'}).max(80, {message: 'Não poder ser maior que 80 caracteres.'}),
  descricao: z.string().max(1000, {message: 'Não poder ser maior que 1000 caracteres.'}),

  preco: z.number({
    required_error: 'O preço é obrigatório',
    invalid_type_error: 'Digite um número válido para o preço',
  }).positive({ message: "O preço deve ser maior que zero" }),

  status: z.boolean(),
  idCategoria: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }),
  imagem: z.any().optional(),
})



const createGrupoComplementosSchema = z.object({
  nomeGrupoComplementos: z.string().nonempty({message: 'O nome do grupo não pode ser vazio'}).max(40, {message: 'Não poder ser maior que 40 caracteres.'}),
  obrigatorio: z.boolean(),
  qtdMax: z.number(),
  qtdMin: z.number()
})


const createComplementosSchema = z.object({
  nomeComplemento: z.string().nonempty({message: 'O nome do grupo não pode ser vazio'}).max(80, {message: 'Não poder ser maior que 80 caracteres.'}),
  descricao: z.string().max(200, {message: 'Não poder ser maior que 200 caracteres.'}),
  status: z.boolean(),

  preco: z.number({
    required_error: 'O preço é obrigatório',
    invalid_type_error: 'Digite um número válido para o preço',
  }).positive({ message: "O preço deve ser maior que zero" }),

  imagem: z.any().optional(),

})



export const createFullSchema = z.object({

  
  produto: createProductSchema,
  temComplementos: z.boolean(),
  grupoComplementos: createGrupoComplementosSchema.optional(),
  complementos: z.array(createComplementosSchema).optional(),


})

export type FullCreateProducSchema = z.infer<typeof createFullSchema>;