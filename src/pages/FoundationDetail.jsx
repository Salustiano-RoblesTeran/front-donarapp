import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFoundation } from "../helpers/foundations"; 
import { getTransactions } from "../helpers/donation";
import { createDonation } from "../helpers/donation"

const FoundationDetail = () => {
  const { id } = useParams(); 
  const [foundation, setFoundation] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [donationAmount, setDonationAmount] = useState(""); 
  const [donationType, setDonationType] = useState('custom');
  const [donationTitle, setDonationTitle] = useState(''); 
  const [donationDescription, setDonationDescription] = useState('');
  const [transactions, setTransactions] = useState([]);  

  useEffect(() => {
    const fetchFoundation = async () => {
      try {
        const response = await getFoundation(id); 
        setFoundation(response.foundation);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la fundación:", error);
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(id);
        setTransactions(response);
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      } 
    };

    fetchFoundation();
    fetchTransactions();
  }, [id]); // Dependencia del id para hacer la solicitud cuando cambie

  if (loading) {
      return (
        <div className="min-h-[600px] flex justify-center items-center">
          <p className="text-center mt-10">Cargando fundación...</p>
        </div>); 
          
  }

  if (!foundation) {
    return (
    <div className="min-h-[600px] flex justify-center items-center">
      <p className="text-center mt-10">No se pudo encontrar la fundación.</p>
    </div>
    );
  }


  // Manejadores de los botones de donación
  const handleDonation = (percentage) => {
    setDonationType('percentage');
    setDonationAmount((foundation.targetAmount * percentage) / 100);
  };

  const handleCustomDonation = (e) => {
    const value = e.target.value;
    setDonationType('custom');
    setDonationAmount(value ? parseFloat(value) : 0); // Cambié de "" a 0 por si es un campo vacío
  };

  // Manejadores para el título y descripción de la donación
  const handleTitleChange = (e) => setDonationTitle(e.target.value);
  const handleDescriptionChange = (e) => setDonationDescription(e.target.value);

  // Verificar si hay un monto de donación válido
  const isDonationValid = donationAmount > 0 && donationTitle;

  const handleDonate = async () => {
    const donation = {
      title: donationTitle,
      description: donationDescription,
      amount: donationAmount,
      foundationId: id,
    };
  
    try {
      const result = await createDonation(donation); 
      console.log("Donación realizada con éxito:", result);
  
      if (result.success && result.url) {
        // Abre la URL en una nueva ventana o pestaña
        window.open(result.url);
      } else {
        alert("Hubo un error al procesar la donación.");
      }
    } catch (error) {
      console.error("Error al hacer la donación:", error);
      alert("Hubo un error al procesar tu donación.");
    }
  };

  return (
    <div className="w-4/5 mx-auto mt-10 space-y-8">
      {/* Imagen y Descripción Principal */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={foundation.profile_url}
            alt={foundation.foundation_name}
            className="w-80 h-80 object-cover rounded-2xl shadow"
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold mb-2">{foundation.foundation_name}</h1>
            <p className="text-gray-600 mb-4">{foundation.description}</p>
            <p className="text-sm text-gray-500 font-medium">
              Categoría: {foundation.category?.category}
            </p>
          </div>
          <div className="mt-6">
            {/* Sección de Selección de Donación */}
            <div className="flex items-center space-x-4">
              {/* Botones de porcentaje */}
              <div className="flex space-x-4">
                <button
                  className={`py-2 px-4 rounded-lg ${donationType === 'percentage' && donationAmount === (foundation.totalRaised * 5) / 100 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'} hover:bg-blue-500 hover:text-white transition duration-200`}
                  onClick={() => handleDonation(5)}
                >
                  5%
                </button>
                <button
                  className={`py-2 px-4 rounded-lg ${donationType === 'percentage' && donationAmount === (foundation.totalRaised * 10) / 100 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'} hover:bg-blue-500 hover:text-white transition duration-200`}
                  onClick={() => handleDonation(10)}
                >
                  10%
                </button>
              </div>

              {/* Entrada personalizada */}
              <input
                type="number"
                value={donationAmount}
                onChange={handleCustomDonation}
                className="py-2 px-4 border border-gray-300 rounded-lg outline-none w-32"
                placeholder="Monto"
              />
            </div>

            {/* Título y Descripción */}
            <div className="mt-4">
              <input
                type="text"
                value={donationTitle}
                onChange={handleTitleChange}
                className="py-2 px-4 border border-gray-300 rounded-lg outline-none w-full"
                placeholder="Título de la donación"
              />
            </div>
            <div className="mt-4">
              <textarea
                value={donationDescription}
                onChange={handleDescriptionChange}
                className="py-2 px-4 border border-gray-300 rounded-lg outline-none w-full"
                placeholder="Descripción de la donación"
                rows="4"
              />
            </div>

            {/* Confirmar Donación */}
            <button
              onClick={handleDonate}
              disabled={!isDonationValid}
              className={`mt-4 w-fit ${isDonationValid ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300`}
            >
              Confirmar Donación de ${donationAmount}
            </button>
          </div>
        </div>
      </div>

    {/* Estado de Recaudación */}
    <div className="rounded-2xl shadow-md p-6 bg-white">
      <h2 className="text-xl font-semibold">Estado de Recaudación</h2>
      <p className="text-lg text-black font-bold">
        Recaudado: ${transactions.totalRaised}
      </p>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="h-full bg-green-500 rounded"
          style={{
            width: `${Math.min((transactions.totalRaised / foundation.targetAmount) * 100, 100)}%`, 
          }} 
        ></div>
      </div>
      <p className="text-sm text-gray-500">{foundation.targetAmount}</p>
    </div>

    {/* Donaciones Recientes */}
      <div className="rounded-2xl shadow-md p-6 bg-white mb-8">
      <h2 className="text-xl font-semibold mb-4">Últimas Donaciones</h2>
      {transactions.transactions && transactions.transactions.length > 0 ? (
        <ul className="space-y-2"> {/* Reduje el espacio entre las donaciones */}
          {transactions.transactions
            .filter((transaction) => transaction.status === "approved")  // Filtrar solo las transacciones con estado "approved"
            .map((transaction, idx) => (
              <li
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between gap-1 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{transaction.title}</span>
                  <span className="text-xs text-gray-500">{transaction.description}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-green-600 font-semibold">${transaction.amount}</span>
                  <span className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}

        </ul>
      ) : (
        <p className="text-gray-500">No hay donaciones recientes.</p>
      )}
    </div>



    </div>
  );
};

export default FoundationDetail;
