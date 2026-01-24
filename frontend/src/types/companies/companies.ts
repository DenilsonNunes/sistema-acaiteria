
export interface Companies {
  id: number;
  id_grupo_empresas: number;
  cod_empresa: number;

  cpf_cnpj: string;
  xNome: string;
  xFant?: string | null;
  xLgr?: string | null;
  numero?: string | null;
  xCpl?: string | null;
  fone?: string | null;

  status: boolean;

  dh_criacao: Date;
  dh_alteracao: Date;

}

