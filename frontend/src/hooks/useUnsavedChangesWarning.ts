// src/hooks/useUnsavedChangesWarning.ts
import { useEffect } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export function useUnsavedChangesWarning(when: boolean) {
  // 1. Bloqueia refresh ou fechar aba
  useBeforeUnload((event) => {
    if (when) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  // 2. Bloqueia navegação dentro da SPA
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "Você tem alterações não salvas. Deseja realmente sair?"
      );
      if (confirmLeave) {
        localStorage.removeItem('@CartStorage')
        blocker.proceed(); // segue para a rota

      } else {
        blocker.reset(); // cancela navegação
      }
    }
  }, [blocker]);
}
