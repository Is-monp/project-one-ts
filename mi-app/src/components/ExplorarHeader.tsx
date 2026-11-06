import { useState, type FormEvent } from "react";

export type RolFiltro =
  | "todos"
  | "Fighter"
  | "Mage"
  | "Assassin"
  | "Marksman"
  | "Support"
  | "Tank";

type ExplorarHeaderProps = {
  onBuscar: (texto: string) => void;
  onFiltrar: (rol: RolFiltro) => void;
  totalResultados?: number;
};

const ROLES: { value: RolFiltro; label: string }[] = [
  { value: "todos", label: "Todos los roles" },
  { value: "Fighter", label: "Luchador" },
  { value: "Mage", label: "Mago" },
  { value: "Assassin", label: "Asesino" },
  { value: "Marksman", label: "Tirador" },
  { value: "Support", label: "Soporte" },
  { value: "Tank", label: "Tanque" },
];

function ExplorarHeader({
  onBuscar,
  onFiltrar,
  totalResultados,
}: ExplorarHeaderProps) {
  const [texto, setTexto] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onBuscar(texto.trim());
  };

  return (
    <section className="relative overflow-hidden border-b border-[#C8AA6E]/30 bg-linear-to-b from-[#010A13] via-[#091428] to-[#0A1428] px-6 py-12 text-center">
      {/* resplandor decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#C8AA6E] to-transparent"
      />

      <h1 className="text-3xl font-extrabold uppercase tracking-wider text-[#F0E6D2] sm:text-4xl">
        Explorar{" "}
        <span className="bg-linear-to-r from-[#C8AA6E] to-[#0AC8B9] bg-clip-text text-transparent">
          Campeones
        </span>
      </h1>

      <p className="mt-2 text-sm text-[#A09B8C]">
        Datos obtenidos desde Data Dragon
        {typeof totalResultados === "number" && (
          <span className="ml-2 text-[#0AC8B9]">
            · {totalResultados} resultados
          </span>
        )}
      </p>

      <form
        onSubmit={handleSubmit}
        role="search"
        className="mx-auto mt-6 flex max-w-2xl flex-wrap items-stretch justify-center gap-3"
      >
        <div className="flex min-w-60 flex-1 overflow-hidden rounded-sm border border-[#C8AA6E]/40 bg-[#0A1428] shadow-[0_0_12px_rgba(200,170,110,0.15)] focus-within:border-[#0AC8B9] focus-within:shadow-[0_0_12px_rgba(10,200,185,0.4)]">
          <label htmlFor="buscar-campeon" className="sr-only">
            Buscar campeón
          </label>
          <input
            id="buscar-campeon"
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar campeón..."
            className="w-full bg-transparent px-4 py-2.5 text-sm text-[#F0E6D2] placeholder:text-[#A09B8C]/70 outline-none"
          />
          <button
            type="submit"
            className="bg-[#C8AA6E] px-5 text-xs font-bold uppercase tracking-widest text-[#091428] transition-colors duration-300 hover:bg-[#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0E6D2]"
          >
            Buscar
          </button>
        </div>

        <div>
          <label htmlFor="filtro-rol" className="sr-only">
            Filtrar por rol
          </label>
          <select
            id="filtro-rol"
            defaultValue="todos"
            onChange={(e) => onFiltrar(e.target.value as RolFiltro)}
            className="h-full rounded-sm border border-[#C8AA6E]/40 bg-[#0A1428] px-3 py-2.5 text-sm text-[#F0E6D2] outline-none transition-all duration-300 focus:border-[#0AC8B9] focus:shadow-[0_0_12px_rgba(10,200,185,0.4)]"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  );
}

export default ExplorarHeader;