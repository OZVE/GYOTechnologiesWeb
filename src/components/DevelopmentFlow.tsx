import { useEffect, useRef } from 'react';
import { ClipboardList, Code, Database, MessageSquare, Rocket, CheckCircle } from 'lucide-react';
import '../styles/development-flow.css';

const steps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-white" />,
    title: "Toma de requerimientos",
    description: "Levantamos junto al cliente los procesos a automatizar y definimos los objetivos del agente."
  },
  {
    icon: <Code className="w-8 h-8 text-white" />,
    title: "Desarrollo",
    description: "Diseñamos y entrenamos el modelo de IA ajustado a las necesidades específicas de la empresa."
  },
  {
    icon: <Database className="w-8 h-8 text-white" />,
    title: "Conexión con bases de datos",
    description: "Integramos el agente con las fuentes de datos internas para potenciar su capacidad de respuesta."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-white" />,
    title: "Integraciones con canales de comunicación",
    description: "WhatsApp, Instagram, Outlook, Gmail, entre otros."
  },
  {
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: "Puesta en producción",
    description: "Validamos el funcionamiento, controlamos la calidad y desplegamos el agente en el entorno productivo."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    title: "Agente trabajando",
    description: "El agente comienza a operar de forma autónoma, optimizando procesos y liberando tiempo al equipo."
  }
];

const DevelopmentFlow = () => {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-20 text-white">
          Flujo de Desarrollo
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
            >
              <div className="flex flex-col md:flex-row items-start gap-8 bg-[#111] p-8 rounded-lg border border-gray-800 hover:bg-[#222] transition-all shadow-lg">
                <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentFlow; 