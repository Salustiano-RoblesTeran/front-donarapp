import FundationCard from './components/FundationCard'
import Navbar from './components/Navbar'
import AuthForm from './pages/AuthForm'
import CardContainer from './components/CardContainer';
import Fundation from './pages/Fundation';

const fundacion = {
  imagen: "https://via.placeholder.com/150",
  nombre: "Fundación Ayuda Siempre",
  creador: {
    nombre: "Juan",
    apellido: "Pérez"
  },
  descripcion: "Esta fundación tiene como objetivo ayudar a las comunidades más necesitadas mediante la recolección de donaciones.",
  recaudado: 25000
};

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

const fundaciones = [
  {
    imagen: 'url-de-imagen1',
    titulo: 'Fundación A',
    descripcion: 'Descripción de la fundación AEl desarrollo tecnológico ha avanzado a pasos agigantados en las últimas décadas, cambiando la forma en que interactuamos con el mundo y entre nosotros. Las innovaciones en áreas como la inteligencia artificial, la automatización y la conectividad han transformado industrias enteras y continúan abriendo nuevas posibilidades. La tecnología no solo ha mejorado la eficiencia y la productividad, sino que también ha democratizado el acceso a la información, permitiendo que',
    recaudado: 12000,
    categoria: 'Educación',
  },
  {
    imagen: 'url-de-imagen2',
    titulo: 'Fundación B',
    descripcion: 'Descripción de la fundación B',
    recaudado: 9000,
    categoria: 'Salud',
  },
  // Agregar más fundaciones aquí...
];

function App() {

  return (
    <>

      <Navbar/>
      <CardContainer fundaciones={fundaciones} />

      {/* <Navbar/>

      <Fundation fundacion={fundacion} donaciones={donaciones}/> */}
    </>
  )
}

export default App
