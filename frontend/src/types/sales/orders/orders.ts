

export interface Orders {
  id: number,
  idCliente: number,
  nomeCliente: string,
  observacao: string | null,
  valorTotal: string,
  cliente: Cliente,


  data_criacao: string,
  data_alteracao: string
}


interface Cliente {
  nome: string,
  apelido: string,
}
