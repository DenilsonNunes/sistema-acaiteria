import { z } from "zod";


export const createDeliveryFeeSchema = z.object({
  bairroRegiao: z
    .string()
    .nonempty({ message: "O Bairro/região é obrigatório" })
    .max(80, { message: "Não pode ser maior que 80 caracteres" }),
  valor: z
    .number()
});




export type CreateDeliveryFeeSchema = z.infer<typeof createDeliveryFeeSchema>;

export type UpdateDeliveryFeeSchema = z.infer<typeof createDeliveryFeeSchema>;