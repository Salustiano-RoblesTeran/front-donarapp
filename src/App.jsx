import Navbar from './components/Navbar'
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { getFundations } from './helpers/fundations';


const donaciones = [
  {
    id: 1,
    titulo: "Donación de Alimentos",
    descripcion: "Donación de 200 cajas de alimentos.",
    monto: 5000,
    fecha: "2025-03-12"
  },
  {
    id: 2,
    titulo: "Donación de Ropa",
    descripcion: "Donación de ropa usada en buen estado.",
    monto: 1500,
    fecha: "2025-03-10"
  },
  {
    id: 3,
    titulo: "Donación Monetaria",
    descripcion: "Donación en efectivo para cubrir gastos operativos.",
    monto: 10000,
    fecha: "2025-03-05"
  }
];

function App() {
  const [fundaciones, setFundaciones] = useState([]);
  
  const [isAuth, setIsAuth] = useState(false);



  useEffect(() => {
    const fetchFundaciones = async () => {
      const response = await getFundations();
      setFundaciones(response);
    };
  
    fetchFundaciones();

  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Home  fundaciones = {fundaciones}/>} />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoutes isAuth={isAuth}>
              <Dashboard />
            </PrivateRoutes>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
