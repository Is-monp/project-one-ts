import { useEffect } from "react";
import { urlSplash, type ChampionData } from "../api";

type ChampionDetailModalProps = {
  campeon: ChampionData | null;
  onClose: () => void;
  esFavorito: boolean;
  onToggleFavorito: (campeon: ChampionData) => void;
};

const STATS = [
  { clave: "attack", label: "Ataque", color: "bg-red-500" },
  { clave: "defense", label: "Defensa", color: "bg-green-500" },
  { clave: "magic", label: "Magia", color: "bg-[#0AC8B9]" },
  { clave: "difficulty", label: "Dificultad", color: "bg-amber-400" },
] as const;

export default function ChampionDetailModal({
  campeon,
  onClose,
  esFavorito,
  onToggleFavorito,
}: ChampionDetailModalProps) {
  // Escape para cerrar + bloquear scroll del fondo solo mientras está abierto
  useEffect(() => {
    if (!campeon) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const overflowPrevio = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowPrevio;
    };
  }, [campeon, onClose]);

  if (!campeon) return null;

  const recurso =
    !campeon.partype || campeon.partype === "None"
      ? "Sin recurso"
      : campeon.partype;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-campeon-titulo"
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm border border-[#C8AA6E]/40 bg-[#010A13] text-[#F0E6D2] shadow-[0_0_50px_rgba(0,0,0,0.9)] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-sm border border-[#C8AA6E]/40 bg-[#010A13]/80 text-[#C8AA6E] transition-all hover:border-[#0AC8B9] hover:text-[#0AC8B9] hover:shadow-[0_0_10px_#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
        >
          ✕
        </button>

        {/* Splash art */}
        <div className="relative h-72 shrink-0 overflow-hidden md:h-auto md:w-1/2">
          <img
            src={urlSplash(campeon.id)}
            alt={campeon.name}
            className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-[#010A13] via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-[#010A13]"
          />

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {campeon.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[#0AC8B9]/60 bg-[#010A13]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0AC8B9] shadow-[0_0_8px_rgba(10,200,185,0.3)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Detalles */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 md:p-8">
          <div>
            <div className="border-b border-[#785A28]/40 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8AA6E]">
                {campeon.title}
              </span>
              <h2
                id="modal-campeon-titulo"
                className="bg-linear-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] bg-clip-text text-3xl font-extrabold uppercase tracking-wider text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                {campeon.name}
              </h2>
            </div>

            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A09B8C]">
                Biografía
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#A09B8C]">
                {campeon.blurb}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#A09B8C]">
                Atributos Hextech
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ clave, label, color }) => (
                  <StatBar
                    key={clave}
                    label={label}
                    value={campeon.info[clave]}
                    color={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-[#785A28]/40 pt-4">
            <span className="text-xs text-[#A09B8C]">
              Recurso: <strong className="text-[#F0E6D2]">{recurso}</strong>
            </span>

            <button
              type="button"
              onClick={() => onToggleFavorito(campeon)}
              aria-pressed={esFavorito}
              className={`flex items-center gap-2 rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] ${
                esFavorito
                  ? "border-[#C8AA6E] bg-[#C8AA6E] text-[#010A13] shadow-[0_0_12px_rgba(200,170,110,0.5)]"
                  : "border-[#C8AA6E]/60 text-[#C8AA6E] hover:border-[#0AC8B9] hover:text-[#0AC8B9] hover:shadow-[0_0_10px_rgba(10,200,185,0.4)]"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-4 w-4 stroke-current stroke-2 ${
                  esFavorito ? "fill-current" : "fill-none"
                }`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {esFavorito ? "En Favoritos" : "Agregar a Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-semibold text-[#A09B8C]">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full border border-[#785A28]/30 bg-[#010A13]">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}