import { ArrowRight, CheckCircle, DollarSign, GraduationCap, LayoutDashboard, Lock, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';
import Footer from './Footer';
import Navbar from './Navbar';

interface AgileAcademyPageProps {
  onPageChange: (page: string) => void;
}

const valuePropositions = [
  {
    icon: GraduationCap,
    title: 'Gestion academica',
    description: 'Expedientes digitales, cursos, asistencia y calificaciones organizadas en un solo lugar.'
  },
  {
    icon: DollarSign,
    title: 'Control financiero',
    description: 'Cuotas, deudas, gastos y flujo de caja visibles para operar sin fugas administrativas.'
  },
  {
    icon: LayoutDashboard,
    title: 'Reportes claros',
    description: 'Tableros y exportables para tomar decisiones sobre alumnos, pagos y rendimiento.'
  },
  {
    icon: ShieldCheck,
    title: 'Roles seguros',
    description: 'Acceso diferenciado para equipos administrativos, docentes y responsables.'
  }
];

const featureBlocks = [
  {
    eyebrow: 'Vision general',
    title: 'Todo lo que pasa en tu academia, visible.',
    description: 'Un panel centralizado para leer actividad diaria, inscripciones, asistencia, pagos y pendientes sin revisar multiples archivos.',
    image: '/aa-dashboard.png',
    icon: LayoutDashboard,
    points: ['Resumen diario de actividad', 'Alertas de tareas pendientes', 'KPIs academicos y administrativos'],
    accent: '#7e6bd8'
  },
  {
    eyebrow: 'Alumnos',
    title: 'Expedientes digitales completos.',
    description: 'La informacion de cada alumno deja de estar dispersa: historial, cursos, datos de contacto y documentacion conviven en una misma ficha.',
    image: '/aa-alumnos.png',
    icon: Users,
    points: ['Datos personales y contacto', 'Historial de cursos', 'Documentacion digitalizada'],
    accent: '#d75f32'
  },
  {
    eyebrow: 'Finanzas',
    title: 'Control total de cuotas y tesoreria.',
    description: 'El flujo de caja se vuelve legible: pagos, morosos, gastos y proveedores quedan disponibles para decidir con menos friccion.',
    image: '/aa-finanzas.png',
    icon: DollarSign,
    points: ['Seguimiento de cuotas', 'Deteccion de morosos', 'Gestion de gastos y proveedores'],
    accent: '#7fa36b'
  },
  {
    eyebrow: 'Reportes',
    title: 'Informacion lista para crecer.',
    description: 'Reportes exportables para entender rendimiento, asistencia, ingresos y resultados de la institucion sin armar informes desde cero.',
    image: '/aa-reportes.png',
    icon: ShieldCheck,
    points: ['Ingresos y egresos', 'Asistencia y calificaciones', 'Exportacion a Excel y PDF'],
    accent: '#7e6bd8'
  }
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
};

const AgileAcademyPage = ({ onPageChange }: AgileAcademyPageProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#efe7da] text-[#171411]">
      <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />

      <header className="relative overflow-hidden px-4 pt-36 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(126,107,216,0.22),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(215,95,50,0.15),transparent_28%),radial-gradient(circle_at_60%_88%,rgba(127,163,107,0.16),transparent_30%)]" />
        <div className="container relative z-10 grid min-h-[76vh] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#171411]/12 bg-[#f8f0e3]/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#171411]/65">
              <GraduationCap className="h-4 w-4 text-[#7e6bd8]" /> Producto activo
            </div>
            <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.075em] md:text-8xl">
              Gestion educativa con estructura, datos y continuidad.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#171411]/70 md:text-xl">
              GYO Agile Academy ordena academia, finanzas y reportes en una plataforma pensada para instituciones que necesitan crecer sin multiplicar carga administrativa.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="https://academy.gyotechnologies.com.ar/auth/login" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#7e6bd8]">
                Ir al campus <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full border border-[#171411]/20 bg-[#f8f0e3]/70 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#171411] transition hover:border-[#171411]">
                Solicitar demo
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="rounded-[2rem] border border-[#171411]/12 bg-[#f8f0e3] p-3 shadow-2xl shadow-[#171411]/15">
              <img src="/aa-dashboard.png" alt="Plataforma de Gestion Academica" loading="eager" decoding="async" className="w-full rounded-[1.5rem] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-5 rounded-3xl bg-[#171411] p-5 text-[#efe7da] shadow-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#efe7da]/50">Sistema</p>
              <p className="mt-2 text-2xl font-black">Academico</p>
            </div>
          </motion.div>
        </div>
      </header>

      <motion.section className="px-4 py-20 md:py-28" {...reveal}>
        <div className="container">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7e6bd8]">Institucion</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              La plataforma se adapta al metodo, no al reves.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {valuePropositions.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="rounded-[1.75rem] border border-[#171411]/10 bg-[#f8f0e3] p-6">
                  <Icon className="mb-10 h-6 w-6 text-[#7e6bd8]" />
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
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7e6bd8]">Tecnologia</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">Estabilidad para operar todos los dias.</h2>
            <p className="mt-6 leading-8 text-[#171411]/68">Roles, acceso cloud, seguridad de datos y reportes exportables para sostener una institucion sin depender de controles manuales.</p>
          </div>
          <div className="grid gap-3 self-end">
            {['Acceso cloud', 'Seguridad SSL/TLS', 'Roles diferenciados', 'Reportes exportables'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#171411]/10 bg-[#efe7da] p-5 font-black tracking-[-0.03em]">
                <Lock className="h-5 w-5 text-[#7e6bd8]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container rounded-[2rem] bg-[#7e6bd8] p-8 text-[#efe7da] md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">Moderniza tu academia sin perder claridad administrativa.</h2>
            <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#efe7da] hover:text-[#171411]">
              Solicitar demo <ArrowRight className="ml-3 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default AgileAcademyPage;
