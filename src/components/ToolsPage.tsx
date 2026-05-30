import { ArrowRight, CheckCircle, GraduationCap, Package, Palette, Wrench, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';
import Footer from './Footer';
import Navbar from './Navbar';

interface ToolsPageProps {
  onPageChange: (page: string) => void;
}

const tools = [
  {
    icon: Package,
    title: 'GYO Agile Stock',
    category: 'Inventario',
    status: 'Disponible',
    description: 'Gestion de stock, pedidos, insumos y costos para negocios que necesitan operar con datos claros.',
    features: ['Control en tiempo real', 'Reportes automaticos', 'Trazabilidad de pedidos', 'Costos por producto'],
    page: 'agile-stock',
    url: 'https://agilestock.gyotechnologies.com.ar/login',
    accent: '#7fa36b'
  },
  {
    icon: GraduationCap,
    title: 'GYO Agile Academy',
    category: 'Educacion',
    status: 'Disponible',
    description: 'Gestion academica, asistencia, pagos y reportes para instituciones, escuelas y cursos.',
    features: ['Expedientes digitales', 'Control financiero', 'Reportes exportables', 'Roles seguros'],
    page: 'agile-academy',
    url: 'https://academy.gyotechnologies.com.ar/auth/login',
    accent: '#7e6bd8'
  },
  {
    icon: Palette,
    title: 'GYO Agile Studio',
    category: 'Creatividad',
    status: 'Concept tool',
    description: 'Gestion de encargos, entregas, portfolio y facturacion para equipos creativos y estudios boutique.',
    features: ['Briefs ordenados', 'Seguimiento de entregas', 'Galeria de trabajos', 'Pipeline comercial'],
    accent: '#d75f32'
  }
];

const accelerators = [
  'Brief Builder',
  'Proposal Composer',
  'Lead Qualifier',
  'Content Engine',
  'Ops Dashboard Kit',
  'AI Agent Starter'
];

const principles = [
  {
    title: 'Activos propios',
    description: 'Tools no es una lista de servicios: es el espacio donde GYO muestra sistemas, templates y agentes que pueden convertirse en producto.'
  },
  {
    title: 'Operacion real',
    description: 'Cada herramienta existe para ordenar un flujo concreto: inventario, academia, briefs, propuestas, leads o reportes.'
  },
  {
    title: 'Base reutilizable',
    description: 'Lo que aprendemos construyendo tools acelera entregas para clientes sin convertir cada proyecto en una pieza generica.'
  }
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
};

const ToolsPage = ({ onPageChange }: ToolsPageProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#efe7da] text-[#171411]">
      <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />

      <header className="relative overflow-hidden px-4 pt-36 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(127,163,107,0.22),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(126,107,216,0.18),transparent_30%),radial-gradient(circle_at_55%_82%,rgba(215,95,50,0.18),transparent_30%)]" />
        <div className="container relative z-10 grid min-h-[72vh] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#171411]/12 bg-[#f8f0e3]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#171411]/65">
              <Wrench className="h-4 w-4 text-[#7fa36b]" /> GYO Tools
            </div>
            <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.075em] md:text-8xl">
              Herramientas propias para acelerar ideas, procesos y entregas.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#171411]/70 md:text-xl">
              Tools posiciona a GYO como un estudio que no solo entrega proyectos: crea activos reutilizables, sistemas internos, agentes y kits para operar mejor.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#d75f32]">
                Ver herramientas <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full border border-[#171411]/20 bg-[#f8f0e3]/70 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#171411] transition hover:border-[#171411]">
                Solicitar demo
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="rounded-[2rem] border border-[#171411]/10 bg-[#f8f0e3]/75 p-5 shadow-2xl shadow-[#171411]/10">
            <div className="grid gap-4">
              {accelerators.map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-[#171411]/10 bg-[#efe7da] px-5 py-4">
                  <span className="text-xs font-black uppercase tracking-[0.26em] text-[#171411]/42">0{index + 1}</span>
                  <span className="text-xl font-black tracking-[-0.04em]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <motion.section className="px-4 py-20 md:py-28" {...reveal}>
        <div className="container grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-[1.75rem] border border-[#171411]/10 bg-[#f8f0e3] p-7">
              <Zap className="mb-10 h-5 w-5 text-[#d75f32]" />
              <h2 className="text-3xl font-black tracking-[-0.05em]">{principle.title}</h2>
              <p className="mt-4 leading-7 text-[#171411]/68">{principle.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section id="tools-grid" className="bg-[#171411] px-4 py-24 text-[#efe7da] md:py-32" {...reveal}>
        <div className="container">
          <div className="mb-14 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7fa36b]">Suite actual</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              Herramientas reales, conceptuales y en beta sin mezclarlas con servicios.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="flex min-h-[520px] flex-col rounded-[2rem] border border-[#efe7da]/12 bg-[#efe7da]/7 p-7 transition hover:-translate-y-1 hover:bg-[#efe7da]/12">
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-[#efe7da] p-4 text-[#171411]">
                      <Icon className="h-7 w-7" style={{ color: tool.accent }} />
                    </div>
                    <span className="rounded-full border border-[#efe7da]/15 px-3 py-1 text-xs font-bold text-[#efe7da]/60">{tool.status}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: tool.accent }}>{tool.category}</p>
                  <h3 className="mt-4 text-4xl font-black leading-none tracking-[-0.06em]">{tool.title}</h3>
                  <p className="mt-6 leading-7 text-[#efe7da]/68">{tool.description}</p>
                  <ul className="mt-8 space-y-3">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#efe7da]/70">
                        <CheckCircle className="h-4 w-4" style={{ color: tool.accent }} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-3 pt-10">
                    {tool.url && (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#efe7da] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#171411] transition hover:bg-[#d75f32]">
                        Acceder <ArrowRight className="ml-3 h-4 w-4" />
                      </a>
                    )}
                    {tool.page && (
                      <button onClick={() => onPageChange(tool.page)} className="rounded-full border border-[#efe7da]/15 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#efe7da]/75 transition hover:border-[#efe7da] hover:text-[#efe7da]">
                        Ver detalle
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section className="px-4 py-20 md:py-28">
        <div className="container rounded-[2rem] bg-[#d75f32] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#171411]/60">Implementacion</p>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
                Una tool puede empezar como concepto y terminar sosteniendo una operacion real.
              </h2>
            </div>
            <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#efe7da] hover:text-[#171411]">
              Hablemos de una tool <ArrowRight className="ml-3 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default ToolsPage;
