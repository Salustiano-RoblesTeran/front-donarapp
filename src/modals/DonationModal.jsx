import React, { useState } from "react";

export default function DonationModal({ isOpen, onClose, onDonate }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");

  const handleSubmit = () => {
    // Llamar a la función onDonate con los datos del formulario
    onDonate({ titulo, descripcion, monto });
    // Cerrar el modal después de enviar
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Botón de cerrar (X) dentro del modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-500 text-xl"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Hacer una Donación</h2>
        
        {/* Formulario de Donación */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Título</label>
          <input
            type="text"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Descripción</label>
          <textarea
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Monto</label>
          <input
            type="number"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold"
        >
          Donar
        </button>
      </div>
    </div>
  );
}
