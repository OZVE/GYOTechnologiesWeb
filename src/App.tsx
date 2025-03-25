import React from 'react';
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
import ContactForm from './components/ContactForm';
import ServiceCard from './components/ServiceCard';
import CaseStudyCard from './components/CaseStudyCard';
import TechnologyCard from './components/TechnologyCard';

function App() {
  const services = [
    {
      icon: <Brain className="w-full h-full" />,
      title: "AI-Driven Web Development",
      description: "Potenciamos el desarrollo web con inteligencia artificial para crear soluciones más rápidas y eficientes.",
      features: [
        "Generación automatizada de componentes UI con modelos de IA",
        "Análisis predictivo de patrones de usuario para optimizar UX",
        "Testing automatizado y detección de errores con ML"
      ]
    },
    {
      icon: <Code className="w-full h-full" />,
      title: "Custom Web Applications",
      description: "Desarrollamos aplicaciones web robustas y escalables utilizando las últimas tecnologías.",
      features: [
        "Arquitectura moderna con React, Node.js y APIs RESTful",
        "Integración de bases de datos SQL y NoSQL",
        "Sistemas de autenticación y autorización seguros"
      ]
    },
    {
      icon: <MonitorSmartphone className="w-full h-full" />,
      title: "Mobile Application Development",
      description: "Creamos apps móviles nativas y multiplataforma con rendimiento excepcional.",
      features: [
        "Desarrollo cross-platform con React Native",
        "Optimización de rendimiento y experiencia offline",
        "Integración con servicios en la nube y APIs"
      ]
    },
    {
      icon: <Workflow className="w-full h-full" />,
      title: "System Integration & Automation",
      description: "Conectamos y automatizamos sistemas empresariales para maximizar la eficiencia.",
      features: [
        "Integración de ERPs y CRMs mediante APIs",
        "Automatización de flujos de trabajo y datos",
        "Monitoreo en tiempo real y alertas inteligentes"
      ]
    },
    {
      icon: <Laptop className="w-full h-full" />,
      title: "IT Consulting",
      description: "Asesoramiento experto para optimizar su infraestructura tecnológica.",
      features: [
        "Auditorías de arquitectura y rendimiento",
        "Planificación de escalabilidad y cloud",
        "Optimización de costes y recursos IT"
      ]
    },
    {
      icon: <LineChart className="w-full h-full" />,
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
      icon: <Globe />,
      title: "Frontend",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"]
    },
    {
      icon: <Server />,
      title: "Backend",
      technologies: ["Node.js", "Python", "Django", "Express", "FastAPI"]
    },
    {
      icon: <Database />,
      title: "Databases",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Supabase"]
    },
    {
      icon: <Cpu />,
      title: "AI & ML",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Scikit-learn"]
    },
    {
      icon: <Palette />,
      title: "CMS & Low-Code",
      technologies: ["WordPress", "Webflow", "Strapi", "Contentful"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1473e6] to-[#1c1c1e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transformamos tu visión en software inteligente
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Desarrollo ágil con IA y experiencia humana
          </p>
          <a href="#contact" className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-[#1473e6] rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
            Solicita una consultoría
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#1c1c1e]">
              Potenciando el futuro con IA y experiencia humana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1473e6] rounded-lg flex items-center justify-center text-white">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">IA Avanzada</h3>
                <p className="text-gray-600">Soluciones impulsadas por los últimos avances en inteligencia artificial</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1473e6] rounded-lg flex items-center justify-center text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experiencia Humana</h3>
                <p className="text-gray-600">Equipo de expertos senior supervisando cada proyecto</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1473e6] rounded-lg flex items-center justify-center text-white">
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
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
              title="FinTech Revolution"
              challenge="Modernización de sistema bancario legacy"
              solution="Implementación de microservicios con IA"
              result="50% reducción en tiempo de procesamiento"
            />
            <CaseStudyCard
              image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80"
              title="E-commerce AI"
              challenge="Personalización de experiencia de usuario"
              solution="Sistema de recomendaciones basado en IA"
              result="35% incremento en ventas cruzadas"
            />
            <CaseStudyCard
              image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
              title="Healthcare Analytics"
              challenge="Análisis de datos médicos en tiempo real"
              solution="Platform de análisis predictivo"
              result="90% precisión en predicciones"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-[#1c1c1e]">
              Contacta con Nosotros
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

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
                <li>info@gyo-tech.com</li>
                <li>+34 900 123 456</li>
                <li>Madrid, España</li>
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