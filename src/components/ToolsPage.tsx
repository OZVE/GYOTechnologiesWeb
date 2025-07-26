import { 
  Settings, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle,
  Package,
  GraduationCap,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';

interface ToolsPageProps {
  onPageChange: (page: string) => void;
}

const ToolsPage = ({ onPageChange }: ToolsPageProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const tools = [
    {
      icon: <Package className="w-8 h-8 text-[#252525]" />,
      title: "GYO Agile Stock",
      description: "Gestión de stock completa de manera ágil y personalizada",
      features: [
        "Control de inventario en tiempo real",
        "Gestión personalizada de productos",
        "Reportes automáticos de stock",
        "Interfaz intuitiva y moderna"
      ],
      category: "Inventario",
      url: "https://agilestock.gyotechnologies.com.ar/login",
      status: "available"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#252525]" />,
      title: "GYO Agile Academy",
      description: "Gestión completa de academias, escuelas, cursos y similares",
      features: [
        "Gestión de estudiantes y profesores",
        "Seguimiento de cursos y clases",
        "Sistema de evaluaciones",
        "Reportes académicos detallados"
      ],
      category: "Educación",
      status: "coming-soon"
    },
    {
      icon: <Palette className="w-8 h-8 text-[#252525]" />,
      title: "GYO Agile Studio",
      description: "Gestión de trabajos por encargo y entregas para emprendedores creativos",
      features: [
        "Gestión de proyectos creativos",
        "Seguimiento de entregas y deadlines",
        "Galería de trabajos y portfolio",
        "Facturación para servicios creativos"
      ],
      category: "Creatividad",
      status: "coming-soon"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Agilidad Extrema",
      description: "Automatización inteligente que reduce tareas manuales en un 80%"
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      title: "Personalización Total",
      description: "Cada herramienta se adapta a tu modelo de negocio específico"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Escalabilidad Ilimitada",
      description: "Crece sin límites con herramientas que escalan contigo"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              GYO Tools Suite
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Estamos desarrollando un ecosistema de herramientas para emprendedores que revoluciona la forma de hacer negocios. 
              Más ágil que Office 365, más inteligente que cualquier suite tradicional.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2 justify-center"
              >
                Solicitar Demo <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            ¿Por qué elegir GYO Tools Suite?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tool Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-green-400">
              ¡Ya Disponible!
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Nuestra primera herramienta ya está en funcionamiento, ayudando a emprendedores a gestionar su inventario de manera eficiente.
            </p>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl border border-green-500/30">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                  <Package className="w-10 h-10 text-[#252525]" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-green-400">GYO Agile Stock</h3>
              <p className="text-gray-300 mb-6">
                Gestión de inventario completa y personalizada. Controla tu stock en tiempo real con una interfaz moderna y fácil de usar.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">✓ Disponible Ahora</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">✓ En Producción</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">✓ Casos de Éxito</span>
              </div>
              <a 
                href="https://agilestock.gyotechnologies.com.ar/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
              >
                Probar Ahora Gratis
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Nuestras Herramientas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cada herramienta es diseñada en colaboración con emprendedores reales, 
              solucionando problemas específicos del mundo empresarial actual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-purple-400 font-medium">{tool.category}</span>
                      {tool.status === 'available' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          ✓ Disponible
                        </span>
                      )}
                      {tool.status === 'coming-soon' && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                          ⏳ En desarrollo
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{tool.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle size={16} className="text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {tool.status === 'available' && tool.url ? (
                  <a 
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2"
                  >
                    Acceder a la Herramienta
                    <ArrowRight size={16} />
                  </a>
                ) : tool.status === 'coming-soon' ? (
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-semibold cursor-not-allowed transition-all opacity-0 group-hover:opacity-100">
                    Próximamente
                  </button>
                ) : (
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all opacity-0 group-hover:opacity-100">
                    Más Información
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Transforma tu negocio hoy mismo
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a los emprendedores que ya están usando nuestras herramientas para optimizar sus negocios.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-white text-purple-900 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default ToolsPage; 