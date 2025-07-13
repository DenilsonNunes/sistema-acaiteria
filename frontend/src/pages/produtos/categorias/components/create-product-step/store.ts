// store.ts
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export interface Complemento {
  id: string
  nome: string
  preco: number
  descricao: string
  status: boolean
  imagem: File | null
}

export interface GrupoComplemento {
  id: string
  nomeGrupoComplementos: string
  obrigatorio: boolean
  qtdMinComplemento: number
  qtdMaxComplemento: number
  complementos: Complemento[]
}


interface ProdutoState {
  grupos: GrupoComplemento[]
  grupoSelecionadoId: string | null
  setGrupoSelecionado: (id: string) => void
  adicionarGrupo: (grupo: Omit<GrupoComplemento, 'id' | 'complementos'>) => void
  adicionarComplemento: (complemento: Complemento) => void
  limparGrupos: () => void
}

export const useProdutoStore = create<ProdutoState>((set, get) => ({
  
  grupos: [],
  grupoSelecionadoId: null,

  setGrupoSelecionado: (id) => set({ grupoSelecionadoId: id }),

  adicionarGrupo: (grupo) =>
    set((state) => ({
      grupos: [
        ...state.grupos,
        { ...grupo, id: uuidv4(), complementos: [] },
      ],
    })),
  adicionarComplemento: (complemento) => {
    const grupoId = get().grupoSelecionadoId
    if (!grupoId) return

    set((state) => ({
      grupos: state.grupos.map((grupo) =>
        grupo.id === grupoId
          ? { ...grupo, complementos: [...grupo.complementos, complemento] }
          : grupo
      ),
    }))
  },
  limparGrupos: () => set({ grupos: [], grupoSelecionadoId: null }),
}))
