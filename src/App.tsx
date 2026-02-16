import {
  Brain,
  Code,
  Database,
  Users,
  LineChart,
  Menu,
  X,
  Linkedin,
  Bot,
  Wrench,
  ArrowRight,
  MessageSquare,
  Package,
  GraduationCap
} from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import ContactSection from './components/ContactSection';
import ToolsPage from './components/ToolsPage';
import PageTransition from './components/PageTransition';
import ContactModal from './components/ContactModal';
import AskPageWidget from './components/AskPageWidget';
import AgileStockPage from './components/AgileStockPage';
import AgileAcademyPage from './components/AgileAcademyPage';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadMessage, setLeadMessage] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll suave con offset dinámico según altura del navbar fijo
  const smoothScrollTo = (selector: string | Element, extraOffset: number = 0) => {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    const nav = document.querySelector('nav') as HTMLElement | null;
    let fixedHeaderHeight = 0;
    if (nav) {
      const navStyle = window.getComputedStyle(nav);
      if (navStyle.position === 'fixed') {
        fixedHeaderHeight = nav.offsetHeight;
      }
    }
    const offset = fixedHeaderHeight + extraOffset;
    const rect = (el as Element).getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top - offset;
    window.scrollTo({ top: absoluteY, behavior: 'smooth' });
  };

  // Sincronizar URL con currentPage
  useEffect(() => {
    switch (location.pathname) {
      case '/tools':
        setCurrentPage('tools');
        break;
      case '/agile-stock':
        setCurrentPage('agile-stock');
        break;
      case '/agile-academy':
        setCurrentPage('agile-academy');
        break;
      default:
        setCurrentPage('home');
        break;
    }
  }, [location.pathname]);

  // Mostrar botón "volver al inicio" cuando el header/nav ya no está visible
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        setShowBackToTop(rect.bottom < 0);
      } else {
        setShowBackToTop(window.scrollY > 200);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para cambiar página (actualizar tanto state como URL)
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    switch (page) {
      case 'tools':
        navigate('/tools');
        break;
      case 'agile-stock':
        navigate('/agile-stock');
        break;
      case 'agile-academy':
        navigate('/agile-academy');
        break;
      default:
        navigate('/');
        break;
    }
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSendLead = async () => {
    setLeadMessage(null);
    setLeadError(null);
    if (!isValidEmail(leadEmail)) {
      setLeadError('Ingresá un email válido');
      return;
    }
    try {
      setIsSendingLead(true);
      const isDevelopment = window.location.hostname === 'localhost';
      const baseUrl = isDevelopment
        ? '/api/lead'
        : 'https://gyotechnologiesweb.onrender.com/api/lead';
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail })
      });
      if (!response.ok) {
        throw new Error('Error de envío');
      }
      setLeadMessage('¡Gracias! Nuestro equipo se contactará pronto.');
      setLeadEmail('');
    } catch (error) {
      setLeadError('No pudimos enviar tu email. Intenta nuevamente.');
    } finally {
      setIsSendingLead(false);
    }
  };

  const services = [
    {
      icon: <Bot className="w-full h-full text-[#252525]" />,
      title: "AI Agents",
      description: "Agentes de inteligencia artificial que automatizan tareas y optimizan procesos empresariales. Creamos MCP clients personalizados.",
      features: [
        "Desarrollo de MCP clients personalizados para tu negocio",
        "Automatización inteligente de tareas repetitivas",
        "Optimización de procesos con análisis predictivo",
        "Agentes personalizados para cada necesidad empresarial"
      ]
    },
    {
      icon: <Brain className="w-full h-full text-[#252525]" />,
      title: "AI-Driven Development",
      description: "Desarrollo de software potenciado con inteligencia artificial para crear soluciones más rápidas y eficientes.",
      features: [
        "Generación automatizada de código con modelos de IA",
        "Análisis predictivo para optimizar arquitecturas",
        "Testing automatizado y detección de errores con ML"
      ]
    },
    {
      icon: <Users className="w-full h-full text-[#252525]" />,
      title: "AI-Adoption Consultant for Business",
      description: "Asesoramiento especializado para la adopción e implementación de IA en empresas.",
      features: [
        "Evaluación de necesidades de IA para tu negocio",
        "Roadmap de implementación personalizado",
        "Capacitación y acompañamiento en la transición"
      ]
    }
  ];

  const technologies = [
    {
      icon: <Brain className="text-[#252525]" />,
      name: "Inteligencia Artificial",
      description: "TensorFlow, PyTorch, OpenAI, Anthropic Claude, LangChain, Custom AI Models, RAG, MCP Clients"
    },
    {
      icon: <Code className="text-[#252525]" />,
      name: "Desarrollo Web",
      description: "React, TypeScript, Next.js, Node.js, Python, Django, FastAPI, Tailwind CSS"
    },
    {
      icon: <Database className="text-[#252525]" />,
      name: "Infraestructura & CMS",
      description: "PostgreSQL, MongoDB, Redis, Supabase, WordPress, Webflow, Strapi, Contentful"
    }
  ];



  return (
    <div className="min-h-screen bg-black">
      <PageTransition currentPage={currentPage}>
        {currentPage === 'home' ? (
          <>
            {/* Hero Section */}
            <header className="relative min-h-screen flex items-center text-white overflow-hidden">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
              <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10"></div>

              {/* Navigation */}
              <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="fixed md:absolute top-0 left-0 right-0 p-4 md:p-6 z-50 bg-black/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
              >
                {/* Mobile Navigation */}
                <div className="md:hidden w-full px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/gyo-banner2.png" alt="GYO Technologies" className="h-8" />
                      <span className="text-sm font-bold">GYO TECHNOLOGIES</span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 hover:bg-[#222] rounded-lg transition-all"
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                  <div
                    className={`${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden transition-all duration-300 ease-in-out`}
                  >
                    <div className="flex flex-col gap-2 mt-4 bg-black/80 rounded-lg p-4 border border-gray-700">
                      <a
                        href="#hero"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange('home');
                          // header está por debajo de la barra; desplazamos sin tapar
                          smoothScrollTo('header', 8);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-3 text-sm font-medium hover:bg-gray-700 rounded-lg transition-all text-center text-white"
                      >
                        Inicio
                      </a>
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange('home');
                          smoothScrollTo('#services', 12);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-3 text-sm font-medium hover:bg-gray-700 rounded-lg transition-all text-center text-white"
                      >
                        Servicios
                      </a>
                      <a
                        href="#technologies"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange('home');
                          smoothScrollTo('#technologies', 12);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-3 text-sm font-medium hover:bg-gray-700 rounded-lg transition-all text-center text-white"
                      >
                        Tecnologías
                      </a>

                      <button
                        onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                        className="w-full px-4 py-3 text-sm font-medium hover:bg-gray-700 rounded-lg transition-all text-center flex items-center justify-center gap-2 text-white"
                      >
                        <Wrench size={16} />
                        Tools
                        <ArrowRight size={16} className={`transition-transform duration-300 ${isToolsDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isToolsDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-1 pl-4 mt-1 border-l border-gray-700 ml-4">
                          <button
                            onClick={() => {
                              handlePageChange('agile-stock');
                              setIsMenuOpen(false);
                            }}
                            className="text-left py-2 px-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          >
                            GYO Agile Stock
                          </button>
                          <button
                            onClick={() => {
                              handlePageChange('agile-academy');
                              setIsMenuOpen(false);
                            }}
                            className="text-left py-2 px-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                          >
                            GYO Agile Academy
                          </button>
                          <button
                            onClick={() => {
                              handlePageChange('tools');
                              setIsMenuOpen(false);
                            }}
                            className="text-left py-2 px-2 text-sm text-green-400 hover:text-green-300 hover:bg-white/5 rounded transition-colors"
                          >
                            Ver Todo
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          // First navigate to home page if not already there
                          handlePageChange('home');
                          // Then scroll to contact section after a small delay to ensure page change is complete
                          setTimeout(() => smoothScrollTo('#contact', 8), 100);
                          setIsMenuOpen(false);
                        }}
                        className="group px-4 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        <span>FREE Demo Try</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block w-full px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src="/gyo-banner.png" alt="GYO Technologies" className="h-12" />
                      <span className="text-xl text-transparent font-boldgit aad bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">GYO TECHNOLOGIES</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <a
                          href="#hero"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            smoothScrollTo('header', 8);
                          }}
                          className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                        >
                          Inicio
                        </a>
                        <a
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            smoothScrollTo('#services', 12);
                          }}
                          className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                        >
                          Servicios
                        </a>
                        <a
                          href="#technologies"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            smoothScrollTo('#technologies', 12);
                          }}
                          className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all"
                        >
                          Tecnologías
                        </a>

                        <div className="relative group/dropdown">
                          <button
                            className="px-4 py-2 text-sm font-medium hover:bg-[#222] rounded-full transition-all flex items-center gap-2"
                            onMouseEnter={() => setIsToolsDropdownOpen(true)}
                            onClick={() => handlePageChange('tools')}
                          >
                            <Wrench size={16} />
                            Tools
                          </button>

                          {/* Dropdown Menu */}
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200"
                          >
                            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 overflow-hidden">
                              <button
                                onClick={() => handlePageChange('agile-stock')}
                                className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 group/item"
                              >
                                <div className="p-1.5 bg-green-500/10 rounded-lg group-hover/item:bg-green-500/20 text-green-400 transition-colors">
                                  <Package size={14} />
                                </div>
                                <span className="font-medium">Agile Stock</span>
                              </button>

                              <button
                                onClick={() => handlePageChange('agile-academy')}
                                className="text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 group/item"
                              >
                                <div className="p-1.5 bg-purple-500/10 rounded-lg group-hover/item:bg-purple-500/20 text-purple-400 transition-colors">
                                  <GraduationCap size={14} />
                                </div>
                                <span className="font-medium">Agile Academy</span>
                              </button>

                              <div className="h-px bg-white/10 my-1" />

                              <button
                                onClick={() => handlePageChange('tools')}
                                className="text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-center"
                              >
                                Ver Todo
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            // First navigate to home page if not already there
                            handlePageChange('home');
                            // Then scroll to contact section after a small delay to ensure page change is complete
                            setTimeout(() => smoothScrollTo('#contact', 8), 100);
                          }}
                          className="group px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                          <span>FREE Demo Try</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.nav>

              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="container mx-auto px-4 relative z-10"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="font-inter text-3xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-6 md:mb-8 leading-tight">
                      <span className="block whitespace-pre-line">TRANSFORMAMOS<br />
                        TU VISIÓN EN<br />
                        SOFTWARE<br />
                        INTELIGENTE</span>
                    </h1>
                    <p className="text-base md:text-xl mb-8 md:mb-12 text-gray-300 max-w-xl mx-auto md:mx-0">
                      Desarrollo ágil con IA y experiencia humana para crear soluciones digitales excepcionales
                    </p>
                    <div className="mb-8 flex flex-col items-center md:items-start">
                      <div className="flex w-full max-w-xl justify-center md:justify-start gap-3">
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendLead();
                            }
                          }}
                          placeholder="Tu email"
                          className="w-64 md:w-80 h-14 px-5 rounded-full border border-purple-600/60 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        />
                        <button
                          onClick={handleSendLead}
                          onMouseEnter={() => setIsButtonHovered(true)}
                          onMouseLeave={() => setIsButtonHovered(false)}
                          disabled={isSendingLead}
                          className="px-8 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold border-2 border-purple-600 hover:from-purple-700 hover:to-blue-700 hover:border-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all flex items-center gap-2 justify-center disabled:opacity-60"
                        >
                          {isSendingLead ? 'Enviando…' : (isButtonHovered ? 'Tu proyecto te espera' : 'Innovemos')} <ArrowRight size={20} />
                        </button>
                      </div>
                      {leadMessage && <span className="text-green-400 text-sm mt-2">{leadMessage}</span>}
                      {leadError && <span className="text-red-400 text-sm mt-2">{leadError}</span>}

                      {/* Subtítulo con enlace a Servicios */}
                      <div className="mt-4 text-sm text-gray-300">
                        <span>¿Aún no estás listo para comenzar?</span>
                        <a
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            // Asegura estar en home y luego hace scroll a servicios
                            handlePageChange('home');
                            setTimeout(() => smoothScrollTo('#services', 12), 100);
                          }}
                          className="ml-2 underline underline-offset-4 decoration-gray-500/60 hover:text-purple-400 hover:decoration-purple-400 transition-colors"
                        >
                          Conoce más
                        </a>
                      </div>
                    </div>


                  </div>
                  <div className="hidden md:block md:w-1/2">
                    <img
                      src="/gyo-banner2.png"
                      alt="GYO Technologies"
                      className="w-4/5 ml-auto object-contain animate-float"
                    />
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Hidden SEO Text for Search Engines */}
            <div className="sr-only">
              <h1>GYO Technologies - Agentes de IA, Bots de IA, Desarrollo Web Inteligente</h1>
              <h2>Especialistas en Agentes de IA y Bots de IA</h2>
              <h3>MCP Clients y Desarrollo Web con Inteligencia Artificial</h3>
              <p>GYO Technologies es líder en el desarrollo de agentes de IA personalizados, bots de IA y soluciones de inteligencia artificial para empresas. Nuestros servicios incluyen agentes de IA, bots de IA, MCP clients y desarrollo web inteligente.</p>
              <p>Somos expertos en GYO Technologies, GYOtechnologies, agentes de IA, bots de IA, inteligencia artificial, desarrollo web, MCP clients, consultoría IT y software inteligente.</p>
              <p>Desarrollo de agentes de IA personalizados, bots de IA para automatización, MCP clients para integración de sistemas, y soluciones de inteligencia artificial empresarial.</p>
            </div>

            {/* Global Presence Cards - Full Width */}
            <div className="w-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 px-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇦🇷</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Buenos Aires</p>
                    <p className="text-xs text-gray-400 truncate">Argentina</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇨🇱</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Santiago</p>
                    <p className="text-xs text-gray-400 truncate">Chile</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇪🇨</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Quito</p>
                    <p className="text-xs text-gray-400 truncate">Ecuador</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇵🇪</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Lima</p>
                    <p className="text-xs text-gray-400 truncate">Perú</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇪🇸</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Ibiza</p>
                    <p className="text-xs text-gray-400 truncate">España</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <span className="text-base sm:text-lg text-white">🇨🇦</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">Montreal</p>
                    <p className="text-xs text-gray-400 truncate">Canadá</p>
                  </div>
                </div>
              </div>
            </div>

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
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight">
                    Potenciando el futuro con IA y experiencia humana
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 rounded-2xl hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700 transition-all border">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Brain className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">IA Avanzada</h3>
                      <p className="text-gray-300">Soluciones impulsadas por los últimos avances en inteligencia artificial</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Users className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Experiencia Humana</h3>
                      <p className="text-gray-300">Equipo de expertos supervisando cada proyecto</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <MessageSquare className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Comunicación Clara</h3>
                      <p className="text-gray-300">Proceso transparente y comunicación constante</p>
                    </div>
                  </div>
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => {
                        handlePageChange('home');
                        setTimeout(() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
                    >
                      <span>FREE Demo Try</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="services"
              className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
            >
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight">
                    Nuestros Servicios
                  </h2>
                  <p className="text-xl text-gray-300">
                    Tres servicios especializados en IA: desde automatización con agentes hasta consultoría de adopción empresarial
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {services.map((service, index) => (
                    <div key={index} className="border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-2xl hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700 transition-all border group relative">
                      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{service.title}</h3>
                      <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">{service.description}</p>
                      <ul className="space-y-2 md:space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => {
                      handlePageChange('home');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
                  >
                    <span>FREE Demo Try</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Technologies Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="technologies"
              className="py-20 bg-gradient-to-r from-gray-900 to-gray-800"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight py-2">
                    Tecnologías y Herramientas
                  </h2>
                  <p className="text-xl text-gray-300">
                    Dominamos las últimas tecnologías para crear soluciones modernas y escalables
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {technologies.map((tech, index) => (
                    <div key={index} className={`${index === 0 ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20' : 'bg-gradient-to-br from-gray-900 to-gray-800'} p-6 rounded-2xl hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700 transition-all border ${index === 0 ? 'border-purple-500' : 'border-gray-700 hover:border-purple-500'}`}>
                      <div className="w-12 h-12 mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                        {tech.icon}
                      </div>
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 ${index === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400' : 'text-white'}`}>{tech.name}</h3>
                      <p className="text-gray-300 text-sm md:text-base">{tech.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => {
                      handlePageChange('home');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
                  >
                    <span>FREE Demo Try</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.section>

            {/* AI Agents Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="ai-agents"
              className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight py-2">
                    ¿Qué son los AI Agents?
                  </h2>
                  <p className="text-lg text-gray-300 mb-12">
                    GYO Agents son programas de IA que automatizan tareas. Optimizan procesos, liberando tu tiempo valioso.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Automatiza <span className="font-normal text-white">tareas</span></h3>
                      <p className="text-gray-300 text-sm md:text-base">Nuestros agentes aumentan la productividad en un 30%.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Optimiza <span className="font-normal text-white">procesos</span></h3>
                      <p className="text-gray-300 text-sm md:text-base">Reducen costos operativos en un 20%.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Libera tu <span className="font-normal text-white">tiempo</span></h3>
                      <p className="text-gray-300 text-sm md:text-base">Enfócate en el crecimiento estratégico de tu negocio.</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.section>

            {/* Benefits Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight">
                    Beneficios Clave para tu negocio
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start gap-3 md:gap-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 md:w-6 md:h-6 text-[#252525]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 2a2 2 0 012 2v2h-4V4a2 2 0 012-2zm6 6V4a6 6 0 00-12 0v4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 8a2 2 0 110-4 2 2 0 010 4z' /></svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Automatización de tareas</h3>
                        <p className="text-gray-300 text-sm md:text-base">Libera a tu equipo de tareas repetitivas. La automatización de facturación reduce errores en un 15%.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:gap-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 md:w-6 md:h-6 text-[#252525]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3v18h18M3 9h18M9 21V3' /></svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Optimización de procesos</h3>
                        <p className="text-gray-300 text-sm md:text-base">Identifica cuellos de botella y mejora la eficiencia. Optimización de cadena de suministro baja los costos un 10%.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:gap-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 md:w-6 md:h-6 text-[#252525]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2zm0 0a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2' /></svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Toma de decisiones inteligentes</h3>
                        <p className="text-gray-300 text-sm md:text-base">Obtén insights valiosos de tus datos. El análisis de datos de ventas aumenta la conversión en un 8%.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:gap-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 md:w-6 md:h-6 text-[#252525]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0a2 2 0 100 4 2 2 0 000-4z' /></svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-1">Mejora la experiencia del cliente</h3>
                        <p className="text-gray-300 text-sm md:text-base">Ofrece servicio personalizado 24/7. Los chatbots de IA resuelven el 80% de las consultas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CTA dentro de la sección para mantener el fondo */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => smoothScrollTo('#contact', 8)}
                  className="group px-6 h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold border-2 border-purple-600 hover:from-purple-700 hover:to-blue-700 hover:border-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all flex items-center gap-2 justify-center"
                >
                  <span>FREE Demo Try</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.section>

            {/* AI-Driven Development Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="ai-driven"
              className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight">
                    AI-Driven Development
                  </h2>
                  <p className="text-lg text-gray-300 mb-12">
                    Desarrollo de software potenciado con inteligencia artificial para crear soluciones más rápidas y eficientes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Brain className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Generación Automatizada</h3>
                      <p className="text-gray-300 text-sm md:text-base">Código generado automáticamente con modelos de IA avanzados, reduciendo tiempo de desarrollo en un 60%.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Code className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Análisis Predictivo</h3>
                      <p className="text-gray-300 text-sm md:text-base">Optimización de arquitecturas y detección temprana de problemas con análisis de código inteligente.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Wrench className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Testing Inteligente</h3>
                      <p className="text-gray-300 text-sm md:text-base">Testing automatizado y detección de errores con machine learning, garantizando calidad superior.</p>
                    </div>
                  </div>
                  <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4">¿Por qué AI-Driven Development?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Velocidad</h4>
                        <p className="text-gray-300">Desarrollo 3x más rápido con generación automática de código y componentes reutilizables.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Calidad</h4>
                        <p className="text-gray-300">Código optimizado y libre de errores gracias al análisis predictivo y testing automatizado.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Escalabilidad</h4>
                        <p className="text-gray-300">Arquitecturas diseñadas para crecer con tu negocio, adaptándose a nuevas necesidades.</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Innovación</h4>
                        <p className="text-gray-300">Implementación de las últimas tecnologías y patrones de desarrollo con IA.</p>
                      </div>
                    </div>
                  </div>
                  {/* CTA dentro del bloque "¿Por qué AI-Driven Development?" */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => smoothScrollTo('#contact', 8)}
                      className="group px-6 h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold border-2 border-purple-600 hover:from-purple-700 hover:to-blue-700 hover:border-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all flex items-center gap-2 justify-center"
                    >
                      <span>FREE Demo Try</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* AI-Adoption Consultant Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="ai-adoption"
              className="py-20 bg-gradient-to-r from-gray-900 to-gray-800"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight">
                    AI-Adoption Consultant for Business
                  </h2>
                  <p className="text-lg text-gray-300 mb-12">
                    Asesoramiento especializado para la adopción e implementación de IA en empresas, maximizando el retorno de inversión.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <Users className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Evaluación Estratégica</h3>
                      <p className="text-gray-300">Análisis completo de tu negocio para identificar oportunidades de implementación de IA con mayor impacto.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <LineChart className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Roadmap Personalizado</h3>
                      <p className="text-gray-300">Plan de implementación paso a paso adaptado a tus necesidades, presupuesto y cronograma específico.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center">
                        <MessageSquare className="text-[#252525]" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-2">Capacitación Continua</h3>
                      <p className="text-gray-300">Acompañamiento y formación para tu equipo durante toda la transición hacia la IA.</p>
                    </div>
                  </div>
                  <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4">Nuestro Proceso de Consultoría</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-[#252525] font-bold">1</span>
                        </div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Diagnóstico</h4>
                        <p className="text-gray-300 text-sm">Evaluación completa de procesos y oportunidades de IA</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-[#252525] font-bold">2</span>
                        </div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Estrategia</h4>
                        <p className="text-gray-300 text-sm">Definición de objetivos y roadmap de implementación</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-[#252525] font-bold">3</span>
                        </div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Implementación</h4>
                        <p className="text-gray-300 text-sm">Desarrollo y despliegue de soluciones de IA</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-[#252525] font-bold">4</span>
                        </div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">Optimización</h4>
                        <p className="text-gray-300 text-sm">Monitoreo, ajustes y mejora continua</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-2xl border border-purple-500/30">
                    <h4 className="text-xl font-bold text-white mb-3">Resultados Esperados</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">40%</div>
                        <div className="text-gray-300 text-sm">Reducción en costos operativos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">3x</div>
                        <div className="text-gray-300 text-sm">Mayor eficiencia en procesos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400 mb-1">6 meses</div>
                        <div className="text-gray-300 text-sm">Tiempo promedio de implementación</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CTA dentro de la sección para mantener el fondo */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => smoothScrollTo('#contact', 8)}
                  className="group px-6 h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold border-2 border-purple-600 hover:from-purple-700 hover:to-blue-700 hover:border-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all flex items-center gap-2 justify-center"
                >
                  <span>FREE Demo Try</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.section>

            {/* Why Choose GYO Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="py-20 bg-gradient-to-r from-gray-900 to-gray-800"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight py-2">
                    ¿Por qué elegir GYO Technologies?
                  </h2>
                  <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                    Somos expertos en transformar empresas con inteligencia artificial. Nuestra experiencia, metodología probada y resultados medibles nos distinguen en el mercado.
                  </p>

                  {/* Métricas Principales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">50+</div>
                      <div className="text-gray-300">Proyectos Exitosos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">200%</div>
                      <div className="text-gray-300">Eficiencia Aumentada</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">24/7</div>
                      <div className="text-gray-300">Soporte Técnico</div>
                    </div>
                  </div>

                  {/* Razones Principales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Brain className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Experiencia Especializada en IA</h3>
                      <p className="text-gray-300 mb-4 text-sm md:text-base">Más de 5 años aplicando IA. Conocemos los desafíos únicos de las empresas medianas y pequeñas.</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Especialización en automatización y transformación digital</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Metodologías probadas</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Casos de éxito documentados</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Soluciones 100% Personalizadas</h3>
                      <p className="text-gray-300 mb-4 text-sm md:text-base">Cada proyecto es único. Adaptamos nuestras soluciones a tus necesidades específicas, presupuesto y cronograma.</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Análisis personalizado</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Desarrollo a medida</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Integración con sistemas existentes</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare className="text-[#252525]" size={24} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Soporte Especializado Continuo</h3>
                      <p className="text-gray-300 mb-4 text-sm md:text-base">No solo desarrollamos, acompañamos. Soporte técnico 24/7 y capacitación continua para tu equipo.</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Soporte técnico 24/7</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Capacitación del equipo</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Monitoreo y optimización</span>
                        </li>
                      </ul>
                    </div>


                  </div>


                </div>
              </div>
              {/* CTA dentro de la sección para mantener el fondo */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => smoothScrollTo('#contact', 8)}
                  className="group px-6 h-11 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold border-2 border-purple-600 hover:from-purple-700 hover:to-blue-700 hover:border-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all flex items-center gap-2 justify-center"
                >
                  <span>FREE Demo Try</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.section>



            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              id="contact"
              className="pt-10 md:pt-12 pb-20 bg-gradient-to-r from-gray-900 to-gray-800"
            >
              <ContactSection />
            </motion.section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 border-t border-gray-700">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img src="/gyo-banner.png" alt="GYO Technologies" className="h-8" />
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">GYO</h3>
                    </div>
                    <p className="text-gray-300">Transformando el futuro con tecnología inteligente</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-white">Servicios</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <a
                          href="#ai-agents"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            setTimeout(() => smoothScrollTo('#ai-agents', 8), 50);
                          }}
                          className="hover:text-purple-400 transition-colors"
                        >
                          AI Agents
                        </a>
                      </li>
                      <li>
                        <a
                          href="#ai-driven"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            setTimeout(() => smoothScrollTo('#ai-driven', 8), 50);
                          }}
                          className="hover:text-purple-400 transition-colors"
                        >
                          AI-Driven Development
                        </a>
                      </li>
                      <li>
                        <a
                          href="#ai-adoption"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            setTimeout(() => smoothScrollTo('#ai-adoption', 8), 50);
                          }}
                          className="hover:text-purple-400 transition-colors"
                        >
                          AI-Adoption Consultant
                        </a>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange('home');
                            setTimeout(() => smoothScrollTo('#contact', 8), 50);
                          }}
                          className="hover:text-purple-400 transition-colors"
                        >
                          Custom App Development
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-white">Compañía</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="hover:text-purple-400 transition-colors">Sobre Nosotros</li>
                      <li className="hover:text-purple-400 transition-colors">Blog</li>
                      <li className="hover:text-purple-400 transition-colors">Carreras</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4 text-white">Contacto</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>
                        <a
                          href="https://www.linkedin.com/company/gyo-technologies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                        >
                          <Linkedin size={18} />
                          <span>LinkedIn</span>
                        </a>
                      </li>
                      <li className="hover:text-purple-400 transition-colors">info@gyotechnologies.com.ar</li>
                      <li className="hover:text-purple-400 transition-colors">+54 9 11 3948 6971</li>
                      <li className="hover:text-purple-400 transition-colors">Ciudad Autónoma de Buenos Aires, Argentina</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center">
                  <p className="text-gray-400">© {new Date().getFullYear()} GYO Technologies. Todos los derechos reservados.</p>
                </div>
              </div>
            </footer>
          </>
        ) : currentPage === 'tools' ? (
          <ToolsPage onPageChange={handlePageChange} />
        ) : currentPage === 'agile-stock' ? (
          <AgileStockPage onPageChange={handlePageChange} />
        ) : currentPage === 'agile-academy' ? (
          <AgileAcademyPage onPageChange={handlePageChange} />
        ) : (
          <div />
        )}
      </PageTransition>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Ask Page Widget */}
      <AskPageWidget />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/541139486971?text=Hola%20GYO%20Technologies%2C%20quiero%20hablar%20con%20ustedes"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 hover:ring-4 ring-[#25D366]/40"
      >
        <img src="/whatsapp.png" alt="WhatsApp" className="w-16 h-16 select-none" />
      </a>

      {/* Botón volver al inicio */}
      {
        showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver al inicio"
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white text-black shadow-2xl border border-white/20 flex items-center justify-center hover:bg-gray-100 hover:shadow-purple-500/20 transition-all"
          >
            <ArrowUp size={18} />
          </button>
        )
      }
    </div >
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;