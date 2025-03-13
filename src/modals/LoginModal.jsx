import React, { useState } from "react";

export default function LoginModal({ mostrar, cerrarModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!mostrar) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para iniciar sesión
    console.log("Iniciar sesión con", email, password);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={cerrarModal}
          className="absolute top-4 right-6 text-gray-500 text-xl"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full p-2 mt-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-2 mt-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
