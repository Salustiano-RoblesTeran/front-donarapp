import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import PrivateRoutes from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FundationDetail from './pages/FundationDetail';
import { isAuthenticate } from './helpers/auth';
import { getFundations } from './helpers/fundations';
import Footer from './components/Footer';

function App() {
  const [fundations, setFundations] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

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
    const fetchFundaciones = async () => {
      try {
        const response = await getFundations();
        setFundations(response);
      } catch (error) {
        console.error('Error al obtener las fundaciones:', error.message);
      }
    };
    
    fetchFundaciones();
  }, []); // Dependencias vacías, se ejecuta una sola vez al montar el componente

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" element={<Home fundations={fundations} />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoutes isAuth={isAuth}>
              <Dashboard />
            </PrivateRoutes>
          } 
        />
        <Route path="/fundacion/:id" element={<FundationDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
