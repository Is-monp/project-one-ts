function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-slate-700">404</h1>
      <p className="mt-4 text-xl text-slate-300">Página no encontrada</p>
      <a
        href="/"
        className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400"
      >
        Volver al inicio
      </a>
    </div>
  );
}
export default NotFound;