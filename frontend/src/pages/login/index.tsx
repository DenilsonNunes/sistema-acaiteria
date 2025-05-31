import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Login = () => {
  return (


    
    <form className="w-full h-lvh flex justify-center bg-fuchsia-900">

      <div className="w-full max-w-xs mx-10 flex flex-col items-center justify-center gap-4 ">
        <h1 className="text-4xl text-white font-medium">Login</h1>

        <div className="w-full">
          <Label htmlFor="email" className="text-lg text-white mb-0.5">Usuario</Label>
          <Input className="bg-white" type="text" id="user" placeholder="Digite o usuario..."/>
        </div>

        <div className="w-full mb-6">
          <Label htmlFor="email" className="text-lg text-white mb-0.5">Senha</Label>
          <Input className="bg-white" type="password" id="senha" placeholder="Digite sua senha..."/>
        </div>
        
        <Button className="w-full cursor-pointer text-lg bg-blue-700 text-white hover:bg-blue-600">Entrar</Button>

      </div>

    </form>
  )
}

export default Login