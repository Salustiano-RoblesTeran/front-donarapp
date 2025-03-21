import React, { useState, useEffect } from "react";
import DonationModal from "../modals/DonationModal"; 
import FundationCard from "../components/FundationCard";  
import { getCategories } from "../helpers/fundations";

const Home = ({ fundaciones }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");  
  const [categorias, setCategorias] = useState([]);

  // Traer categorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await getCategories();
      if (response && response.allCategories) {
        const categoriasExtraidas = response.allCategories.map(cat => cat.category);
        setCategorias(categoriasExtraidas);
      }
    };
    fetchCategorias();
    
  }, []);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDonate = (donationData) => {
    console.log("Donación realizada:", donationData);
  };

  // Muestra un loader si fundaciones aún no está disponible
  if (!fundaciones) {
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
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal de donación */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDonate={handleDonate}
      />
    </>
  );
};

export default Home;
