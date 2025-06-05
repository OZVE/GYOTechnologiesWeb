import { Menu, X, Bot } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onPageChange: (page: string) => void;
}

const Navbar = ({ onPageChange }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 p-4 md:p-6 z-20 bg-black/90 backdrop-blur-sm">
      {/* Mobile Navigation */}
      <div className="md:hidden container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/gyo-banner.png" alt="GYO Technologies" className="h-8" />
            <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">GYO TECHNOLOGIES</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#222] rounded-lg transition-all"
          >
            {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
        <div 
          className={`${
            isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-2 mt-4">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                onPageChange('home');
                document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium hover:bg-[#222] rounded-lg transition-all text-center text-white"
            >
              Inicio
            </a>
            <a 
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onPageChange('home');
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium hover:bg-[#222] rounded-lg transition-all text-center text-white"
            >
              Servicios
            </a>
            <a 
              href="#technologies"
              onClick={(e) => {
                e.preventDefault();
                onPageChange('home');
                document.getElementById('technologies')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium hover:bg-[#222] rounded-lg transition-all text-center text-white"
            >
              Tecnologías
            </a>
            <a 
              href="#cases"
              onClick={(e) => {
                e.preventDefault();
                onPageChange('home');
                document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium hover:bg-[#222] rounded-lg transition-all text-center text-white"
            >
              Casos
            </a>
            <a 
              href="#ia-agents"
              onClick={(e) => {
                e.preventDefault();
                onPageChange('ia-agents');
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium hover:bg-[#222] rounded-lg transition-all text-center flex items-center justify-center gap-2 text-white"
            >
              <Bot size={16} />
              IA Agents
            </a>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/gyo-banner.png" alt="GYO Technologies" className="h-12" />
            <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">GYO TECHNOLOGIES</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('home');
                  document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all text-white"
              >
                Inicio
              </a>
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('home');
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all text-white"
              >
                Servicios
              </a>
              <a 
                href="#technologies"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('home');
                  document.getElementById('technologies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all text-white"
              >
                Tecnologías
              </a>
              <a 
                href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('home');
                  document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all text-white"
              >
                Casos
              </a>
              <a 
                href="#ia-agents"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('ia-agents');
                }}
                className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all flex items-center gap-2 text-white"
              >
                <Bot size={16} />
                IA Agents
              </a>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 