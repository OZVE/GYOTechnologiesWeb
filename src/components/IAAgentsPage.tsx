import { Clock, Calendar, ShoppingCart, Receipt, Ticket, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DevelopmentFlow from './DevelopmentFlow';
import ContactModal from './ContactModal';

interface IAAgentsPageProps {
  onPageChange: (page: string) => void;
}

const IAAgentsPage = ({ onPageChange }: IAAgentsPageProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const services = [
    {
      icon: <Clock className="w-6 h-6 text-black" />,
      title: "Atención automatizada 24/7",
      description: "Soporte continuo para tus clientes sin límites de horario"
    },
    {
      icon: <Calendar className="w-6 h-6 text-black" />,
      title: "Gestión de reservas y turnos",
      description: "Automatización inteligente de agendas y programación"
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-black" />,
      title: "Automatización de pedidos y consultas",
      description: "Procesamiento eficiente de solicitudes y órdenes"
    },
    {
      icon: <Receipt className="w-6 h-6 text-black" />,
      title: "Automatización de procesos de facturación",
      description: "Gestión automática de documentos y pagos"
    },
    {
      icon: <Ticket className="w-6 h-6 text-black" />,
      title: "Gestión de tickets de soporte interno",
      description: "Sistema inteligente de seguimiento y resolución"
    },
    {
      icon: <Link className="w-6 h-6 text-black" />,
      title: "Integración con sistemas existentes",
      description: "Conexión con ERP, CRM, WhatsApp, MS Teams y más"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar onPageChange={onPageChange} />
      <div className="flex-grow">
        {/* Banner principal completamente nuevo */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#232428] to-[#191A1D] px-6 md:px-24 pt-16 pb-8 md:py-0 min-h-[110vh] gap-4 md:gap-0">
          {/* Columna de texto */}
          <div className="flex flex-col justify-center items-start w-full md:w-1/2 max-w-2xl md:pr-12">
            <h1 className="font-inter text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4 leading-tight">
              <span className="block whitespace-pre-line">GYO Technologies Agents:
Inteligencia Artificial para tu
PYME</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12">Impulsa tu negocio con la IA que entiende tus necesidades.</p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold text-lg shadow-md"
            >
              Descubre cómo GYO Agents puede ayudarte
            </button>
          </div>
          {/* Columna de imagen */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img 
              src="/gyo-banner.png" 
              alt="GYO Banner" 
              className="object-contain max-h-[340px] md:max-h-[480px] w-auto drop-shadow-2xl"
              style={{ minWidth: '220px', maxWidth: '420px' }}
            />
          </div>
        </section>
        {/* Fin banner principal */}
        <div className="container mx-auto px-4 py-20 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <DevelopmentFlow />
          </motion.div>

          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Habilidades
          </h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-[#111] p-6 rounded-lg border border-gray-800 hover:bg-[#222] transition-all"
              >
                <div className="w-12 h-12 mb-4 bg-white rounded-lg flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default IAAgentsPage; 