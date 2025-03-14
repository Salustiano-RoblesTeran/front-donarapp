import React, { useState } from "react";
import DonationModal from "../modals/DonationModal";  // Importa el modal de donación

export default function FundacionPage({ fundacion, donaciones }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDonate = (donationData) => {
    console.log("Donación realizada:", donationData);
    // Aquí puedes agregar la lógica para procesar la donación
    // (enviar datos a la API, actualizar la recaudación, etc.)
  };

  return (
    <div className="container mx-auto p-6">
      {/* Imagen y Nombre de Fundación */}
      <div className="flex flex-col items-center mb-6">
        <img src={fundacion.imagen} alt={fundacion.nombre} className="w-64 h-64 object-cover rounded-full mb-4" />
        <h1 className="text-2xl font-bold">{fundacion.nombre}</h1>
        <p className="text-lg text-gray-500">{fundacion.creador.nombre} {fundacion.creador.apellido}</p>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
        <p className="text-gray-700">{fundacion.descripcion}</p>
      </div>

      {/* Recaudación */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recaudación Total</h2>
        <p className="text-lg font-bold">${fundacion.recaudado}</p>
      </div>

      {/* Botón para hacer una donación */}
      <div className="mb-6">
        <button
          onClick={handleOpenModal}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Hacer una Donación
        </button>
      </div>

      {/* Tabla de Donaciones */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Título</th>
              <th className="py-2 px-4 text-left">Descripción</th>
              <th className="py-2 px-4 text-left">Monto</th>
              <th className="py-2 px-4 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {donaciones.map((donacion) => (
              <tr key={donacion.id} className="border-b">
                <td className="py-2 px-4">{donacion.titulo}</td>
                <td className="py-2 px-4">{donacion.descripcion}</td>
                <td className="py-2 px-4">${donacion.monto}</td>
                <td className="py-2 px-4">{donacion.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de donación */}
      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDonate={handleDonate}
      />
    </div>
  );
}
