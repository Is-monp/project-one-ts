import { useCallback, useEffect, useState } from "react";
import type { ChampionData } from "../api";
import { useCampeones } from "../hooks/usechampions";
import { useToast } from "../hooks/useToast";
import ChampionCard from "../components/ChampionCard";
// Para usar la versión sin dark pattern cambia por:
//import ConfirmarQuitarDialog from "../components/ConfirmarQuitarDialog";
import Toast from "../components/Toast";

import QuitarFavoritoDarkDialog from "../components/QuitarFavoritoDarkDialog";

type FavouritesProps = {
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
};

function Favourites({ favoritos, onToggleFavorito }: FavouritesProps) {
  const { campeones, cargando, error } = useCampeones();
  const { toast, mostrarToast, cerrarToast } = useToast();
  const [porQuitar, setPorQuitar] = useState<ChampionData | null>(null);

  const cancelarQuitar = useCallback(() => setPorQuitar(null), []);

  // Si falla la carga, además del mensaje en pantalla mostramos un toast de error
  useEffect(() => {
    if (error) mostrarToast(error, "error");
  }, [error, mostrarToast]);

  const lista = campeones.filter((c) => favoritos.includes(c.id));

  // Aquí todos son favoritos, así que cualquier toggle significa "quitar": pedimos confirmación
  const pedirConfirmacion = (campeon: ChampionData) => setPorQuitar(campeon);

  const confirmarQuitar = (campeon: ChampionData) => {
    onToggleFavorito(campeon.id);
    setPorQuitar(null);
    mostrarToast(`${campeon.name} eliminado de favoritos`, "info");
  };

  return (
    <main className="flex-1 bg-[#010A13] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-wider text-[#F0E6D2]">
          Mis{" "}
          <span className="bg-linear-to-r from-[#C8AA6E] to-[#0AC8B9] bg-clip-text text-transparent">
            Favoritos
          </span>
        </h1>

        {cargando && (
          <p role="status" className="text-center text-sm text-[#A09B8C]">
            Cargando...
          </p>
        )}

        {error && (
          <p role="alert" className="text-center text-sm text-red-300">
            {error}
          </p>
        )}

        {!cargando && !error && lista.length === 0 && (
          <p className="text-center text-sm text-[#A09B8C]">
            Aún no tienes campeones favoritos. Agrégalos desde Explorar.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {lista.map((c) => (
            <ChampionCard
              key={c.id}
              campeon={c}
              esFavorito
              onToggleFavorito={pedirConfirmacion}
            />
          ))}
        </div>
      </div>

      <QuitarFavoritoDarkDialog
        campeon={porQuitar}
        onConfirmar={confirmarQuitar}
        onCancelar={cancelarQuitar}
      />

      {toast && (
        <Toast
          key={toast.id}
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onCerrar={cerrarToast}
        />
      )}
    </main>
  );
}

export default Favourites;