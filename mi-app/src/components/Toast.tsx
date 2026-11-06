import { useEffect } from "react";

export type TipoToast = "exito" | "error" | "info";

type ToastProps = {
  mensaje: string;
  tipo?: TipoToast;
  onCerrar: () => void;
};

const ESTILOS: Record<
  TipoToast,
  { icono: string; clases: string; iconoClase: string; duracion: number }
> = {
  exito: {
    icono: "✓",
    clases:
      "border-[#0AC8B9]/60 shadow-[0_0_16px_rgba(10,200,185,0.4)]",
    iconoClase: "text-[#0AC8B9]",
    duracion: 3000,
  },
  info: {
    icono: "ℹ",
    clases:
      "border-[#C8AA6E]/60 shadow-[0_0_16px_rgba(200,170,110,0.35)]",
    iconoClase: "text-[#C8AA6E]",
    duracion: 3000,
  },
  error: {
    icono: "✕",
    clases:
      "border-red-500/60 shadow-[0_0_16px_rgba(239,68,68,0.4)]",
    iconoClase: "text-red-400",
    duracion: 5000, 
  },
};

function Toast({ mensaje, tipo = "exito", onCerrar }: ToastProps) {
  const { icono, clases, iconoClase, duracion } = ESTILOS[tipo];

  // Auto-dismiss
  useEffect(() => {
    const id = setTimeout(onCerrar, duracion);
    return () => clearTimeout(id);
  }, [mensaje, duracion, onCerrar]);

  return (
    <div
      role={tipo === "error" ? "alert" : "status"}
      aria-live={tipo === "error" ? "assertive" : "polite"}
      className={`fixed right-6 top-20 z-50 flex max-w-xs items-center gap-3 rounded-sm border bg-[#091428]/95 px-4 py-3 text-xs font-semibold text-[#F0E6D2] backdrop-blur-md ${clases}`}
    >
      <span className={iconoClase} aria-hidden="true">
        {icono}
      </span>
      <span>{mensaje}</span>
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar notificación"
        className="text-[#A09B8C] transition-colors hover:text-[#F0E6D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0AC8B9]"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;