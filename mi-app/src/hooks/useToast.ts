import { useCallback, useState } from "react";
import type { TipoToast } from "../components/Toast";

type ToastData = { id: number; mensaje: string; tipo: TipoToast };

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const mostrarToast = useCallback(
    (mensaje: string, tipo: TipoToast = "exito") => {
      setToast({ id: Date.now(), mensaje, tipo });
    },
    []
  );

  const cerrarToast = useCallback(() => setToast(null), []);

  return { toast, mostrarToast, cerrarToast };
}