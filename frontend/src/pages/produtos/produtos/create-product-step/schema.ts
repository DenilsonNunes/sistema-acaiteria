import { z } from "zod";

// Esquema de validação completo
const createComplementosSchema = z.object({
  nomeComplemento: z
    .string()
    .nonempty({ message: "O nome do complemento é obrigatório" })
    .max(80, { message: "Não pode ser maior que 80 caracteres" }),
  descricao: z
    .string()
    .max(200, { message: "Não pode ser maior que 200 caracteres" })
    .optional(),
  status: z.boolean(),
  preco: z
    .number({
      required_error: "O preço é obrigatório",
      invalid_type_error: "Digite um número válido para o preço",
    })
    .min(0, { message: "O preço deve ser maior ou igual a zero" }),
  imagem: z.any().optional(),
});

const createGrupoComplementosSchema = z.object({

  nomeGrupoComplementos: z
    .string()
    .nonempty({ message: "O nome do grupo é obrigatório" })
    .max(40, { message: "Não pode ser maior que 40 caracteres" }),
  obrigatorio: z.boolean(),
  qtdMaxComplemento: z
    .number()
    .min(0, { message: "A quantidade máxima não pode ser menor que 0" }),
  qtdMinComplemento: z
    .number()
    .min(0, { message: "A quantidade mínima não pode ser menor que 0" }),
   complementos: z
    .array(createComplementosSchema)
    .min(1, { message: "Cada grupo deve ter ao menos um complemento" }),

}).refine((data) => data.qtdMinComplemento <= data.qtdMaxComplemento, {
  path: ["qtdMinComplemento"],
  message: "A quantidade mínima não pode ser maior que a máxima",
})



export const createProductSchema = z.object({
  nomeProduto: z
    .string()
    .nonempty({ message: "O nome do produto é obrigatório" })
    .max(80, { message: "Não pode ser maior que 80 caracteres" }),
  descricao: z
    .string()
    .max(1000, { message: "Não pode ser maior que 1000 caracteres" })
    .optional(),
  preco: z
    .number({
      required_error: "O preço é obrigatório",
      invalid_type_error: "Digite um número válido para o preço",
    })
    .positive({ message: "O preço deve ser maior que zero" }),
  status: z.boolean(),
  idCategoria: z.coerce
    .number({ invalid_type_error: "Selecione uma categoria" }),

  imagem: z.any().optional(),
  gruposComplementos: z.array(createGrupoComplementosSchema),
});


export type CreateProductStepSchema = z.infer<typeof createProductSchema>;