import type { AddOns } from "./addOns";


export type AddOnGroup = {
  id: number;
  idProduto: number;
  nomeGrupoComplementos: string;
  obrigatorio: boolean;
  qtdMinComplemento: number;
  qtdMaxComplemento: number;
  Complementos?: AddOns[];
}

