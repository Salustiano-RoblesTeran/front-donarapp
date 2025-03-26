import Navbar from './components/Navbar'
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FundationDetail from './pages/FundationDetail';
import { getFundations } from './helpers/fundations';


function App() {
  const [fundations, setFundations] = useState([]);
  
  const [isAuth, setIsAuth] = useState(false);



  useEffect(() => {
    const fetchFundaciones = async () => {
      const response = await getFundations();
      setFundations(response);
    };
  
    fetchFundaciones();

  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Home  fundations={fundations}/>} />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoutes isAuth={isAuth}>
              <Dashboard />
            </PrivateRoutes>
          } 
        />
        <Route path="/fundacion/:id" element={<FundationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
