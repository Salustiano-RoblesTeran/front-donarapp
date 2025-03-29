import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import PrivateRoutes from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FoundationDetail from './pages/FoundationDetail';
import { isAuthenticate } from './helpers/auth';
import { getFoundations } from './helpers/foundations';
import Footer from './components/Footer';
import Success from "./pages/Success";

function App() {
  const [foundations, setFoundations] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await isAuthenticate();
        if (response?.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error('Error en la autenticación:', error.message);
        setIsAuth(false);
      }
    };

    // Verificación de autenticación
    isAuthenticated();

    // Obtener las fundaciones
    const fetchFoundaciones = async () => {
      try {
        const response = await getFoundations();
        setFoundations(response);
        setLoading(false); // Una vez que se obtienen las fundaciones, se detiene el spinner
      } catch (error) {
        console.error('Error al obtener las fundaciones:', error.message);
        setLoading(false); // Detener el spinner incluso si ocurre un error
      }
    };

    fetchFoundaciones();
  }, []); // Dependencias vacías, se ejecuta una sola vez al montar el componente

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route 
          path="/" 
          element={
            loading ? (
              <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <Home foundations={foundations} />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoutes isAuth={isAuth}>
              <Dashboard />
            </PrivateRoutes>
          } 
        />
        <Route path="/success" element={<Success />} />
        <Route path="/fundacion/:id" element={<FoundationDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
