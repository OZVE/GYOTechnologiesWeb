import {
  Brain,
  Code,
  Database,
  Laptop,
  MessageSquare,
  MonitorSmartphone,
  Users,
  Workflow,
  LineChart,
  Globe,
  Cpu,
  Server,
  Palette
} from 'lucide-react';
import ContactSection from './components/ContactSection';
import CaseStudyCard from './components/CaseStudyCard';
import PartnerCard from './components/PartnerCard';

function App() {
  const services = [
    {
      icon: <Brain className="w-full h-full text-[#252525]" />,
      title: "AI-Driven Web Development",
      description: "Potenciamos el desarrollo web con inteligencia artificial para crear soluciones más rápidas y eficientes.",
      features: [
        "Generación automatizada de componentes UI con modelos de IA",
        "Análisis predictivo de patrones de usuario para optimizar UX",
        "Testing automatizado y detección de errores con ML"
      ]
    },
    {
      icon: <Code className="w-full h-full text-[#252525]" />,
      title: "Custom Web Applications",
      description: "Desarrollamos aplicaciones web robustas y escalables utilizando las últimas tecnologías.",
      features: [
        "Arquitectura moderna con React, Node.js y APIs RESTful",
        "Integración de bases de datos SQL y NoSQL",
        "Sistemas de autenticación y autorización seguros"
      ]
    },
    {
      icon: <MonitorSmartphone className="w-full h-full text-[#252525]" />,
      title: "Mobile Application Development",
      description: "Creamos apps móviles nativas y multiplataforma con rendimiento excepcional.",
      features: [
        "Desarrollo cross-platform con React Native",
        "Optimización de rendimiento y experiencia offline",
        "Integración con servicios en la nube y APIs"
      ]
    },
    {
      icon: <Workflow className="w-full h-full text-[#252525]" />,
      title: "System Integration & Automation",
      description: "Conectamos y automatizamos sistemas empresariales para maximizar la eficiencia.",
      features: [
        "Integración de ERPs y CRMs mediante APIs",
        "Automatización de flujos de trabajo y datos",
        "Monitoreo en tiempo real y alertas inteligentes"
      ]
    },
    {
      icon: <Laptop className="w-full h-full text-[#252525]" />,
      title: "IT Consulting",
      description: "Asesoramiento experto para optimizar su infraestructura tecnológica.",
      features: [
        "Auditorías de arquitectura y rendimiento",
        "Planificación de escalabilidad y cloud",
        "Optimización de costes y recursos IT"
      ]
    },
    {
      icon: <LineChart className="w-full h-full text-[#252525]" />,
      title: "Strategic Technology Advisory",
      description: "Guiamos la transformación digital y adopción de nuevas tecnologías.",
      features: [
        "Roadmap de transformación digital personalizado",
        "Evaluación y selección de stack tecnológico",
        "Estrategias de implementación de IA y ML"
      ]
    }
  ];

  const technologies = [
    {
      icon: <Globe className="text-[#252525]" />,
      name: "Frontend",
      description: "React, TypeScript, Next.js, Tailwind CSS, Vue.js"
    },
    {
      icon: <Server className="text-[#252525]" />,
      name: "Backend",
      description: "Node.js, Python, Django, Express, FastAPI"
    },
    {
      icon: <Database className="text-[#252525]" />,
      name: "Databases",
      description: "PostgreSQL, MongoDB, Redis, MySQL, Supabase"
    },
    {
      icon: <Cpu className="text-[#252525]" />,
      name: "AI & ML",
      description: "TensorFlow, PyTorch, OpenAI, Scikit-learn"
    },
    {
      icon: <Palette className="text-[#252525]" />,
      name: "CMS & Low-Code",
      description: "WordPress, Webflow, Strapi, Contentful"
    }
  ];

  const partners = [
    {
      logo: "./partners/om.png",
      name: "OM Consultores",
      description: "Nuestro partner estratégico en Chile, especializado en migraciones a la nube (AWS y SAP)",
      link: "https://omconsultores.cl/"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center bg-black text-white overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/gyo-banner.png" alt="GYO Technologies" className="h-12" />
              <span className="text-xl font-bold">GYO TECHNOLOGIES</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <a 
                  href="#hero" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                >
                  Inicio
                </a>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                >
                  Servicios
                </a>
                <a 
                  href="#technologies"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('technologies')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                >
                  Tecnologías
                </a>
                <a 
                  href="#cases"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                >
                  Casos
                </a>
              </div>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all"
              >
                Contacto
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
          <div className="w-1/2">
            <h1 className="text-7xl font-bold mb-8 leading-tight">
              TRANSFORMAMOS<br />
              TU VISIÓN EN<br />
              SOFTWARE<br />
              INTELIGENTE
            </h1>
            <p className="text-xl mb-12 text-gray-300 max-w-xl">
              Desarrollo ágil con IA y experiencia humana para crear soluciones digitales excepcionales
            </p>
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <span className="text-3xl">🇦🇷</span>
                <p className="text-sm text-gray-400 mt-2">Buenos Aires<br/>Sede Principal</p>
              </div>
              <div className="text-center">
                <span className="text-3xl">🇨🇱</span>
                <p className="text-sm text-gray-400 mt-2">Santiago<br/>Partner Regional</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <img 
              src="/gyo-banner.png" 
              alt="GYO Technologies" 
              className="w-4/5 object-contain animate-float"
            />
          </div>
        </div>

        {/* Background Effect */}
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10"></div>
      </header>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* About Section */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">
              Potenciando el futuro con IA y experiencia humana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                  <Brain className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">IA Avanzada</h3>
                <p className="text-gray-400">Soluciones impulsadas por los últimos avances en inteligencia artificial</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                  <Users className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Experiencia Humana</h3>
                <p className="text-gray-400">Equipo de expertos senior supervisando cada proyecto</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                  <MessageSquare className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Comunicación Clara</h3>
                <p className="text-gray-400">Proceso transparente y comunicación constante</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Servicios Especializados
            </h2>
            <p className="text-xl text-gray-300">
              Combinamos tecnología de vanguardia con experiencia humana para crear soluciones digitales excepcionales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-[#111] p-8 rounded-2xl hover:bg-[#222] transition-all border border-gray-800">
                <div className="w-16 h-16 mb-6 bg-white rounded-xl flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Tecnologías y Herramientas
            </h2>
            <p className="text-xl text-gray-300">
              Dominamos las últimas tecnologías para crear soluciones modernas y escalables
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-[#111] p-6 rounded-2xl hover:bg-[#222] transition-all border border-gray-800">
                <div className="w-12 h-12 mb-4 bg-white rounded-lg flex items-center justify-center">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-20 bg-[#111]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Casos de Éxito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CaseStudyCard
              image="./C-heren.jpg"
              title="Heren E-commerce" 
              challenge="Diseñar una plataforma de e-commerce personalizada para una marca de ropa, con experiencia de compra fluida y segura."
              solution="Desarrollo de tienda online con integración de pasarela de pago y sistema de mailing automatizado para promociones y seguimiento post-compra."
              result="El sistema en linea fue un éxito, permitiendo a la marca expandir su presencia en el mercado y fortalecer su relación con clientes mediante campañas de correo segmentadas."
              link="https://www.heren.com.ar/"
            />
            <CaseStudyCard
              image="./C-om.jpg"
              title="OM Consultores"
              challenge="Diseñar una presencia digital confiable para una consultora especializada en migraciones a la nube (AWS y SAP)."
              solution="Diseñamos y desarrollamos un sitio web comercial centrado en la propuesta de valor de OM Consultores, destacando su experiencia en migraciones a AWS y SAP."
              result="El nuevo sitio web permitió a OM Consultores incrementar significativamente la visibilidad de su marca y ganar la confianza de nuevos clientes."
              link="https://omconsultores.cl/"
            />
            <CaseStudyCard
              image="./C-laquinta.jpg"
              title="La Quinta F.C."
              challenge="Modernizar la imagen y agilizar la gestión de torneos en un predio de canchas de fútbol."
              solution="Desarrollo de un sitio web comercial con sistema integrado para actualizar resultados de partidos, posiciones y estadísticas de cada liga."
              result="Mayor interacción con clientes, facilitando la organización de torneos y consolidando la presencia digital de La Quinta F.C."
              link="https://www.laquintafc.com.ar/"
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white mr-2" />
              <h2 className="text-4xl font-bold text-white">
                Nuestro Partner Estratégico
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-6">
              Colaboramos con expertos en migraciones a la nube para ofrecer soluciones empresariales de primer nivel
            </p>
            <div className="bg-[#111] p-6 rounded-lg border border-gray-800">
              <div className="w-full">
                {partners.map((partner, index) => (
                  <PartnerCard key={index} {...partner} />
                ))}
              </div>
              <div className="mt-8 border-t border-gray-800 pt-8">
                <p className="text-gray-300 mb-4">
                  OM Consultores es nuestro partner estratégico en Chile, con quienes compartimos una visión común: 
                  transformar la infraestructura tecnológica de las empresas mediante soluciones cloud avanzadas.
                </p>
                <p className="text-gray-300">
                  Juntos ofrecemos servicios especializados en migraciones a AWS y SAP, 
                  garantizando una transición suave y eficiente para nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Footer */}
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
    </div>
  );
}

export default App;