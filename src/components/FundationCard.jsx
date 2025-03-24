export default function FundationCard({ imagen, titulo, descripcion, recaudado, categoria }) {
  return (
    <div className="w-full md:w-4/5 lg:w-3/4 p-4 border rounded shadow bg-white flex flex-row items-center">
      {/* Imagen a la izquierda */}
      <img src={imagen} alt={titulo} className="w-48 h-48 object-cover mr-4" />

      {/* Contenido a la derecha */}
      <div className="flex flex-col w-full h-full justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">{titulo}</h2>
          <p className="text-gray-600 mt-2">{descripcion}</p>
        </div>

        {/* Categoría */}
        {categoria && (
          <p className="text-sm text-gray-500 font-semibold mt-2">{categoria}</p>
        )}

        {/* Recaudación */}
        <div className="mt-auto flex justify-end text-right">
          <p className="text-black font-semibold">Recaudado: ${recaudado}</p>
        </div>
      </div>
    </div>
  );
}
