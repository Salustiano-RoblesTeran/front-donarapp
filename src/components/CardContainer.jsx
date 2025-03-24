import FundationCard from "./FundationCard";

export default function CardContainer({ fundations }) {
  if (!fundations || fundations.length === 0) {
    return <p>No hay fundaciones disponibles.</p>;
  }

  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-4">
      {fundations.map((fundation) => (
        <FundationCard
          key={fundation._id}
          imagen={fundation.profile_url}
          titulo={fundation.fundation_name}
          descripcion={fundation.description}
          recaudado={fundation.recaudado}
          categoria={fundation.category?.category}
        />
      ))}
    </div>
  );
}
