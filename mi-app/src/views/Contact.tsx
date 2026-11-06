import ContactForm, { type DatosContacto } from "../components/ContactForm";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

function Contact() {
  const { toast, mostrarToast, cerrarToast } = useToast();

  const handleEnviar = async (datos: DatosContacto) => {
    try {
      // Aquí iría el envío real (fetch a tu backend o servicio de correo):
      // await enviarMensaje(datos);
      console.log("Mensaje enviado:", datos);
      mostrarToast(`Gracias ${datos.nombre}, recibimos tu mensaje`, "exito");
    } catch {
      mostrarToast("No se pudo enviar el mensaje. Intenta de nuevo.", "error");
    }
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

      {toast && (
        <Toast
          key={toast.id}
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onCerrar={cerrarToast}
        />
      )}
    </main>
  );
}

export default Contact;