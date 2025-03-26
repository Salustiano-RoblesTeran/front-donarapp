import React, { useState, useEffect } from "react";
import { getCategories, getFundations, getFundationsCategories } from "../helpers/fundations";
import CardContainer from "../components/CardContainer";

const Home = () => {
  const [CategorySelected, setCategorySelected] = useState("");  
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fundations, setFundations] = useState([]);

  // Traer categorías una sola vez al montar
  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await getCategories();
      setCategories(response.allCategories);
    };
    fetchCategorias();
  }, []);

  // Traer fundaciones cuando cambia la categoría seleccionada
  useEffect(() => {
    const fetchFundations = async () => {
      setIsLoading(true);
      if (CategorySelected) {
        const response = await getFundationsCategories(CategorySelected);
        setFundations(response.fundationsFilter);
      } else {
        const response = await getFundations();
        setFundations(response.fundation);
      }
      setIsLoading(false);
    };
    fetchFundations();
  }, [CategorySelected]);

  return (
    <>
      <div className="w-4/5 mx-auto mt-6">
        {/* Filtro por categoría */}
        <div className="mb-4">
          <select
            value={CategorySelected}
            onChange={(e) => setCategorySelected(e.target.value)}
            className="p-2 border border-gray-300 rounded"
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

      {/* Estado de carga */}
      {isLoading ? (
        <p className="text-center mt-10 text-lg">Cargando fundaciones...</p>
      ) : (
        <CardContainer fundations={fundations} />
      )}
    </>
  );
};

export default Home;
