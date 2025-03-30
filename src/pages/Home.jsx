import React, { useState, useEffect, useRef } from "react";
import { getCategories, getFoundations, getFoundationsCategories } from "../helpers/foundations";
import CardContainer from "../components/CardContainer";

const Home = () => {
  const [categorySelected, setCategorySelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [foundations, setFoundations] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Ref para la sección de donaciones
  const donationsSectionRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.allCategories);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setError("No se pudieron cargar las categorías.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoundations = async () => {
      setIsLoading(true);
      try {
        let response;
        if (categorySelected) {
          response = await getFoundationsCategories(categorySelected);
          setFoundations(response.foundationsFilter);
        } else {
          response = await getFoundations();
          setFoundations(response.foundation);
        }
      } catch (err) {
        console.error("Error al obtener fundaciones:", err);
        setError("No se pudieron cargar las fundaciones.");
      }
      setIsLoading(false);
    };
    fetchFoundations();
  }, [categorySelected]);

  // Filtrar por nombre de fundación
  const filteredfoundations = foundations.filter((foundation) =>
    foundation.foundation_name.toLowerCase().includes(search.toLowerCase())
  );

  // Manejador de evento para hacer scroll hacia la sección de donaciones
  const handleScrollToDonations = () => {
    donationsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center h-[70vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Ayuda a cambiar el mundo con tu donación</h1>
        <p className="mt-3 text-lg">Encuentra una fundación y haz la diferencia.</p>
        <button
          onClick={handleScrollToDonations}
          className="mt-5 px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-full hover:bg-yellow-500 transition"
        >
          Dona ahora
        </button>
      </div>

      {/* Sección de estadísticas */}
      <div className="bg-gray-100 text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestro Impacto</h2>
        <div className="flex flex-wrap justify-center gap-16 mt-10">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600">+500</p>
            <p className="text-lg md:text-xl text-gray-700 font-medium">Fundaciones registradas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600">+1M</p>
            <p className="text-lg md:text-xl text-gray-700 font-medium">Donaciones realizadas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold text-blue-600">+100K</p>
            <p className="text-lg md:text-xl text-gray-700 font-medium">Beneficiarios alcanzados</p>
          </div>
        </div>
      </div>

      {/* Título arriba */}
      <h2 className="text-3xl font-bold text-center mt-8 mb-8">
        Últimas Campañas de Alto Impacto
      </h2>


      {/* Búsqueda y Filtros */}
      <div className="w-4/5 mx-auto mt-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar fundación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={categorySelected}
            onChange={(e) => setCategorySelected(e.target.value)}
            className="p-2 border border-gray-300 rounded mt-3 md:mt-0 md:w-1/4 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estado de carga y errores */}
      {error && <p className="text-center mt-10 text-lg text-red-600">{error}</p>}
      {isLoading ? (
        <div className="min-h-[300px] flex justify-center items-center">
          <p className="text-center text-lg text-gray-600">Cargando fundaciones...</p>
        </div>
      ) : (
        <>
          {/* Aquí agregamos el ref a la sección de las donaciones */}
          <div ref={donationsSectionRef}>
            <CardContainer foundations={filteredfoundations} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
