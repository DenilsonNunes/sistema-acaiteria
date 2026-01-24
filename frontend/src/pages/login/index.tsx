import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2Icon } from "lucide-react"
import { AuthContext } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"





const signInSchema = z.object({

  email: z.string().nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório')

})


type SignInSchema = z.infer<typeof signInSchema>








const Login = () => {

  const [ isLoading, setIsLoading] =  useState(false);


  const navigate = useNavigate();

  const  { login } = useContext(AuthContext);


  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: zodResolver(signInSchema),
  })

  

  const handleSignIn = async (data: SignInSchema) => {

    setIsLoading(true);

    try {

      await login(data.email, data.password);

      toast.success("Login realizado com sucesso!", {
        richColors: true,
        closeButton: true,
        position: "top-right"
      })
 

      setTimeout(() => {

        setIsLoading(false);

        navigate('/home');
    
      }, 2000)
      

    } catch (error) {

      const message = error instanceof Error ? error.message : typeof error === 'string' ? error : 'Erro desconhecido';


      toast.error(message, {
        richColors: true,
        closeButton: true,
        duration: 5000,
        position: "top-right"
      })

      setIsLoading(false);
      reset();

    }

  }
  


  return (

    <form onSubmit={handleSubmit(handleSignIn)} className="w-full h-screen flex justify-center items-center">

      <div className="w-full max-w-md flex flex-col gap-3 mx-4 p-8 rounded-lg border shadow-2xl">
        <h1 className="text-4xl font-medium text-center text-fuchsia-700">Login</h1>

        <div className="w-full">
          <Label className="text-lg mb-0.5">Email</Label>
          <Input 
            disabled={isLoading}
            className="bg-white" 
            type="email" 
            placeholder="Digite o email..." 
            {...register('email')}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        </div>

        <div className="w-full mb-6">
          <Label  className="text-lg mb-0.5">Senha</Label>
          <Input 
            className="bg-white" 
            type="password"  
            placeholder="Digite sua senha..." 
            {...register('password')}
            disabled={isLoading}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full cursor-pointer text-lg bg-fuchsia-700 text-white hover:bg-fuchsia-600"
        >    
          {isLoading && (
            <Loader2Icon className="animate-spin" />                  
          )}                
          Entrar
        </Button>

      </div>


    </form>
  )
}

export default Login