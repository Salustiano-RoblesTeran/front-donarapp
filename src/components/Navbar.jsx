import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importamos los iconos del menú hamburguesa
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

export default function Navbar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  const [mostrarRegistroModal, setMostrarRegistroModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const abrirLoginModal = () => setMostrarLoginModal(true);
  const cerrarLoginModal = () => setMostrarLoginModal(false);
  const abrirRegistroModal = () => setMostrarRegistroModal(true);
  const cerrarRegistroModal = () => setMostrarRegistroModal(false);

  // Función para manejar el cierre de sesión
  const cerrarSesion = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("x-token");
    setIsAuth(false);
    navigate("/"); // Redirigir a la página de inicio (puedes cambiar la URL si deseas)
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black text-2xl font-bold">
          DonARG
        </Link>

        {/* Menú Hamburguesa */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-4">
          {!isAuth ? (
            <>
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
            </>
          ) : (
            <>
              <button onClick={() => navigate("/dashboard")} className="text-black px-6 py-2 rounded-lg shadow-m transition-all hover:scale-105 hover:cursor-pointer">
                Dashboard
              </button>
              <button
                onClick={cerrarSesion}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          {!isAuth ? (
            <>
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
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/dashboard")} 
                className="text-black px-6 py-2 rounded-lg shadow-m transition-all hover:scale-105 hover:cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={cerrarSesion}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}

      {/* Modales */}
      <LoginModal mostrar={mostrarLoginModal} cerrarModal={cerrarLoginModal} setIsAuth={setIsAuth} />
      <RegisterModal mostrar={mostrarRegistroModal} cerrarModal={cerrarRegistroModal} />
    </nav>
  );
}
