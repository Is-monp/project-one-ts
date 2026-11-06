import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { urlHechizo, urlPasiva, urlSplash, type ChampionData } from "../api";
import { useCampeon } from "../hooks/useChampion";
import { useToast } from "../hooks/useToast";
import StatBar from "../components/StatBar";
import Toast from "../components/Toast";
import ConfirmarQuitarDialog from "../components/ConfirmarQuitarDialog";

type DetailProps = {
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
};

const STATS = [
  { clave: "attack", label: "Ataque", color: "bg-red-500" },
  { clave: "defense", label: "Defensa", color: "bg-green-500" },
  { clave: "magic", label: "Magia", color: "bg-[#0AC8B9]" },
  { clave: "difficulty", label: "Dificultad", color: "bg-amber-400" },
] as const;

const volverClass =
  "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8AA6E] transition-colors hover:text-[#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]";

function Detail({ favoritos, onToggleFavorito }: DetailProps) {
  // Ruta dinámica: /explorar/:id
  const { id } = useParams<{ id: string }>();
  const { campeon, cargando, error } = useCampeon(id);
  const { toast, mostrarToast, cerrarToast } = useToast();

  const [porQuitar, setPorQuitar] = useState<ChampionData | null>(null);
  const cancelarQuitar = useCallback(() => setPorQuitar(null), []);

  // Si falla la carga, además del mensaje en pantalla mostramos un toast de error
  useEffect(() => {
    if (error) mostrarToast(error, "error");
  }, [error, mostrarToast]);

  const esFavorito = campeon ? favoritos.includes(campeon.id) : false;

  // Agregar es directo (toast de éxito); quitar pide confirmación
  const handleFavorito = (c: ChampionData) => {
    if (favoritos.includes(c.id)) {
      setPorQuitar(c);
    } else {
      onToggleFavorito(c.id);
      mostrarToast(`${c.name} agregado a favoritos`, "exito");
    }
  };

  const confirmarQuitar = (c: ChampionData) => {
    onToggleFavorito(c.id);
    setPorQuitar(null);
    mostrarToast(`${c.name} eliminado de favoritos`, "info");
  };

  return (
    <main className="flex-1 bg-[#010A13]">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link to="/explorar" className={volverClass}>
          <span aria-hidden="true">←</span> Volver a explorar
        </Link>

        {/* Loading */}
        {cargando && (
          <p role="status" className="mt-10 text-center text-sm text-[#A09B8C]">
            Cargando campeón...
          </p>
        )}

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mx-auto mt-10 max-w-md rounded-sm border border-red-500/50 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {/* Empty: la petición funcionó pero no hay datos */}
        {!cargando && !error && !campeon && (
          <p className="mt-10 text-center text-sm text-[#A09B8C]">
            No encontramos ese campeón.
          </p>
        )}

        {campeon && (
          <article className="mt-6">
            {/* Cabecera con splash */}
            <header className="relative h-64 overflow-hidden rounded-sm border border-[#C8AA6E]/30 sm:h-96">
              <img
                src={urlSplash(campeon.id)}
                alt={`Splash art de ${campeon.name}`}
                className="h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[#010A13] via-[#010A13]/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C8AA6E]">
                  {campeon.title}
                </p>
                <h1 className="bg-linear-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] bg-clip-text text-4xl font-extrabold uppercase tracking-wider text-transparent sm:text-5xl">
                  {campeon.name}
                </h1>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Roles">
                  {campeon.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-[#0AC8B9]/60 bg-[#010A13]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0AC8B9]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </header>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {/* Columna principal */}
              <div className="space-y-8 md:col-span-2">
                <section aria-labelledby="titulo-historia">
                  <h2
                    id="titulo-historia"
                    className="text-xs font-bold uppercase tracking-wider text-[#C8AA6E]"
                  >
                    Historia
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#A09B8C]">
                    {campeon.lore ?? campeon.blurb}
                  </p>
                </section>

                {campeon.spells && campeon.spells.length > 0 && (
                  <section aria-labelledby="titulo-habilidades">
                    <h2
                      id="titulo-habilidades"
                      className="text-xs font-bold uppercase tracking-wider text-[#C8AA6E]"
                    >
                      Habilidades
                    </h2>
                    <ul className="mt-3 space-y-3">
                      {campeon.passive && (
                        <li className="flex gap-3 rounded-sm border border-[#785A28]/40 bg-[#0A1428] p-3">
                          <img
                            src={urlPasiva(campeon.passive.image.full)}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-sm border border-[#C8AA6E]/40"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-[#F0E6D2]">
                              {campeon.passive.name}{" "}
                              <span className="text-[10px] uppercase text-[#0AC8B9]">
                                Pasiva
                              </span>
                            </h3>
                            <p className="text-xs leading-relaxed text-[#A09B8C]">
                              {campeon.passive.description}
                            </p>
                          </div>
                        </li>
                      )}
                      {campeon.spells.map((s) => (
                        <li
                          key={s.id}
                          className="flex gap-3 rounded-sm border border-[#785A28]/40 bg-[#0A1428] p-3"
                        >
                          <img
                            src={urlHechizo(s.image.full)}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-sm border border-[#C8AA6E]/40"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-[#F0E6D2]">
                              {s.name}
                            </h3>
                            <p className="text-xs leading-relaxed text-[#A09B8C]">
                              {s.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {((campeon.allytips?.length ?? 0) > 0 ||
                  (campeon.enemytips?.length ?? 0) > 0) && (
                  <section
                    aria-labelledby="titulo-consejos"
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <h2 id="titulo-consejos" className="sr-only">
                      Consejos
                    </h2>
                    {campeon.allytips && campeon.allytips.length > 0 && (
                      <div className="rounded-sm border border-[#0AC8B9]/30 bg-[#0A1428] p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0AC8B9]">
                          Jugando con {campeon.name}
                        </h3>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[#A09B8C]">
                          {campeon.allytips.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {campeon.enemytips && campeon.enemytips.length > 0 && (
                      <div className="rounded-sm border border-red-500/30 bg-[#0A1428] p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-red-300">
                          Contra {campeon.name}
                        </h3>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[#A09B8C]">
                          {campeon.enemytips.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )}
              </div>

              {/* Columna lateral */}
              <aside className="space-y-6">
                <section aria-labelledby="titulo-atributos">
                  <h2
                    id="titulo-atributos"
                    className="mb-3 text-xs font-bold uppercase tracking-wider text-[#C8AA6E]"
                  >
                    Atributos
                  </h2>
                  <div className="space-y-3">
                    {STATS.map(({ clave, label, color }) => (
                      <StatBar
                        key={clave}
                        label={label}
                        value={campeon.info[clave]}
                        color={color}
                      />
                    ))}
                  </div>
                </section>

                <p className="text-xs text-[#A09B8C]">
                  Recurso:{" "}
                  <strong className="text-[#F0E6D2]">
                    {!campeon.partype || campeon.partype === "None"
                      ? "Sin recurso"
                      : campeon.partype}
                  </strong>
                </p>

                <button
                  type="button"
                  onClick={() => handleFavorito(campeon)}
                  aria-pressed={esFavorito}
                  className={`w-full rounded-sm border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] ${
                    esFavorito
                      ? "border-[#C8AA6E] bg-[#C8AA6E] text-[#010A13] shadow-[0_0_12px_rgba(200,170,110,0.5)]"
                      : "border-[#C8AA6E]/60 text-[#C8AA6E] hover:border-[#0AC8B9] hover:text-[#0AC8B9]"
                  }`}
                >
                  {esFavorito ? "★ En favoritos" : "☆ Agregar a favoritos"}
                </button>
              </aside>
            </div>
          </article>
        )}
      </div>

      <ConfirmarQuitarDialog
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

export default Detail;