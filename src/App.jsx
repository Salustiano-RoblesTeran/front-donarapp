import FundationCard from './components/FundationCard'
import Navbar from './components/Navbar'
import AuthForm from './pages/AuthForm'
import CardContainer from './components/CardContainer';

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
    </>
  )
}

export default App
