import { Routes, Route } from "react-router";
import Navegacion from "./components/Navigation";
import NotFound from "./views/NotFound";
import Hero from "./views/Hero";
import Favourites from "./views/Favourites";
import Contact from "./views/Contact";
import Explore from "./views/Explore";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navegacion totalFavoritos={0} />
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/explorar" element={<Explore />} />
        <Route path="/favoritos" element={<Favourites />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}