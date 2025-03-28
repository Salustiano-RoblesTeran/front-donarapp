import { useNavigate } from "react-router-dom";
import FundationCard from "./FundationCard";

export default function CardContainer({ fundations }) {
  const navigate = useNavigate();

  if (!fundations || fundations.length === 0) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <p className="text-center text-lg text-gray-600">No hay fundaciones disponibles.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 mb-8">
      
      {/* Contenedor de las tarjetas */}
      <div className="w-full flex justify-center items-center flex-wrap gap-6">
        {fundations.map((fundation) => (
          <FundationCard
            key={fundation._id}
            id={fundation._id}
            imagen={fundation.profile_url}
            titulo={fundation.fundation_name}
            descripcion={fundation.description}
            recaudado={fundation.fundsRaised}
            categoria={fundation.category?.category}
          />
        ))}
      </div>
    </div>
  );
}
