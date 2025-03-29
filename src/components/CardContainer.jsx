import FoundationCard from "./FoundationCard";

export default function CardContainer({ foundations }) {

  if (!foundations || foundations.length === 0) {
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
        {foundations.map((foundation) => (
          <FoundationCard
            key={foundation._id}
            id={foundation._id}
            imagen={foundation.profile_url}
            titulo={foundation.foundation_name}
            descripcion={foundation.description}
            recaudado={foundation.fundsRaised}
            meta={foundation.targetAmount}
            categoria={foundation.category?.category}
          />
        ))}
      </div>
    </div>
  );
}
