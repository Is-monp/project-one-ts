import { useEffect, useRef } from "react";
import type { DatosContacto } from "./ContactForm";

type ConfirmarEnvioDialogProps = {
  datos: DatosContacto | null;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function ConfirmarEnvioDialog({
  datos,
  onConfirmar,
  onCancelar,
}: ConfirmarEnvioDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Abre o cierra el <dialog> nativo según haya datos pendientes de confirmar
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (datos && !dialog.open) dialog.showModal();
    if (!datos && dialog.open) dialog.close();
  }, [datos]);

  return (
    <dialog
      ref={dialogRef}
      // Se dispara con Escape y también con dialog.close()
      onClose={onCancelar}
      // Clic en el fondo (backdrop) = cancelar
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancelar();
      }}
      aria-labelledby="confirmar-envio-titulo"
      className="m-auto w-full max-w-md rounded-sm border border-[#C8AA6E]/40 bg-[#010A13] p-0 text-[#F0E6D2] shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2
          id="confirmar-envio-titulo"
          className="text-lg font-extrabold uppercase tracking-wider text-[#C8AA6E]"
        >
          Confirmar envío
        </h2>

        <p className="mt-3 text-sm text-[#A09B8C]">
          Revisa tus datos antes de enviar el mensaje:
        </p>

        <dl className="mt-4 space-y-3 rounded-sm border border-[#785A28]/40 bg-[#0A1428] p-4 text-sm">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-[#C8AA6E]">
              Nombre
            </dt>
            <dd className="mt-0.5 break-words text-[#F0E6D2]">{datos?.nombre}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-[#C8AA6E]">
              Email
            </dt>
            <dd className="mt-0.5 break-all text-[#F0E6D2]">{datos?.email}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-[#C8AA6E]">
              Mensaje
            </dt>
            <dd className="mt-0.5 max-h-32 overflow-y-auto whitespace-pre-wrap break-words text-[#F0E6D2]">
              {datos?.mensaje}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-sm border border-[#C8AA6E]/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#C8AA6E] transition-all duration-300 hover:border-[#0AC8B9] hover:text-[#0AC8B9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="rounded-sm bg-[#C8AA6E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#010A13] transition-all duration-300 hover:bg-[#0AC8B9] hover:shadow-[0_0_12px_rgba(10,200,185,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0E6D2]"
          >
            Enviar
          </button>
        </div>
      </div>
    </dialog>
  );
}