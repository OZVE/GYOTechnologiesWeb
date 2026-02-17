import {
    ArrowRight,
    Package,
    Zap,
    LayoutDashboard,
    Smartphone,
    ShieldCheck,
    Globe,
    Server,
    Lock,
    FileText,
    ClipboardList,
    CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import { useState } from 'react';

interface AgileStockPageProps {
    onPageChange: (page: string) => void;
}

const AgileStockPage = ({ onPageChange }: AgileStockPageProps) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const valuePropositions = [
        {
            icon: <LayoutDashboard className="w-6 h-6 text-green-400" />,
            title: "Gestión 360°",
            description: "Centraliza tu negocio: desde la compra de materia prima hasta la venta final al cliente."
        },
        {
            icon: <Globe className="w-6 h-6 text-green-400" />,
            title: "Multi-Empresa",
            description: "Administra múltiples sucursales o negocios con aislamiento total de datos."
        },
        {
            icon: <Zap className="w-6 h-6 text-green-400" />,
            title: "Control en Tiempo Real",
            description: "Dashboard interactivo para tomar decisiones al instante con datos actualizados."
        },
        {
            icon: <Smartphone className="w-6 h-6 text-green-400" />,
            title: "Accesibilidad Total",
            description: "Plataforma 100% web y responsiva. Accede desde tu PC, tablet o celular."
        }
    ];



    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar onPageChange={onPageChange} onContactClick={() => setIsContactModalOpen(true)} />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-900/20" />

                {/* Background Blobs */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
                            <Package size={16} />
                            <span>Gestión de Inventario 2.0</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Gestión de Stock <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Ágil y Eficiente</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                            Optimiza tu inventario, reduce pérdidas y toma decisiones basadas en datos reales. La herramienta definitiva para el comercio moderno.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://agilestock.gyotechnologies.com.ar/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
                            >
                                Ingresar al Sistema
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
                                src="/agilestockbanner.png"
                                alt="GYO Agile Stock Platform Interface"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 bg-black/50">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Todo lo que necesitas para crecer</h2>
                        <p className="text-gray-400 text-lg">
                            Diseñado pensando en la escalabilidad y eficiencia de tu negocio.
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
                                className="bg-gray-900/50 border border-white/5 p-6 rounded-2xl hover:bg-gray-800/50 hover:border-green-500/30 transition-all group"
                            >
                                <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
                    {/* Feature 1: Dashboard */}
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
                                    src="/as-dashboard.png"
                                    alt="Dashboard Interactivo de Agile Stock"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full text-green-400 text-sm font-medium">
                                <LayoutDashboard size={14} />
                                <span>Visión General</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Toma decisiones basadas en datos reales</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Olvídate de las planillas de cálculo. Nuestro dashboard interactivo te muestra la salud financiera y operativa de tu negocio al instante.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Ventas y productos más vendidos.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Proyección de ingresos mensuales.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span>Alertas de stock crítico en tiempo real.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Feature 2: Insumos & Semáforo */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium">
                                <Package size={14} />
                                <span>Stock Inteligente</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Control de insumos con semáforo de stock</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Evita el quiebre de stock y las compras de pánico. El sistema te avisa visualmente qué insumos necesitan reposición inmediata.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Alertas automáticas (Rojo/Amarillo/Verde).</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Cálculo de patrimonio en insumos.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-blue-500" />
                                    <span>Historial de movimientos por ingrediente.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <img
                                src="/as-insumos.png"
                                alt="Listado de Insumos con Alertas"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    {/* Feature 3: Pedidos & Trazabilidad */}
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
                                    src="/as-pedidos.png"
                                    alt="Detalle de Pedido y Trazabilidad"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium">
                                <ClipboardList size={14} />
                                <span>Gestión de Pedidos</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Flujo de pedidos de punta a punta</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Sigue cada pedido desde que ingresa hasta que se entrega. Genera comprobantes profesionales y mantén a tus clientes informados.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Estados personalizables (Pendiente, Preparado, Entregado).</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Generación de PDF con código QR.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-purple-500" />
                                    <span>Descuento automático de stock al confirmar.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Feature 4: Recetas & Costos */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full text-orange-400 text-sm font-medium">
                                <FileText size={14} />
                                <span>Recetas y Costos</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold">Producción exacta, costos precisos</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Define la "receta" de tus productos. Al producir o vender, el sistema descuenta automáticamente las proporciones exactas de materia prima.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-orange-500" />
                                    <span>Cálculo automático de costo por unidad.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-orange-500" />
                                    <span>Análisis de rentabilidad por producto.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle size={18} className="text-orange-500" />
                                    <span>Gestión de producción y stock intermedio.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <img
                                src="/as-receta.png"
                                alt="Detalle de Producto y Receta"
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
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tecnología Robusta y Segura</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                GYO AgileStock está construido sobre una arquitectura moderna diseñada para la velocidad y la seguridad.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <Server className="text-blue-400" />
                                    <span className="font-medium">Python/Flask Core</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Lock className="text-blue-400" />
                                    <span className="font-medium">Encriptación Avanzada</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="text-blue-400" />
                                    <span className="font-medium">Cloud-Ready (Docker)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-blue-400" />
                                    <span className="font-medium">Backups Automáticos</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                            <div className="relative bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <span className="text-gray-400">Status del Sistema</span>
                                        <span className="text-green-400 font-mono">OPERATIVO 100%</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <span className="text-gray-400">Latencia</span>
                                        <span className="text-blue-400 font-mono">24ms</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Seguridad</span>
                                        <span className="text-green-400 font-mono">ENCRIPTADO AES-256</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02]" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para modernizar tu negocio?</h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Únete a cientos de empresas que ya gestionan su inventario de forma inteligente con GYO Agile Stock.
                            </p>
                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Comenzar Prueba Gratuita
                            </button>
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

export default AgileStockPage;
