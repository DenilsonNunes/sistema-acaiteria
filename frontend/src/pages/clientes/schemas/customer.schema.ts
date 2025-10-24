import { z } from "zod";


export const createCustomerSchema = z.object({
  nome: z
    .string()
    .nonempty({ message: "O nome é obrigatório" })
    .max(80, { message: "Não pode ser maior que 80 caracteres" }),
  apelido: z
    .string()
    .max(120, { message: "Não pode ser maior que 120 caracteres" })
    .optional(),
  fone: z
    .string()
    .max(15, { message: "O número não pode ser maior que 15 caracteres" })
    .optional(),
  status: z.boolean(),
  endereco: z
    .string()
    .max(200, { message: "Não pode ser maior que 200 caracteres" })
    .optional(),
  limiteCredito: z
    .number()
    .optional(),
  data_nascimento: z
    .string()
    .optional(),
});




export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

export type UpdateCustomerSchema = z.infer<typeof createCustomerSchema>;