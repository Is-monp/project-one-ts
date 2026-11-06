import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import ConfirmarEnvioDialog from "./ConfirmarEnvioDialog";

export type DatosContacto = {
  nombre: string;
  email: string;
  mensaje: string;
};

type Errores = Partial<Record<keyof DatosContacto, string>>;

type ContactFormProps = {
  onEnviar: (datos: DatosContacto) => void;
};

const INICIAL: DatosContacto = { nombre: "", email: "", mensaje: "" };

function validar({ nombre, email, mensaje }: DatosContacto): Errores {
  const errores: Errores = {};

  if (nombre.trim().length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errores.email = "Ingresa un email válido (debe contener @ y .)";
  }
  if (mensaje.trim().length < 10) {
    errores.mensaje = "El mensaje debe tener al menos 10 caracteres";
  }

  return errores;
}

const baseInput =
  "w-full rounded-sm border bg-[#010A13] px-4 py-2.5 text-sm text-[#F0E6D2] placeholder:text-[#A09B8C]/60 outline-none transition-all duration-300";

const claseInput = (hayError: boolean) =>
  [
    baseInput,
    hayError
      ? "border-red-500/70 focus:shadow-[0_0_10px_rgba(239,68,68,0.4)]"
      : "border-[#C8AA6E]/40 focus:border-[#0AC8B9] focus:shadow-[0_0_10px_rgba(10,200,185,0.4)]",
  ].join(" ");

const labelClass =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#C8AA6E]";

function ContactForm({ onEnviar }: ContactFormProps) {
  const [campos, setCampos] = useState<DatosContacto>(INICIAL);
  const [tocados, setTocados] = useState<
    Partial<Record<keyof DatosContacto, boolean>>
  >({});
  // Datos listos para enviar, a la espera de que el usuario confirme en el diálogo
  const [pendiente, setPendiente] = useState<DatosContacto | null>(null);

  const errores = validar(campos);
  const esValido = Object.keys(errores).length === 0;

  const errorVisible = (campo: keyof DatosContacto) =>
    tocados[campo] ? errores[campo] : undefined;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  };

  // Enviar el formulario ya no envía: abre la confirmación
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!esValido) {
      setTocados({ nombre: true, email: true, mensaje: true });
      return;
    }

    setPendiente({
      nombre: campos.nombre.trim(),
      email: campos.email.trim(),
      mensaje: campos.mensaje.trim(),
    });
  };

  const cancelarEnvio = useCallback(() => setPendiente(null), []);

  const confirmarEnvio = () => {
    if (!pendiente) return;

    onEnviar(pendiente);
    setPendiente(null);
    setCampos(INICIAL);
    setTocados({});
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-sm border border-[#C8AA6E]/30 bg-[#0A1428] p-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]"
      >
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={campos.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errorVisible("nombre")}
            aria-describedby={errorVisible("nombre") ? "error-nombre" : undefined}
            placeholder="Tu nombre"
            autoComplete="name"
            className={claseInput(!!errorVisible("nombre"))}
          />
          {errorVisible("nombre") && (
            <p id="error-nombre" role="alert" className="mt-1.5 text-xs text-red-400">
              {errores.nombre}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={campos.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errorVisible("email")}
            aria-describedby={errorVisible("email") ? "error-email" : undefined}
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
            className={claseInput(!!errorVisible("email"))}
          />
          {errorVisible("email") && (
            <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-400">
              {errores.email}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="mensaje" className={labelClass}>
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={campos.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errorVisible("mensaje")}
            aria-describedby={errorVisible("mensaje") ? "error-mensaje" : undefined}
            placeholder="Escribe tu mensaje aquí..."
            className={`${claseInput(!!errorVisible("mensaje"))} resize-y`}
          />
          {errorVisible("mensaje") && (
            <p id="error-mensaje" role="alert" className="mt-1.5 text-xs text-red-400">
              {errores.mensaje}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!esValido}
          className="w-full rounded-sm bg-[#C8AA6E] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#010A13] transition-all duration-300 hover:bg-[#0AC8B9] hover:shadow-[0_0_12px_rgba(10,200,185,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0E6D2] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#C8AA6E] disabled:hover:shadow-none"
        >
          Enviar mensaje
        </button>
      </form>

      <ConfirmarEnvioDialog
        datos={pendiente}
        onConfirmar={confirmarEnvio}
        onCancelar={cancelarEnvio}
      />
    </>
  );
}

export default ContactForm;