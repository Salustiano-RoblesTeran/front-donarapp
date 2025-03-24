import FundationCard from "./FundationCard";

export default function CardContainer({ fundaciones }) {
  if (!fundaciones || fundaciones.length === 0) {
    return <p>No hay fundaciones disponibles.</p>;
  }

  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-4">
      {fundaciones.map((fundacion) => (
        <FundationCard
          key={fundacion._id}
          imagen={fundacion.profile_url}
          titulo={fundacion.fundation_name}
          descripcion={fundacion.description}
          recaudado={fundacion.recaudado}
          categoria={fundacion.categoria}
        />
      ))}
    </div>
  );
}
