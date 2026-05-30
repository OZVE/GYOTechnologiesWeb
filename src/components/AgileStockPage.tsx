import { ArrowRight, CheckCircle, ClipboardList, FileText, Globe, LayoutDashboard, Package, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';
import Footer from './Footer';
import Navbar from './Navbar';

interface AgileStockPageProps {
  onPageChange: (page: string) => void;
}

const valuePropositions = [
  {
    icon: LayoutDashboard,
    title: 'Gestion 360',
    description: 'Centraliza compras, insumos, productos, pedidos, costos y ventas en una sola operacion.'
  },
  {
    icon: Globe,
    title: 'Multi empresa',
    description: 'Administra sucursales o unidades de negocio con datos ordenados y trazabilidad clara.'
  },
  {
    icon: Zap,
    title: 'Tiempo real',
    description: 'Dashboards y alertas para decidir antes de que el stock critico se vuelva problema.'
  },
  {
    icon: Smartphone,
    title: 'Web responsive',
    description: 'Acceso desde computadora, tablet o celular sin depender de planillas dispersas.'
  }
];

const featureBlocks = [
  {
    eyebrow: 'Vision general',
    title: 'Toma decisiones basadas en datos reales.',
    description: 'El dashboard deja de ser decoracion: muestra ventas, productos mas vendidos, ingresos y alertas operativas para leer el negocio de un vistazo.',
    image: '/as-dashboard.png',
    icon: LayoutDashboard,
    points: ['Ventas y productos mas vendidos', 'Proyeccion de ingresos mensuales', 'Alertas de stock critico'],
    accent: '#7fa36b'
  },
  {
    eyebrow: 'Stock inteligente',
    title: 'Control de insumos con semaforo de reposicion.',
    description: 'El sistema senala que insumos requieren accion y mantiene visible el patrimonio cargado en materia prima.',
    image: '/as-insumos.png',
    icon: Package,
    points: ['Alertas rojo, amarillo y verde', 'Patrimonio en insumos', 'Historial de movimientos'],
    accent: '#7e6bd8'
  },
  {
    eyebrow: 'Pedidos',
    title: 'Flujo de pedidos de punta a punta.',
    description: 'Cada pedido puede seguirse desde el ingreso hasta la entrega, con comprobantes y estados claros para operar sin improvisar.',
    image: '/as-pedidos.png',
    icon: ClipboardList,
    points: ['Estados personalizables', 'PDF con codigo QR', 'Descuento automatico de stock'],
    accent: '#d75f32'
  },
  {
    eyebrow: 'Recetas y costos',
    title: 'Produccion exacta, costos precisos.',
    description: 'Las recetas permiten calcular costos por unidad, descontar insumos y entender rentabilidad por producto.',
    image: '/as-receta.png',
    icon: FileText,
    points: ['Costo automatico por unidad', 'Rentabilidad por producto', 'Produccion y stock intermedio'],
    accent: '#7fa36b'
  }
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
};

const AgileStockPage = ({ onPageChange }: AgileStockPageProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#efe7da] text-[#171411]">
      <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />

      <header className="relative overflow-hidden px-4 pt-36 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(127,163,107,0.25),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(215,95,50,0.16),transparent_28%)]" />
        <div className="container relative z-10 grid min-h-[76vh] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#171411]/12 bg-[#f8f0e3]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#171411]/65">
              <Package className="h-4 w-4 text-[#7fa36b]" /> Producto activo
            </div>
            <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.075em] md:text-8xl">
              Stock, pedidos y costos con estructura operativa.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#171411]/70 md:text-xl">
              GYO Agile Stock ordena el inventario como sistema: datos claros, trazabilidad, alertas y decisiones menos dependientes de planillas manuales.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="https://agilestock.gyotechnologies.com.ar/login" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#7fa36b] hover:text-[#171411]">
                Ingresar <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full border border-[#171411]/20 bg-[#f8f0e3]/70 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#171411] transition hover:border-[#171411]">
                Solicitar demo
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="rounded-[2rem] border border-[#171411]/12 bg-[#f8f0e3] p-3 shadow-2xl shadow-[#171411]/15">
              <img src="/agilestockbanner.png" alt="GYO Agile Stock Platform Interface" loading="eager" decoding="async" className="w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-5 rounded-3xl bg-[#171411] p-5 text-[#efe7da] shadow-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#efe7da]/50">Status</p>
              <p className="mt-2 text-2xl font-black">Operativo</p>
            </div>
          </motion.div>
        </div>
      </header>

      <motion.section className="px-4 py-20 md:py-28" {...reveal}>
        <div className="container">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7fa36b]">Operacion</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              La herramienta no promete magia: ordena decisiones diarias.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {valuePropositions.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="rounded-[1.75rem] border border-[#171411]/10 bg-[#f8f0e3] p-6">
                  <Icon className="mb-10 h-6 w-6 text-[#7fa36b]" />
                  <h3 className="text-2xl font-black tracking-[-0.04em]">{prop.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#171411]/68">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section className="bg-[#171411] px-4 py-24 text-[#efe7da] md:py-32">
        <div className="container space-y-24">
          {featureBlocks.map((feature, index) => {
            const Icon = feature.icon;
            const isReversed = index % 2 === 1;
            return (
              <motion.div key={feature.title} className="grid gap-10 lg:grid-cols-2 lg:items-center" {...reveal}>
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className="overflow-hidden rounded-[2rem] border border-[#efe7da]/12 bg-[#efe7da]/7 p-3">
                    <img src={feature.image} alt={feature.title} loading="lazy" decoding="async" className="w-full rounded-[1.5rem] object-cover transition duration-700 hover:scale-[1.025]" />
                  </div>
                </div>
                <div className={isReversed ? 'lg:order-1' : ''}>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#efe7da]/12 px-4 py-2 text-xs font-black uppercase tracking-[0.24em]" style={{ color: feature.accent }}>
                    <Icon className="h-4 w-4" /> {feature.eyebrow}
                  </div>
                  <h3 className="text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">{feature.title}</h3>
                  <p className="mt-6 text-lg leading-8 text-[#efe7da]/68">{feature.description}</p>
                  <ul className="mt-8 space-y-3">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[#efe7da]/72">
                        <CheckCircle className="h-5 w-5" style={{ color: feature.accent }} /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="container grid gap-8 rounded-[2rem] bg-[#f8f0e3] p-8 md:grid-cols-[1fr_0.8fr] md:p-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Tecnologia</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">Robusta, segura y lista para uso diario.</h2>
            <p className="mt-6 leading-8 text-[#171411]/68">Una arquitectura web pensada para acceso continuo, backups, seguridad y operacion desde multiples dispositivos.</p>
          </div>
          <div className="grid gap-3 self-end">
            {['Cloud-ready', 'Backups automaticos', 'Acceso responsive', 'Datos aislados por negocio'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#171411]/10 bg-[#efe7da] p-5 font-black tracking-[-0.03em]">
                <ShieldCheck className="h-5 w-5 text-[#7fa36b]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container rounded-[2rem] bg-[#7fa36b] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">Moderniza tu inventario sin perder control operativo.</h2>
            <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#efe7da] hover:text-[#171411]">
              Comenzar demo <ArrowRight className="ml-3 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default AgileStockPage;
