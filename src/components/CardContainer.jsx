import { useNavigate } from "react-router-dom";
import FundationCard from "./FundationCard";

export default function CardContainer({ fundations }) {
  const navigate = useNavigate();

  if (!fundations || fundations.length === 0) {
    return <p className="text-center">No hay fundaciones disponibles.</p>;
  }

  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-6">
      {fundations.map((fundation) => (
        <button
          key={fundation._id}
          className="p-0 border-none bg-transparent cursor-pointer w-full md:w-4/5 lg:w-3/4"
          onClick={() => navigate(`/fundacion/${fundation._id}`)}
        >
          <FundationCard
            imagen={fundation.profile_url}
            titulo={fundation.fundation_name}
            descripcion={fundation.description}
            recaudado={fundation.fundsRaised}
            categoria={fundation.category?.category}
          />
        </button>
      ))}
    </div>
  );
}
