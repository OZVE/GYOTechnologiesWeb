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
        <section className="w-full flex flex-col md:flex-row items-center justify-center bg-black px-6 md:px-24 pt-8 pb-4 md:py-0 min-h-[110vh] gap-8">
          {/* Columna de texto */}
          <div className="flex flex-col justify-center items-start max-w-2xl flex-[0_0_auto] md:pr-0 h-full">
            <h1 className="font-instrument text-[3.5em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4 leading-tight">
              <span className="block whitespace-pre-line">GYO Technologies Agents:
Inteligencia Artificial para tu
Empresa</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12">Impulsa tu negocio con la IA que entiende tus necesidades.</p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 rounded-lg text-lg font-bold shadow-md mt-4 bg-gradient-to-r from-gray-200 to-gray-400 text-black border border-gray-300 hover:from-gray-300 hover:to-gray-500 transition-colors"
            >
              Descubre cómo GYO Agents puede ayudarte
            </button>
          </div>
          {/* Columna de imagen */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src="/gyo-banner.png" 
              alt="GYO Banner" 
              className="object-contain max-h-[500px] w-auto drop-shadow-2xl"
              style={{ minWidth: '180px', maxWidth: '400px' }}
            />
          </div>
        </section>
        {/* Fin banner principal */}
        {/* Sección ¿Qué son los GYO Technologies Agents? */}
        <section className="w-full py-16 bg-gradient-to-b from-[#232428] to-[#191A1D]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-instrument text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-6">
              ¿Qué son los GYO Technologies Agents?
            </h2>
            <p className="font-instrument text-lg text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-10">
              GYO Agents son programas de IA que automatizan tareas. Optimizan procesos, liberando tu tiempo valioso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Automatiza <span className="font-normal">tareas</span></h3>
                <p className="font-instrument text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Nuestros agentes aumentan la productividad en un 30%.</p>
              </div>
              <div>
                <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Optimiza <span className="font-normal">procesos</span></h3>
                <p className="font-instrument text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Reducen costos operativos en un 20%.</p>
              </div>
              <div>
                <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Libera tu <span className="font-normal">tiempo</span></h3>
                <p className="font-instrument text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Enfócate en el crecimiento estratégico de tu PYME.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Fin sección ¿Qué son los GYO Technologies Agents? */}
        {/* Sección Beneficios Clave para tu PYME */}
        <section className="w-full py-16 bg-gradient-to-b from-[#191A1D] to-black">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-instrument text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-10">
              Beneficios Clave para tu PYME
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#232428] rounded-lg flex items-center justify-center">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 2a2 2 0 012 2v2h-4V4a2 2 0 012-2zm6 6V4a6 6 0 00-12 0v4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 8a2 2 0 110-4 2 2 0 010 4z' /></svg>
                </span>
                <div>
                  <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Automatización de tareas</h3>
                  <p className="font-instrument text-gray-300">Libera a tu equipo de tareas repetitivas. La automatización de facturación reduce errores en un 15%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#232428] rounded-lg flex items-center justify-center">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3v18h18M3 9h18M9 21V3' /></svg>
                </span>
                <div>
                  <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Optimización de procesos</h3>
                  <p className="font-instrument text-gray-300">Identifica cuellos de botella y mejora la eficiencia. Optimización de cadena de suministro baja los costos un 10%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#232428] rounded-lg flex items-center justify-center">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2m0 0a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2' /></svg>
                </span>
                <div>
                  <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Toma de decisiones inteligentes</h3>
                  <p className="font-instrument text-gray-300">Obtén insights valiosos de tus datos. El análisis de datos de ventas aumenta la conversión en un 8%.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#232428] rounded-lg flex items-center justify-center">
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0a2 2 0 100 4 2 2 0 000-4z' /></svg>
                </span>
                <div>
                  <h3 className="font-instrument text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Mejora la experiencia del cliente</h3>
                  <p className="font-instrument text-gray-300">Ofrece servicio personalizado 24/7. Los chatbots de IA resuelven el 80% de las consultas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Fin sección Beneficios Clave para tu PYME */}
        {/* Sección ¿Por qué elegir GYO Technologies? */}
        <section className="w-full py-20 bg-gradient-to-b from-black to-[#191A1D]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-instrument text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              ¿Por qué elegir GYO Technologies?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg border border-gray-700 bg-[#232428] p-8">
                <h3 className="font-instrument text-2xl font-bold text-gray-100 mb-2">Experiencia en IA</h3>
                <p className="font-instrument text-gray-300">Aplicamos IA específicamente a PYMEs.</p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-[#232428] p-8">
                <h3 className="font-instrument text-2xl font-bold text-gray-100 mb-2">Soluciones Personalizadas</h3>
                <p className="font-instrument text-gray-300">Adaptamos cada agente a tus necesidades.</p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-[#232428] p-8">
                <h3 className="font-instrument text-2xl font-bold text-gray-100 mb-2">Soporte Especializado</h3>
                <p className="font-instrument text-gray-300">Acompañamiento constante y técnico.</p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-[#232428] p-8">
                <h3 className="font-instrument text-2xl font-bold text-gray-100 mb-2">ROI Garantizado</h3>
                <p className="font-instrument text-gray-300">Precios competitivos y retorno de inversión.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Fin sección ¿Por qué elegir GYO Technologies? */}
        {/* Sección Precios y Planes */}
        <section className="w-full py-20 bg-gradient-to-b from-[#191A1D] to-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-instrument text-3xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              Precios y Planes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-8 py-6 font-instrument text-xl font-medium text-gray-100 bg-[#232428] rounded-tl-lg">Plan Básico</td>
                    <td className="px-8 py-6 font-instrument text-gray-200 bg-[#232428] rounded-tr-lg">1 Agente de IA, funcionalidades esenciales, soporte estándar.</td>
                  </tr>
                  <tr className="border-b border-gray-700 bg-[#232428]/80">
                    <td className="px-8 py-6 font-instrument text-xl font-medium text-gray-100">Plan Estándar</td>
                    <td className="px-8 py-6 font-instrument text-gray-200">3 Agentes de IA, funcionalidades avanzadas, soporte prioritario.</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-instrument text-xl font-medium text-gray-100 bg-[#232428] rounded-bl-lg">Plan Premium</td>
                    <td className="px-8 py-6 font-instrument text-gray-200 bg-[#232428] rounded-br-lg">Agentes ilimitados, todas las funcionalidades, soporte 24/7.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-instrument text-lg text-gray-200 mt-8">Prueba gratuita de 14 días disponible.</p>
          </div>
        </section>
        {/* Fin sección Precios y Planes */}
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