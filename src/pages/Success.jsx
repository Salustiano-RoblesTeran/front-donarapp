import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">¡Pago Realizado con Éxito!</h1>
        <p className="text-gray-700 mb-6">Tu pago ha sido procesado correctamente. ¡Gracias por tu donacion!</p>
        <button
          onClick={handleClose}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Cerrar esta pantalla
        </button>
      </div>
    </div>
  );
};

export default Success;
