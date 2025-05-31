import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="w-full h-lvh flex flex-col items-center justify-center">

      <h1 className="text-6xl">404</h1>
      <h1 className="text-4xl mb-8">Pagina não encontrada!</h1>

      <Link to='/home' className="text-blue-700">Voltar para o inicio</Link>
      
    </div>
  )
}

export default NotFound