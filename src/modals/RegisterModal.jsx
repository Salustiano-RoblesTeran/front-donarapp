import React, { useState } from "react";

export default function RegisterModal({ mostrar, cerrarModal }) {
  const [nombreFundacion, setNombreFundacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [password, setPassword] = useState("");

  if (!mostrar) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registrar la fundación
    console.log("Registrar fundación:", nombreFundacion, nombre, apellido, email, imagen, descripcion, password);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={cerrarModal}
          className="absolute top-4 right-6 text-gray-500 text-xl"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Registrarse</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombreFundacion" className="block text-sm font-semibold text-gray-700">
              Nombre de la Fundación
            </label>
            <input
              type="text"
              id="nombreFundacion"
              value={nombreFundacion}
              onChange={(e) => setNombreFundacion(e.target.value)}
              placeholder="Nombre de la Fundación"
              className="w-full p-2 mt-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Contenedor para nombre y apellido en paralelo */}
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="w-full p-2 mt-2 rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="apellido" className="block text-sm font-semibold text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
                className="w-full p-2 mt-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

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
            <label htmlFor="imagen" className="block text-sm font-semibold text-gray-700">
              URL de la Imagen
            </label>
            <input
              type="text"
              id="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="URL de la imagen"
              className="w-full p-2 mt-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción de la fundación"
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
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
