import React, { useState, useEffect } from "react";
import { getCategories, getFundations } from "../helpers/fundations";
import CardContainer from "../components/CardContainer";

const Home = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");  
  const [categorias, setCategorias] = useState([]);
  const [fundaciones, setFundaciones] = useState([]);

  // Traer categorías y fundaciones desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await getCategories();
      setCategorias(response.allCategories);
    };

    
    const fetchFundaciones = async () => {
      const response = await getFundations();
      setFundaciones(response.user);
    };

    fetchCategorias();
    fetchFundaciones();
  }, []);

  console.log(categorias)

  // Muestra un loader si fundaciones aún no está disponible
  if (!fundaciones.length) {
    return <p className="text-center mt-10 text-lg">Cargando fundaciones...</p>;
  }

  return (
    <>
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
              <option key={categoria._id} value={categoria.category}>
                {categoria.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Aquí pasas fundaciones al CardContainer */}
      <CardContainer fundaciones={fundaciones} />

    </>
  );
};

export default Home;
