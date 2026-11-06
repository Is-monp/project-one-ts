import { useCallback, useState } from "react";
import ContactForm, { type DatosContacto } from "../components/ContactForm";
import Toast from "../components/Toast";

function Contact() {
  const [toast, setToast] = useState<string | null>(null);

  const cerrarToast = useCallback(() => setToast(null), []);

  const handleEnviar = (datos: DatosContacto) => {
    // Aquí iría el envío real (fetch a tu backend o servicio de correo)
    console.log("Mensaje enviado:", datos);
    setToast(`Gracias ${datos.nombre}, recibimos tu mensaje`);
  };

  return (
    <main className="flex-1 bg-[#010A13] px-6 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-extrabold uppercase tracking-wider text-[#F0E6D2]">
          <span className="bg-linear-to-r from-[#C8AA6E] to-[#0AC8B9] bg-clip-text text-transparent">
            Contacto
          </span>
        </h1>
        <p className="mt-2 text-sm text-[#A09B8C]">
          ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
        </p>

        <div className="mt-8">
          <ContactForm onEnviar={handleEnviar} />
        </div>
      </div>

      {toast && <Toast mensaje={toast} onCerrar={cerrarToast} />}
    </main>
  );
}

export default Contact;