import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { getFoundation } from "../helpers/dashboard";

const Dashboard = () => {
  const [foundation, setFoundation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFoundation();
        setFoundation(data);
      } catch (error) {
        console.error("Error al obtener la fundación:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !foundation) return <p>Cargando...</p>;


  const donations = foundation?.allTransactions?.map((transaction) => ({
    id: transaction._id,
    date: new Date(transaction.date).toISOString().split("T")[0],
    amount: transaction.amount,
    description: transaction.description,
    status: transaction.status,
  })) || [];

  const remaining = foundation.targetAmount - foundation.fundsRaised;

  const paymentStats = [
    { name: "Aprobados", value: foundation?.allTransactions?.filter(t => t.status === "approved").length || 0 },
    { name: "Rechazados", value: foundation?.allTransactions?.filter(t => t.status === "rejected").length || 0 },
    { name: "Pendientes", value: foundation?.allTransactions?.filter(t => t.status === "in_process").length || 0 },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  // Filtrar donaciones de los últimos 7 días
  const last7DaysDonations = donations.filter((donation) => {
    const donationDate = new Date(donation.date);
    const currentDate = new Date();
    const diffTime = currentDate - donationDate;
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 7;
  });

  // Agrupar las donaciones por fecha
  const donationsPerDay = last7DaysDonations.reduce((acc, donation) => {
    const date = donation.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += donation.amount;
    return acc;
  }, {});

  // Convertir el objeto de donaciones por día a un array para el gráfico
  const donationsForChart = Object.keys(donationsPerDay).map((date) => ({
    date,
    amount: donationsPerDay[date],
  }));

  const donationsPerPage = 5;
  const totalPages = Math.ceil(donations.length / donationsPerPage);
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-md text-center md:text-left">
          <h1 className="text-2xl font-bold">{foundation?.foundation_name}</h1>
          <p className="text-gray-600 mt-2">{foundation?.description}</p>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-md text-center md:text-left">
          <h2 className="text-xl font-semibold">Progreso hacia el objetivo</h2>
          <div className="w-full bg-gray-300 rounded-lg h-6 mt-2">
            <div
              className="bg-blue-500 h-6 rounded-lg text-white text-center"
              style={{ width: `${Math.min((foundation.fundsRaised / foundation.targetAmount) * 100, 100)}%` }}
            >
              {Math.min((foundation.fundsRaised / foundation.targetAmount) * 100, 100).toFixed(2)}%
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            Faltan ${Math.max(remaining, 0).toLocaleString()} para alcanzar la meta de ${foundation.targetAmount.toLocaleString()}.
          </p>
        </div>

      </div>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-center md:text-left">Donaciones por día</h2>
        <div className="w-full h-64">
          {donationsForChart.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donationsForChart}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          ) : (
            <div className="min-h-[300px] flex justify-center items-center">
              <p className="text-center text-lg text-gray-600">Aún no hay ninguna donación</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Gráfico de Estado de Donaciones */}
  <div className="bg-white shadow-md p-6 rounded-lg">
    <h2 className="text-xl font-semibold text-center md:text-left">Estado de Donaciones</h2>
    <div className="w-full h-64">
    {paymentStats.some((stat) => stat.value > 0) ? (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={paymentStats}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            label
          >
            {paymentStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <div className="min-h-[300px] flex justify-center items-center">
        <p className="text-center text-lg text-gray-600">No hay ningun estado por mostrar</p>
      </div>
    )}
    </div>
  </div>

  {/* Historial de Donaciones */}
  <div className="rounded-2xl shadow-md p-6 bg-white">
  <h2 className="text-xl font-semibold mb-4">Historial de Donaciones</h2>
  {currentDonations.length > 0 ? (
    <ul className="space-y-2">
      {currentDonations
        .reverse()
        .map((donation, idx) => (
          <li
            key={idx}
            className="flex flex-col md:flex-row md:items-center justify-between gap-1 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{donation.description}</span>
              <span className="text-xs text-gray-500">{donation.date}</span>
            </div>
            <div className="flex flex-col text-right">
              {donation.status === "approved" && (
                <span className="text-green-600 font-semibold">
                  ${donation.amount.toLocaleString()}
                </span>
              )}
              {donation.status === "in_process" && (
                <span className="text-yellow-500 font-semibold">
                  ${donation.amount.toLocaleString()}
                </span>
              )}
              {donation.status === "rejected" && (
                <span className="text-red-600 font-semibold">
                  ${donation.amount.toLocaleString()}
                </span>
              )}
            </div>
          </li>
        ))}
    </ul>
  ) : (
    <p className="text-gray-500">No hay donaciones recientes.</p>
  )}

  <div className="flex justify-between items-center mt-4">
    <button
      onClick={handlePrevPage}
      className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
      disabled={currentPage === 1}
    >
      Anterior
    </button>
    <p className="text-gray-600">
      Página {currentPage} de {totalPages}
    </p>
    <button
      onClick={handleNextPage}
      className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
      disabled={currentPage === totalPages}
    >
      Siguiente
    </button>
  </div>
</div>


</div>

    </div>
  );
};

export default Dashboard;
