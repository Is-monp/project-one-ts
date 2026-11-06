import { NavLink } from "react-router";

type NavegacionProps = {
  totalFavoritos?: number;
};

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "relative px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9] focus-visible:text-[#F0E6D2]",
    isActive
      ? "text-[#F0E6D2] shadow-[inset_0_-2px_0_0_#C8AA6E] drop-shadow-[0_0_8px_rgba(200,170,110,0.6)]"
      : "text-[#A09B8C] hover:text-[#F0E6D2] hover:drop-shadow-[0_0_5px_rgba(240,230,210,0.4)]",
  ].join(" ");

function Navegacion({ totalFavoritos = 0 }: NavegacionProps) {
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[#C8AA6E]/30 bg-[#091428]/90 px-6 py-3.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Brand / Logo */}
      <div className="flex items-center gap-4">
        <NavLink to="/" className="group flex items-center gap-2.5 outline-none">
          {/* Icono Hextech / Gem */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded border border-[#C8AA6E]/60 bg-[#0A1428] shadow-[0_0_10px_rgba(200,170,110,0.2)] transition-all duration-300 group-hover:border-[#0AC8B9] group-hover:shadow-[0_0_12px_rgba(10,200,185,0.5)]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-[#C8AA6E] transition-colors duration-300 group-hover:fill-[#0AC8B9]"
              aria-hidden="true"
            >
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L18.6 8 12 11.2 5.4 8 12 4.8zM4 9.1l7 3.4v6.7l-7-3.5V9.1zm9 10.1v-6.7l7-3.4v6.6l-7 3.5z" />
            </svg>
          </div>

          {/* Texto del título estilo LoL */}
          <span className="bg-gradient-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] bg-clip-text font-sans text-base font-extrabold tracking-wider uppercase text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:from-[#F0E6D2] group-hover:to-[#0AC8B9]">
            League Explorer
          </span>
        </NavLink>

        {/* Separador vertical estilo Runaterra */}
        <div
          aria-hidden="true"
          className="hidden h-5 w-px bg-gradient-to-b from-transparent via-[#C8AA6E]/40 to-transparent sm:block"
        />
      </div>

      {/* Menú de navegación */}
      <nav aria-label="Navegación principal" className="flex items-center gap-2 sm:gap-4">
        <NavLink to="/" end className={linkClass}>
          Inicio
        </NavLink>
        <NavLink to="/explorar" className={linkClass}>
          Explorar
        </NavLink>
        <NavLink to="/favoritos" className={linkClass}>
          <span className="flex items-center gap-1.5">
            Favoritos
            {totalFavoritos > 0 && (
              <span
                className="inline-flex min-w-5 items-center justify-center rounded-sm border border-[#0AC8B9]/60 bg-[#0AC8B9]/15 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[#0AC8B9] shadow-[0_0_8px_rgba(10,200,185,0.4)]"
                aria-label={`${totalFavoritos} favoritos`}
              >
                {totalFavoritos > 99 ? "99+" : totalFavoritos}
              </span>
            )}
          </span>
        </NavLink>
        <NavLink to="/contacto" className={linkClass}>
          Contacto
        </NavLink>
      </nav>
    </header>
  );
}

export default Navegacion;