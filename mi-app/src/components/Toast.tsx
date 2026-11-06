import { useEffect } from "react";

type ToastProps = {
  mensaje: string;
  onCerrar: () => void;
  duracion?: number;
};

function Toast({ mensaje, onCerrar, duracion = 3000 }: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onCerrar, duracion);
    return () => clearTimeout(id);
  }, [mensaje, duracion, onCerrar]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-6 top-20 z-50 flex items-center gap-3 rounded-sm border border-[#0AC8B9]/60 bg-[#091428]/95 px-4 py-3 text-xs font-semibold text-[#F0E6D2] shadow-[0_0_16px_rgba(10,200,185,0.4)] backdrop-blur-md"
    >
      <span className="text-[#0AC8B9]" aria-hidden="true">✓</span>
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