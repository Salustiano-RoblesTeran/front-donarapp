// Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

export default function Navbar({ isAuth, setIsAuth }) {
  // Estado para manejar la visibilidad de los modales
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  const [mostrarRegistroModal, setMostrarRegistroModal] = useState(false);

  // Funciones para abrir los modales
  const abrirLoginModal = () => setMostrarLoginModal(true);
  const cerrarLoginModal = () => setMostrarLoginModal(false);

  const abrirRegistroModal = () => setMostrarRegistroModal(true);
  const cerrarRegistroModal = () => setMostrarRegistroModal(false);
  
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black text-2xl font-bold">
          DonARG
        </Link>

        {/* Buscador */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 pl-10 rounded-lg border border-gray-400 bg-white text-black focus:outline-none"
          />
          <svg
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Botones de autenticación */}
        {!isAuth ? (
          <div className="space-x-4">
            <button
              onClick={abrirLoginModal}
              className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={abrirRegistroModal}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
            >
              Registrarse
            </button>
          </div>
          ) : (
            <div>
              <button onClick={() => setIsAuth(false)} className="btn">Cerrar sesión</button>
            </div>
          )}
      </div>


      {/* Modales */}
      <LoginModal mostrar={mostrarLoginModal} cerrarModal={cerrarLoginModal} setIsAuth={setIsAuth} />
      <RegisterModal mostrar={mostrarRegistroModal} cerrarModal={cerrarRegistroModal} />
    </nav>
  );
}
