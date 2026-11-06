import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  obtenerCampeones,
  urlArteCarga,
  urlIcono,
  type ChampionData,
} from "../api";

type ChampionCarouselProps = {
  limit?: number;
};

function pickRandom<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const arrowClass =
  "flex h-9 w-9 items-center justify-center rounded-sm border border-[#785A28] text-[#C8AA6E] transition-colors hover:border-[#C8AA6E] hover:text-[#F0E6D2] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#785A28] disabled:hover:text-[#C8AA6E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]";

function ChampionCarousel({ limit = 12 }: ChampionCarouselProps) {
  const [champions, setChampions] = useState<ChampionData[]>([]);
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await obtenerCampeones(controller.signal);
        setVersion(res.version);
        setChampions(pickRandom(Object.values(res.data), limit));
        setStatus("ready");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, [limit]);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [champions, updateArrows]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      aria-labelledby="carrusel-titulo"
      className="bg-[#010A13] px-4 pb-16 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2
              id="carrusel-titulo"
              className="font-serif text-2xl font-bold text-[#F0E6D2]"
            >
              Campeones para probar hoy
            </h2>
            {version && (
              <p className="mt-1 text-sm text-[#A09B8C]">
                Una selección al azar del parche {version}.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Campeones anteriores"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 4 6 10l6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Campeones siguientes"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m8 4 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {status === "loading" && (
          <ul className="flex gap-4 overflow-hidden" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="aspect-308/560 w-44 shrink-0 animate-pulse rounded-sm bg-[#1E2328] sm:w-52"
              />
            ))}
          </ul>
        )}

        {status === "error" && (
          <p role="alert" className="rounded-sm border border-[#785A28] p-4 text-sm text-[#A09B8C]">
            No pudimos cargar los campeones. Revisa tu conexión y recarga la
            página.
          </p>
        )}

        {status === "ready" && (
          <ul
            ref={trackRef}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-color:#785A28_transparent] scrollbar-thin"
          >
            {champions.map((champion) => (
              <li key={champion.id} className="w-44 shrink-0 snap-start sm:w-52">
                <Link
                  to={`/explorar?campeon=${champion.id}`}
                  className="group relative block aspect-308/560 overflow-hidden rounded-sm border border-[#785A28] bg-[#1E2328] transition-colors hover:border-[#C8AA6E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#010A13]"
                >
                  <img
                    src={urlArteCarga(champion.id)}
                    alt=""
                    loading="lazy"
                    width={308}
                    height={560}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = urlIcono(champion.image.full);
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#010A13] via-[#010A13]/85 to-transparent px-3 pb-3 pt-12">
                    <p className="font-serif text-lg font-bold leading-tight text-[#F0E6D2]">
                      {champion.name}
                    </p>
                    <p className="text-xs capitalize text-[#C8AA6E]">
                      {champion.title}
                    </p>
                    <p className="mt-1 text-xs text-[#A09B8C]">
                      {champion.tags.join(", ")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ChampionCarousel;