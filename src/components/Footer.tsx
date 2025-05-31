import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/gyo-banner.png" alt="GYO Technologies" className="h-8" />
              <h3 className="text-2xl font-bold">GYO</h3>
            </div>
            <p className="text-gray-400">Transformando el futuro con tecnología inteligente</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>AI-Driven Development</li>
              <li>IT Consulting</li>
              <li>Project Digitalization</li>
              <li>Custom App Development</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre Nosotros</li>
              <li>Casos de Éxito</li>
              <li>Blog</li>
              <li>Carreras</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://www.linkedin.com/company/gyo-technologies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>info@gyotechnologies.com.ar</li>
              <li>+54 9 11 3948 6971</li>
              <li>Ciudad Autonoma de Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GYO Technologies. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 