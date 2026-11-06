import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Navegacion from "./components/Navigation";
import NotFound from "./views/NotFound";
import Hero from "./views/Hero";
import Favourites from "./views/Favourites";
import Contact from "./views/Contact";
import Explore from "./views/Explore";
import Detail from "./views/Detail";

export default function App() {
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favoritos") ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id: string) =>
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navegacion totalFavoritos={favoritos.length} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/explorar"
          element={
            <Explore favoritos={favoritos} onToggleFavorito={toggleFavorito} />
          }
        />
        <Route
          path="/favoritos"
          element={
            <Favourites favoritos={favoritos} onToggleFavorito={toggleFavorito} />
          }
        />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/explorar" element={<Explore favoritos={favoritos} onToggleFavorito={toggleFavorito} />} />
        <Route path="/explorar/:id" element={<Detail favoritos={favoritos} onToggleFavorito={toggleFavorito} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}