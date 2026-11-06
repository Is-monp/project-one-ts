/**
 * Patrones aplicados en este modal:
 * 1)CONFIRMSHAMING
 *    El texto hace sentir culpable al usuario por quitar el favorito
 *    ("{campeón} se quedará esperándote..."), y la opción de salida está
 *    redactada para que elegirla suene cruel ("No me importa, abandonar").
 *    Por qué funciona: la gente evita las decisiones que la hacen sentir mal,
 *    aunque la acción en sí (quitar un favorito) sea trivial.
 * 
 * 2)JERARQUÍA VISUAL ENGAÑOSA (misdirection)
 *    "Mantener" es grande, dorado, con brillo y ocupa todo el ancho.
 *    "Abandonar" es un enlace diminuto, gris y con muy poco contraste.
 *    Por qué funciona: la atención y el clic van a lo más visible; la opción
 *    que el diseñador no quiere se vuelve difícil de ver y de pulsar.
 *
 * 3)CARGA EMOCIONAL VISUAL
 *    El icono del campeón aparece en escala de grises, como "apagado".
 *
 * Version etica sin manipulación emocional (ver ConfirmarQuitarDialog.tsx):
 *    Texto neutro ("¿Quitar a X de favoritos?"), dos botones del mismo tamaño
 *    y peso visual, etiquetas simétricas ("Cancelar"/"Quitar") y sin
 *    manipulación emocional.
 */

import { useEffect, useRef } from "react";
import { urlIcono, type ChampionData } from "../api";

//misma interfaz que ConfirmarQuitarDialog se puede cambiar uno por otro sin tocar nada más
type QuitarFavoritoDarkDialogProps = {
  campeon: ChampionData | null;
  onConfirmar: (campeon: ChampionData) => void; 
  onCancelar: () => void;
};

export default function QuitarFavoritoDarkDialog({
  campeon,
  onConfirmar,
  onCancelar,
}: QuitarFavoritoDarkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (campeon && !dialog.open) dialog.showModal();
    if (!campeon && dialog.open) dialog.close();
  }, [campeon]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancelar}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancelar();
      }}
      aria-labelledby="dark-quitar-titulo"
      className="m-auto w-full max-w-sm rounded-sm border border-[#C8AA6E]/40 bg-[#010A13] p-0 text-[#F0E6D2] shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 text-center">
        {/*Carga emocional visual: icono apagado en escala de grises */}
        {campeon && (
          <img
            src={urlIcono(campeon.image.full)}
            alt=""
            className="mx-auto h-20 w-20 rounded-full border border-[#785A28]/50 grayscale opacity-70"
          />
        )}

        {/*Confirmshaming: culpa en el título y en el cuerpo */}
        <h2
          id="dark-quitar-titulo"
          className="mt-4 text-lg font-extrabold uppercase tracking-wider text-[#C8AA6E]"
        >
          ¿Vas a abandonar a {campeon?.name}?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#A09B8C]">
          {campeon?.name} confiaba en ti y se quedará esperándote en la fuente 💔
        </p>

        {/*Jerarquía visual: el botón que conviene es enorme y brillante */}
        <button
          type="button"
          onClick={onCancelar}
          className="mt-6 w-full rounded-sm bg-[#C8AA6E] px-4 py-3.5 text-sm font-extrabold uppercase tracking-widest text-[#010A13] shadow-[0_0_18px_rgba(200,170,110,0.6)] transition-all duration-300 hover:bg-[#0AC8B9] hover:shadow-[0_0_20px_rgba(10,200,185,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0E6D2]"
        >
          Mantener a {campeon?.name}
        </button>

        {/*(1)+(2): diminuta, casi invisible y con texto culpabilizador */}
        <button
          type="button"
          onClick={() => campeon && onConfirmar(campeon)}
          className="mt-4 text-[10px] text-[#A09B8C]/40 underline underline-offset-2 transition-colors hover:text-[#A09B8C]/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A09B8C]"
        >
          No me importa, abandonar
        </button>
      </div>
    </dialog>
  );
}