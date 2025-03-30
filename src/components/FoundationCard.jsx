import { useNavigate } from "react-router-dom";

export default function FoundationCard({ id, imagen, titulo, descripcion, recaudado, meta, categoria }) {
  const navigate = useNavigate();
  const progreso = Math.min((recaudado / meta) * 100, 100);

  return (
    <div className="w-80 h-[500px] rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <button
        className="p-0 border-none bg-transparent cursor-pointer w-full h-full flex flex-col"
        onClick={() => navigate(`/fundacion/${id}`)}
      >
        {/* Imagen superior */}
        <img className="w-full h-48 object-cover" src={imagen} alt={titulo} />

        {/* Contenido */}
        <div className="px-6 py-4 flex-grow text-left">
          <h2 className="font-bold text-xl mb-2 text-gray-900">{titulo}</h2>
          <p className="text-gray-600 text-sm overflow-hidden line-clamp-3">
            {descripcion}
          </p>
        </div>

        {/* Categoría */}
        <div className="px-6 pt-2 pb-2 text-left">
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            {categoria}
          </span>
        </div>

        {/* Recaudación y barra de progreso mejorada */}
        <div className="px-6 pt-4 pb-4 text-left">
          <p className="text-gray-700 font-semibold text-sm mb-2">
            Recaudado: <span className="text-green-600 font-bold">${recaudado}</span> / ${meta}
          </p>
          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${progreso}%`,
                background: `linear-gradient(90deg, #16a34a, #22c55e, #4ade80)`,
              }}
            ></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-md shadow-md">
              {Math.round(progreso)}%
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
