import { useState } from "react";
import FundationCard from "./FundationCard";

export default function CardContainer({ fundaciones }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Filtramos las fundaciones por la categoría seleccionada
  const fundacionesFiltradas = categoriaSeleccionada
    ? fundaciones.filter((fundacion) => fundacion.categoria === categoriaSeleccionada)
    : fundaciones;

  // Extraemos las categorías únicas de las fundaciones
  const categorias = [
    ...new Set(fundaciones.map((fundacion) => fundacion.categoria)),
  ];

  return (
    <div className="w-4/5 mx-auto mt-6">
      {/* Filtro por categoría */}
      <div className="mb-4">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Renderizamos las tarjetas filtradas */}
      {fundacionesFiltradas.map((fundacion) => (
        <FundationCard
          key={fundacion.titulo}
          imagen={fundacion.imagen}
          titulo={fundacion.titulo}
          descripcion={fundacion.descripcion}
          recaudado={fundacion.recaudado}
          categoria={fundacion.categoria}
        />
      ))}
    </div>
  );
}
