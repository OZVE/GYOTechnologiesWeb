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
        <div className="container mx-auto px-4 py-20 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
          >
            Agentes de Inteligencia Artificial
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16"
          >
            Ofrecemos desarrollo de agentes de IA personalizados para atención al cliente, 
            toma de pedidos, automatización de agendas, automatización de procesos internos 
            como facturación, gestión de tickets y validación de datos. Soluciones a medida 
            para optimizar la operación de su empresa, mejorar la experiencia del cliente y 
            reducir costos operativos.
          </motion.p>

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

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-bold"
            >
              Solicitar una demo
            </button>
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