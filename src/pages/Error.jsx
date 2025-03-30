import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600">¡Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Algo salió mal. La página que buscas no está disponible.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
