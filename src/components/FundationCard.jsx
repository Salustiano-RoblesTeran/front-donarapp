import { useNavigate } from "react-router-dom";

export default function FundationCard({ id, imagen, titulo, descripcion, recaudado, categoria }) {
  const navigate = useNavigate();

  return (
    <div className="w-80 h-[480px] rounded overflow-hidden shadow-lg bg-white flex flex-col">
      <button
        className="p-0 border-none bg-transparent cursor-pointer w-full h-full flex flex-col"
        onClick={() => navigate(`/fundacion/${id}`)}
      >
        {/* Imagen superior */}
        <img className="w-full h-48 object-cover" src={imagen} alt={titulo} />
  

        {/* Contenido */}
        <div className="px-6 py-4 flex-grow text-left">
          <div className="font-bold text-xl mb-2">{titulo}</div>
          <p className="text-gray-700 text-base overflow-hidden line-clamp-3">
            {descripcion}
          </p>
        </div>

        {/* Recaudación */}
        <div className="px-6 pt-4 pb-2 text-left">
          <p className="text-black font-semibold">Recaudado: $ {recaudado}</p>
        </div>
      </button>
    </div>
  );
}
