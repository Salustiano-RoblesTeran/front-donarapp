export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="flex justify-center gap-8 mb-4">
          <a
            href="https://github.com/Salustiano-RoblesTeran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400"
          >
            <i className="fa fa-github text-3xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/salustiano-robles-teran-1b815920a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400"
          >
            <i className="fa fa-linkedin text-3xl"></i>
          </a>
          <a
            href="https://saluroblesteran.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400"
          >
            <i className="fa fa-globe text-3xl"></i>
          </a>
        </div>
        <p className="text-sm">Creado por Salustiano Robles Terán. Todo este contenido es libre para usarlo como deseen.</p>
      </footer>
    );
  }
  