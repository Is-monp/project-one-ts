import { useEffect, useState } from "react";
import { obtenerCampeon, type ChampionData } from "../api";

export function useCampeon(id: string | undefined) {
  const [campeon, setCampeon] = useState<ChampionData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCargando(false);
      setError("Falta el identificador del campeón");
      return;
    }

    const controller = new AbortController();
    setCargando(true);
    setError(null);
    setCampeon(null);

    obtenerCampeon(id, controller.signal)
      .then((c) => setCampeon(c ?? null))
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Error desconocido");
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });

    return () => controller.abort();
  }, [id]);

  return { campeon, cargando, error };
}