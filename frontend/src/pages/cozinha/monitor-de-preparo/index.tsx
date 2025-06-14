
const MonitorPreparo = () => {
  return (
    <section className="p-2 w-full h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">Monitor de preparação</h1>


      <div className="grid grid-cols-3 gap-2">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800  rounded shadow">
          <p className="font-medium">Aguardando preparação</p>
        </div>

        <div className="bg-blue-100 border border-blue-500 text-blue-800  rounded shadow">
          <p className="font-medium">Em preparação</p>
        </div>

        <div className="bg-green-100 border border-green-500 text-green-800  rounded shadow">
          <p className="font-medium">Finalizado</p>
        </div>

      </div>


    </section>
  )
}

export default MonitorPreparo