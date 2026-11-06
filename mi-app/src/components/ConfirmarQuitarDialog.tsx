import { useEffect, useRef } from "react";
import type { ChampionData } from "../api";

type ConfirmarQuitarDialogProps = {
  campeon: ChampionData | null;
  onConfirmar: (campeon: ChampionData) => void;
  onCancelar: () => void;
};

export default function ConfirmarQuitarDialog({
  campeon,
  onConfirmar,
  onCancelar,
}: ConfirmarQuitarDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Abre o cierra el <dialog> nativo según haya un campeón pendiente
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (campeon && !dialog.open) dialog.showModal();
    if (!campeon && dialog.open) dialog.close();
  }, [campeon]);

  return (
    <dialog
      ref={dialogRef}
      // Se dispara con Escape y también con dialog.close(): mantiene el estado sincronizado
      onClose={onCancelar}
      // Evita que Escape llegue al listener del modal de detalle y lo cierre también
      onKeyDown={(e) => e.stopPropagation()}
      // Clic en el fondo (backdrop) = cancelar
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancelar();
      }}
      aria-labelledby="confirmar-quitar-titulo"
      className="m-auto w-full max-w-sm rounded-sm border border-[#C8AA6E]/40 bg-[#010A13] p-0 text-[#F0E6D2] shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2
          id="confirmar-quitar-titulo"
          className="text-lg font-extrabold uppercase tracking-wider text-[#C8AA6E]"
        >
          Quitar de favoritos
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#A09B8C]">
          ¿Seguro que quieres quitar a{" "}
          <strong className="text-[#F0E6D2]">{campeon?.name}</strong> de tus
          favoritos?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-sm border border-[#C8AA6E]/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C8AA6E] transition-all duration-300 hover:border-[#0AC8B9] hover:text-[#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => campeon && onConfirmar(campeon)}
            className="rounded-sm border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-300 transition-all duration-300 hover:bg-red-500/25 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Quitar
          </button>
        </div>
      </div>
    </dialog>
  );
}