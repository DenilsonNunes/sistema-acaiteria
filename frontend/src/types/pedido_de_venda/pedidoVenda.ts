type AdicionalItem = {
  id: number;
  nomeComplemento: string;
  quantidade: number;
}



export type ItemPedido = {
  id: number;
  nomeProduto: string;
  preco: number;
}

export type Cart = {

  id: number;
  nomeProduto: string;
  preco: number;
  precoTotal: number;
  quantidade: number;
  adicionais: AdicionalItem[]

}

