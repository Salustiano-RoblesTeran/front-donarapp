import React, { useState, useEffect } from "react";
import { authRegister } from "../helpers/auth";
import { getCategories } from "../helpers/foundations";

export default function RegisterModal({ mostrar, cerrarModal }) {

  const [categorias, setCategorias] = useState([]);

  const [foundation_name, setFoundation_name] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [profile_url, setProfile_url] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await getCategories();
      setCategorias(response.allCategories);
    };

    fetchCategorias();
  }, []);

  if (!mostrar) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundationData = {
      foundation_name,
      name,
      last_name,
      email,
      profile_url,
      category,
      description,
      password,
      targetAmount
    };

    await authRegister(foundationData);
    cerrarModal();
    setFoundation_name('');
    setName('');
    setLast_name('');
    setEmail('');
    setProfile_url(''); 
    setCategory('');
    setDescription('');
    setPassword('');
    setTargetAmount('');
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
            <label htmlFor="fundation_name" className="block text-sm font-semibold text-gray-700">
              Nombre de la Fundación
            </label>
            <input
              type="text"
              id="fundation_name"
              value={foundation_name}
              onChange={(e) => setFoundation_name(e.target.value)}
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
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="w-full p-2 mt-2 rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
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

          <div className="flex mb-4 space-x-4">
            {/* Input de URL de la Imagen */}
            <div className="flex-1">
              <label htmlFor="profile_url" className="block text-sm font-semibold text-gray-700">
                URL de la Imagen
              </label>
              <input
                type="text"
                id="profile_url"
                value={profile_url}
                onChange={(e) => setProfile_url(e.target.value)}
                placeholder="URL de la imagen"
                className="w-full p-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select de Categoría */}
            <div className="flex-1">
              <label htmlFor="categoria" className="block text-sm font-semibold text-gray-700">
                Categoría
              </label>
              <select
                id="categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la fundación"
              className="w-full p-2 mt-2 rounded-lg border border-gray-300"
            />
          </div>
          {/* Input para targetAmount */}
          <div className="mb-4">
            <label htmlFor="targetAmount" className="block text-sm font-semibold text-gray-700">
              Monto Objetivo
            </label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Monto objetivo"
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
