export default function FundationCard({ imagen, titulo, descripcion, recaudado, categoria }) {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden w-full mb-6 mx-auto">
      {/* Imagen */}
      <img src={imagen} alt={titulo} className="w-48 h-48 object-cover" />

      {/* Contenido */}
      <div className="flex flex-col p-4 w-full justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">{titulo}</h2>
          <p className="text-gray-600 mt-2">{descripcion}</p>
        </div>

        {/* Categoría */}
        {categoria && (
          <p className="text-sm text-gray-500 font-semibold mt-2">{categoria}</p>
        )}

        {/* Recaudación */}
        <div className="mt-auto flex justify-end items-center">
          <p className="text-black font-semibold">Recaudado: ${recaudado}</p>
        </div>
      </div>
    </div>
  );
}
