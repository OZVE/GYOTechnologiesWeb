import {
    ArrowRight,
    GraduationCap,
    LayoutDashboard,
    DollarSign,
    ShieldCheck,
    Server,
    Lock,
    Globe,
    CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import { useState } from 'react';

interface AgileAcademyPageProps {
    onPageChange: (page: string) => void;
}

const AgileAcademyPage = ({ onPageChange }: AgileAcademyPageProps) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const valuePropositions = [
        {
            icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
            title: "Gestión Académica",
            description: "Expedientes digitales, asistencia y calificaciones en un solo lugar."
        },
        {
            icon: <DollarSign className="w-6 h-6 text-purple-400" />,
            title: "Control Financiero",
            description: "Control de pagos, deudas y flujo de caja para evitar fugas de dinero."
        },
        {
            icon: <LayoutDashboard className="w-6 h-6 text-purple-400" />,
            title: "Reportes Inteligentes",
            description: "Tableros de control y reportes exportables para tomar mejores decisiones."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
            title: "Seguridad Total",
            description: "Roles de usuario diferenciados y acceso seguro desde la nube 24/7."
        }
    ];



    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20" />

                {/* Background Blobs */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-500 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
                            <GraduationCap size={16} />
                            <span>Gestión Educativa Integral</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Control total de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Academia</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                            Desde la asistencia hasta las finanzas. La plataforma integral para modernizar y simplificar la gestión educativa.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://academy.gyotechnologies.com.ar/auth/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
                            >
                                Ir al Campus
                                <ArrowRight size={20} />
                            </a>
                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
                            >
                                Solicitar Demo
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/aa-dashboard.png"
                                alt="Plataforma de Gestión Académica"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 bg-black/50">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Enseña sin límites</h2>
                        <p className="text-gray-400 text-lg">
                            La plataforma que se adapta a tu metodología de enseñanza.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valuePropositions.map((prop, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-900/50 border border-white/5 p-6 rounded-2xl hover:bg-gray-800/50 hover:border-purple-500/30 transition-all group"
                            >
                                <div className="bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {prop.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{prop.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Blocks with Screenshots */}
            <section className="py-24 px-4 bg-black">
                <div className="container mx-auto space-y-32">
                    {/* Feature 1: Visión General */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 lg:order-1">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                <img
                                    src="/aa-dashboard.png"
                                    alt="Dashboard Académico"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium">
                                <LayoutDashboard size={14} />
                                <span>Visión General</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Todo lo que pasa en tu academia</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Un panel de control centralizado para que no pierdas detalle. Visualiza inscripciones, asistencia y pagos del día en un solo vistazo.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Resumen diario de actividad.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Alertas de tareas pendientes.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Indicadores clave de rendimiento (KPIs).</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Feature 2: Gestión de Alumnos */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 rounded-full text-pink-400 text-sm font-medium">
                                <GraduationCap size={14} />
                                <span>Gestión de Alumnos</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Expedientes digitales completos</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Olvídate de los archivos de papel. Accede a la información completa de tus alumnos, su historial académico y administrativo al instante.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-pink-500" />
                                    <span>Datos personales y de contacto.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-pink-500" />
                                    <span>Historial de cursos y calificaciones.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-pink-500" />
                                    <span>Documentación digitalizada.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <img
                                src="/aa-alumnos.png"
                                alt="Gestión de Alumnos"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Feature 3: Control Financiero */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="order-2 lg:order-1">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                <img
                                    src="/aa-finanzas.png"
                                    alt="Control Financiero"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full text-green-400 text-sm font-medium">
                                <DollarSign size={14} />
                                <span>Finanzas Sanas</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Control total de la tesorería</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Automatiza el control de cuotas y detecta pagos atrasados automáticamente. Mantén el flujo de caja de tu academia siempre claro.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Seguimiento de cuotas y matrículas.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Detección automática de morosos.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Gestión de gastos y proveedores.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Feature 4: Reportes y Resultados */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium">
                                <ShieldCheck size={14} />
                                <span>Reportes Inteligentes</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Información para crecer</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Toma decisiones basadas en datos, no en intuición. Genera reportes detallados para entender el rendimiento de tu negocio.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Reportes de ingresos y egresos.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Listados de asistencia y calificaciones.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Exportación a Excel y PDF.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <img
                                src="/aa-reportes.png"
                                alt="Reportes y Estadísticas"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technical Specs */}
            <section className="py-24 px-4 bg-gray-900/30 border-y border-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tecnología de Vanguardia</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Academy Management System utiliza un stack tecnológico moderno para garantizar estabilidad y seguridad.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <Server className="text-purple-400" />
                                    <span className="font-medium">Python/Flask Backend</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Lock className="text-purple-400" />
                                    <span className="font-medium">Seguridad SSL/TLS</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="text-purple-400" />
                                    <span className="font-medium">Cloud Native</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-purple-400" />
                                    <span className="font-medium">Protección de Datos</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full" />
                            <div className="relative bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <span className="text-gray-400">Disponibilidad</span>
                                        <span className="text-green-400 font-mono">99.99%</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <span className="text-gray-400">Base de Datos</span>
                                        <span className="text-purple-400 font-mono">MySQL / PostgreSQL</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Framework</span>
                                        <span className="text-blue-400 font-mono">Bootstrap 5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial / Social Proof */}
            <section className="py-24 px-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-purple-900/5" />
                <div className="container mx-auto relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-5xl md:text-6xl text-purple-500/20 mb-6">"</div>
                        <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-snug">
                            Hemos logrado escalar nuestra academia de 100 a 5,000 alumnos sin aumentar nuestra carga administrativa gracias a GYO Agile Academy.
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white">
                                JS
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white">Juan Silva</div>
                                <div className="text-purple-400 text-sm">Director, TechEdu Latam</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02]" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza tu academia hoy</h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Lleva tu institución educativa al siguiente nivel con la plataforma líder en el mercado.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    Solicitar Demo
                                </button>
                                <a
                                    href="https://academy.gyotechnologies.com.ar/auth/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-transparent border border-white text-white hover:bg-white/10 rounded-full font-bold transition-all"
                                >
                                    Acceso Clientes
                                </a>
                            </div>
                        </div>
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

export default AgileAcademyPage;
