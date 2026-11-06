import { useEffect, useState } from "react";
import { obtenerCampeones, type ChampionData } from "../api";

export function useCampeones() {
  const [campeones, setCampeones] = useState<ChampionData[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    obtenerCampeones(controller.signal)
      .then((res) => setCampeones(Object.values(res.data)))
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Error desconocido");
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });

    return () => controller.abort();
  }, []);

  return { campeones, cargando, error };
}