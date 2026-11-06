import { Link } from "react-router";
import { urlArteCarga, type ChampionData } from "../api";

type ChampionCardProps = {
  campeon: ChampionData;
  esFavorito: boolean;
  onToggleFavorito: (campeon: ChampionData) => void;
};

function ChampionCard({
  campeon,
  esFavorito,
  onToggleFavorito,
}: ChampionCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-[#C8AA6E]/30 bg-[#0A1428] transition-all duration-300 hover:-translate-y-1 hover:border-[#0AC8B9] hover:shadow-[0_0_18px_rgba(10,200,185,0.35)]">
      <div className="relative aspect-3/5 overflow-hidden">
        <img
          src={urlArteCarga(campeon.id)}
          alt={campeon.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-[#010A13] via-[#010A13]/30 to-transparent"
        />

        {/* Enlace invisible que cubre la tarjeta y lleva a la página de detalle */}
        <Link
          to={`/explorar/${campeon.id}`}
          aria-label={`Ver detalles de ${campeon.name}`}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0AC8B9]"
        />

        <button
          type="button"
          onClick={() => onToggleFavorito(campeon)}
          aria-pressed={esFavorito}
          aria-label={
            esFavorito
              ? `Quitar a ${campeon.name} de favoritos`
              : `Agregar a ${campeon.name} a favoritos`
          }
          className={[
            "absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-sm border text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]",
            esFavorito
              ? "border-[#C8AA6E] bg-[#C8AA6E] text-[#091428] shadow-[0_0_10px_rgba(200,170,110,0.6)]"
              : "border-[#C8AA6E]/50 bg-[#091428]/80 text-[#C8AA6E] hover:border-[#0AC8B9] hover:text-[#0AC8B9]",
          ].join(" ")}
        >
          {esFavorito ? "★" : "☆"}
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
          <h3 className="text-base font-extrabold uppercase tracking-wider text-[#F0E6D2]">
            {campeon.name}
          </h3>
          <p className="text-xs capitalize text-[#C8AA6E]">{campeon.title}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {campeon.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[#0AC8B9]/50 bg-[#0AC8B9]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0AC8B9]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ChampionCard;