import React, { useState } from "react";
import { authLogin } from "../helpers/auth";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ setIsAuth, mostrar, cerrarModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!mostrar) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = { email, password };

    try {
      const response = await authLogin(userData);

      if (response?.token) {
        navigate("/dashboard");
        cerrarModal();
        setEmail("");
        setPassword("");
        setIsAuth(true)
        
      } else {
        setError("Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error) {
      setError("Ocurrió un error. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
