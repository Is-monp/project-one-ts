import { useCallback, useMemo, useState } from "react";
import type { ChampionData } from "../api";
import { useCampeones } from "../hooks/usechampions";
import ExplorarHeader, { type RolFiltro } from "../components/ExplorarHeader";
import ChampionCard from "../components/ChampionCard";
import ChampionDetailModal from "../components/ChampionDetailModal";
import Toast from "../components/Toast";

type ExploreProps = {
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
};

function Explore({ favoritos, onToggleFavorito }: ExploreProps) {
  const { campeones, cargando, error } = useCampeones();

  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState<RolFiltro>("todos");
  const [toast, setToast] = useState<string | null>(null);
  const [seleccionado, setSeleccionado] = useState<ChampionData | null>(null);

  const cerrarToast = useCallback(() => setToast(null), []);
  const cerrarModal = useCallback(() => setSeleccionado(null), []);

  const filtrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return campeones.filter((c) => {
      const coincideTexto =
        c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
      const coincideRol = rol === "todos" || c.tags.includes(rol);
      return coincideTexto && coincideRol;
    });
  }, [campeones, busqueda, rol]);

  const handleToggle = (campeon: ChampionData) => {
    const yaEra = favoritos.includes(campeon.id);
    onToggleFavorito(campeon.id);
    setToast(
      yaEra
        ? `${campeon.name} eliminado de favoritos`
        : `${campeon.name} agregado a favoritos`
    );
  };
  console.log("seleccionado:", seleccionado?.name ?? null);
  return (
    <main className="flex-1 bg-[#010A13]">
      <ExplorarHeader
        onBuscar={setBusqueda}
        onFiltrar={setRol}
        totalResultados={cargando ? undefined : filtrados.length}
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        {cargando && (
          <p role="status" className="text-center text-sm text-[#A09B8C]">
            Cargando campeones...
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="mx-auto max-w-md rounded-sm border border-red-500/50 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {!cargando && !error && filtrados.length === 0 && (
          <p className="text-center text-sm text-[#A09B8C]">
            No se encontraron campeones con esos filtros.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtrados.map((c) => (
            <ChampionCard
              key={c.id}
              campeon={c}
              esFavorito={favoritos.includes(c.id)}
              onToggleFavorito={handleToggle}
              onSeleccionar={setSeleccionado}
            />
          ))}
        </div>
      </section>

      <ChampionDetailModal
        campeon={seleccionado}
        onClose={cerrarModal}
        esFavorito={seleccionado ? favoritos.includes(seleccionado.id) : false}
        onToggleFavorito={handleToggle}
      />

      {toast && <Toast mensaje={toast} onCerrar={cerrarToast} />}
      
    </main>
  );
}


export default Explore;