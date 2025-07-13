import { create } from "zustand";



export type AddOns = {
  //id: number,
  //idGrupoComplementos: number,
  nomeComplemento: string,
  //descricao: string | null,
  //status: boolean,
  //preco: string,
  //imagemUrl: string | null
}



type AddOnGroup = {
  id: number;
  nomeGrupoComplementos: string;
  obrigatorio: boolean;
  qtdMinComplemento: number;
  qtdMaxComplemento: number;
  // complementos: AddOns[];
};



type AddOnGroupStore = {
  addOnGroupStore: AddOnGroup[];
  addGroup: (groupData: Omit<AddOnGroup, 'id'>) => number;
  updateGroupComplementos: (groupId: number, complementos: AddOns[]) => void;
};

export const useProductAddOnGroup = create<AddOnGroupStore>((set, get) => ({
  addOnGroupStore: [],

  // Função para adicionar um novo grupo com apenas o nome
  addGroup: (groupData: Omit<AddOnGroup, 'id'>): number => {
    const id = get().addOnGroupStore.length > 0
      ? Math.max(...get().addOnGroupStore.map((group) => group.id)) + 1
      : 1;

    const newGroup: AddOnGroup = { id, ...groupData };

    set((state) => ({
      addOnGroupStore: [...state.addOnGroupStore, newGroup],
    }));

    return id;
  },

  updateGroupComplementos: (groupId: number, complementos: AddOns[]) => {
  set((state) => {
    const gruposAtualizados = state.addOnGroupStore.map((grupo) =>
      grupo.id === groupId ? { ...grupo, complementos } : grupo
    );

    return { addOnGroupStore: gruposAtualizados };
  });
}


}));