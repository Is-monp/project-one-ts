import { Link } from "react-router";
import ChampionCarousel from "../components/Championcarousel";

function Hero() {
  return (
    <div className="flex flex-1 flex-col bg-[#010A13]">
      <section className="flex min-h-[50vh] items-center px-4 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="max-w-xl border-l-2 border-[#785A28] pl-6 sm:pl-8">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#F0E6D2] sm:text-6xl">
              Conoce a cada campeón de League of Legends
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#A09B8C]">
              Busca por nombre o rol, revisa la historia de cada uno y guarda a
              los que más juegas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/explorar"
                className="inline-block rounded-sm border border-[#C8AA6E] bg-[#C8AA6E] px-6 py-2.5 text-sm font-semibold text-[#010A13] transition-colors hover:bg-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#010A13]"
              >
                Explorar campeones
              </Link>
              <Link
                to="/favoritos"
                className="inline-block rounded-sm border border-[#785A28] px-6 py-2.5 text-sm font-semibold text-[#C8AA6E] transition-colors hover:border-[#C8AA6E] hover:text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#010A13]"
              >
                Ver favoritos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChampionCarousel />
    </div>
  );
}

export default Hero;