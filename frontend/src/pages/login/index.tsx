import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2Icon } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"





const signInSchema = z.object({

  user: z.string().nonempty('O campo usuário é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório')

})


type SignInSchema = z.infer<typeof signInSchema>










const Login = () => {


  const  { login } = useAuth()


  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({
    resolver: zodResolver(signInSchema),
  })

  

  const handleSignIn = async (data: SignInSchema) => {
    try {
      await login(data.user, data.password)
      toast.success("Login realizado com sucesso!", {
        richColors: true,
        closeButton: true
      })

    } catch (error) {

      const response = error.response.data;
      console.log('CAiuu aqui...', response)
      alert("Deu erro..."+ error)
    }
    
  }
  


  return (

    <form onSubmit={handleSubmit(handleSignIn)} className="w-full h-screen flex justify-center items-center">

      <div className="w-full max-w-md flex flex-col gap-3 mx-4 p-8 rounded-lg border shadow-2xl">
        <h1 className="text-4xl font-medium text-center text-fuchsia-700">Login</h1>

        <div className="w-full">
          <Label className="text-lg mb-0.5">Usuario</Label>
          <Input className="bg-white" type="text" placeholder="Digite o usuario..." {...register('user')}/>
          {errors.user && <span className="text-red-500 text-sm">{errors.user.message}</span>}

        </div>

        <div className="w-full mb-6">
          <Label  className="text-lg mb-0.5">Senha</Label>
          <Input className="bg-white" type="password"  placeholder="Digite sua senha..." {...register('password')}/>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        
        </div>
        
        <Button 
          type="submit" 
          //disabled
          className="w-full cursor-pointer text-lg bg-fuchsia-700 text-white hover:bg-fuchsia-600"
        >
          {/*
          
          <Loader2Icon className="animate-spin" />
          
          */}
          Entrar
        </Button>

      </div>


    </form>
  )
}

export default Login