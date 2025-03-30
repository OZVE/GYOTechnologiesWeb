import {
  ArrowRight,
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
import ServiceCard from './components/ServiceCard';
import CaseStudyCard from './components/CaseStudyCard';
import TechnologyCard from './components/TechnologyCard';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center bg-white text-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="lines">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="wavy-line"></div>
            ))}
          </div>
        </div>
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
          <img src="/gyo-banner.png" alt="GYO Technologies" className="h-16" />
          <span className="text-xl font-bold">GYO TECHNOLOGIES</span>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transformamos tu visión en software inteligente
            </h1>
            <p className="text-xl md:text-2xl mb-12">
              Desarrollo ágil con IA y experiencia humana
            </p>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-black text-white border border-black rounded-full hover:bg-white hover:text-black transition-all"
            >
              Solicita una consultoría
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .lines {
          position: absolute;
          width: 100%;
          height: 100%;
          background: white;
          overflow: hidden;
        }
        
        .wavy-line {
          position: absolute;
          width: 200%;
          height: 1.5px;
          background: rgba(37, 37, 37, 0.12);
          left: -50%;
        }

        ${[...Array(40)].map((_, i) => `
          .wavy-line:nth-child(${i + 1}) {
            top: ${(i * 100) / 40}%;
            animation: wave 12s infinite ease-in-out;
            animation-delay: ${i * -0.2}s;
            transform-origin: 0% 50%;
          }
        `).join('')}

        @keyframes wave {
          0% {
            transform: scaleX(1.2) translateX(-10%) translateY(0)
              skew(-5deg) rotate(-2deg);
          }
          25% {
            transform: scaleX(1.1) translateX(-5%) translateY(30px)
              skew(5deg) rotate(2deg);
          }
          50% {
            transform: scaleX(0.9) translateX(10%) translateY(-20px)
              skew(-8deg) rotate(-3deg);
          }
          75% {
            transform: scaleX(1.1) translateX(-5%) translateY(-40px)
              skew(8deg) rotate(3deg);
          }
          100% {
            transform: scaleX(1.2) translateX(-10%) translateY(0)
              skew(-5deg) rotate(-2deg);
          }
        }

        .lines:hover .wavy-line {
          animation-play-state: paused;
        }
      `}</style>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#1c1c1e]">
              Potenciando el futuro con IA y experiencia humana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#252525] rounded-lg flex items-center justify-center text-white">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">IA Avanzada</h3>
                <p className="text-gray-600">Soluciones impulsadas por los últimos avances en inteligencia artificial</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#252525] rounded-lg flex items-center justify-center text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experiencia Humana</h3>
                <p className="text-gray-600">Equipo de expertos senior supervisando cada proyecto</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#252525] rounded-lg flex items-center justify-center text-white">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunicación Clara</h3>
                <p className="text-gray-600">Proceso transparente y comunicación constante</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-[#1c1c1e]">
              Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600">
              Combinamos tecnología de vanguardia con experiencia humana para crear soluciones digitales excepcionales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-[#1c1c1e]">
              Tecnologías y Herramientas
            </h2>
            <p className="text-xl text-gray-600">
              Dominamos las últimas tecnologías para crear soluciones modernas y escalables
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {technologies.map((tech, index) => (
              <TechnologyCard key={index} {...tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1c1c1e]">
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

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#1c1c1e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">GYO</h3>
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
            <p>© {new Date().getFullYear()} GYO Technologies.  Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;