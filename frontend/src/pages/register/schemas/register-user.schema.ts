import { z } from "zod";


export const registerUserSchema = z.object({
  nome: z
    .string()
    .nonempty({ message: "O nome é obrigatório" }),
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({message: "O formato de email inválido"}),
  password: z
    .string()
    .nonempty('A senha é obrigatório'),
  confirmPassword: z
    .string()
    .nonempty('A confirmação da senha é obrigatório'),

});




export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
