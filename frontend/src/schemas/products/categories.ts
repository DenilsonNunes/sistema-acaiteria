import { z } from "zod"

export const createCategorySchema = z.object({

  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}).max(40, {message: 'Não poder ser maior que 40 caracteres.'}),

})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>