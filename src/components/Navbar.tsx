import { ArrowRight, GraduationCap, Menu, Package, Wrench, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  onPageChange: (page: string) => void;
  onContactClick?: () => void;
}

const homeLinks = [
  { label: 'Inicio', section: 'hero' },
  { label: 'Proyectos', section: 'projects' },
  { label: 'Diseno', section: 'design' },
  { label: 'Desarrollo', section: 'development' }
];

const toolLinks = [
  { label: 'Agile Stock', page: 'agile-stock', icon: Package, accent: 'text-[#7fa36b]' },
  { label: 'Agile Academy', page: 'agile-academy', icon: GraduationCap, accent: 'text-[#7e6bd8]' }
];

const navTextClass = 'bg-[#efe7da]/72 text-[#171411] shadow-[0_8px_22px_rgba(23,20,17,0.08)]';
const navActiveClass = 'bg-[#171411] text-[#efe7da] shadow-[0_10px_24px_rgba(23,20,17,0.18)]';

const Navbar = ({ onPageChange, onContactClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const sections = homeLinks
      .map((link) => document.getElementById(link.section))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0.15, 0.35, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  const goToHomeSection = (sectionId: string) => {
    onPageChange('home');
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, location.pathname === '/' ? 0 : 180);
  };

  const isToolsActive = location.pathname === '/tools' || location.pathname === '/agile-stock' || location.pathname === '/agile-academy';

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
      return;
    }

    goToHomeSection('contact');
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
      <div className="container">
        <div className="flex items-center justify-between rounded-full border border-[#171411]/12 bg-[#f8f0e3]/72 px-4 py-3 text-[#171411] shadow-2xl shadow-[#171411]/10 backdrop-blur-2xl ring-1 ring-[#efe7da]/45 md:px-5">
          <button type="button" onClick={() => goToHomeSection('hero')} className="flex items-center gap-3" aria-label="Ir al inicio">
            <img src="/gyo-banner.png" alt="GYO Technologies" decoding="async" className="h-8 md:h-10" />
            <span className="hidden text-sm font-black uppercase tracking-[0.22em] text-[#171411] sm:block">GYO</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {homeLinks.map((link) => (
              <button
                type="button"
                key={link.section}
                onClick={() => goToHomeSection(link.section)}
                aria-current={location.pathname === '/' && activeSection === link.section ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#171411] hover:text-[#efe7da] ${location.pathname === '/' && activeSection === link.section ? navActiveClass : navTextClass}`}
              >
                {link.label}
              </button>
            ))}

            <div className="group relative">
              <button
                type="button"
                onClick={() => onPageChange('tools')}
                aria-current={isToolsActive ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[#171411] hover:text-[#efe7da] ${isToolsActive ? navActiveClass : navTextClass}`}
              >
                <Wrench className="h-4 w-4" /> Tools
              </button>
              <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-3xl border border-[#efe7da]/10 bg-[#171411] p-2 shadow-2xl">
                  {toolLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.page}
                        onClick={() => onPageChange(item.page)}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-[#efe7da]/75 transition hover:bg-[#efe7da]/10 hover:text-[#efe7da]"
                      >
                        <Icon className={`h-4 w-4 ${item.accent}`} /> {item.label}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => onPageChange('tools')}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#efe7da]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#efe7da]/75 transition hover:bg-[#efe7da] hover:text-[#171411]"
                  >
                    Ver suite <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={handleContact}
              className="rounded-full bg-[#171411] px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#efe7da] transition hover:bg-[#d75f32] hover:text-[#171411]"
            >
              Contacto
            </button>
          </div>

          <button type="button" onClick={() => setIsMenuOpen((value) => !value)} className="rounded-full p-2 text-[#171411] transition hover:bg-[#171411]/10 lg:hidden" aria-label="Abrir menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300`}>
          <div className="mt-3 rounded-[1.75rem] border border-[#efe7da]/10 bg-[#171411] p-3 text-[#efe7da] shadow-2xl">
            {homeLinks.map((link) => (
              <button
                type="button"
                key={link.section}
                onClick={() => {
                  goToHomeSection(link.section);
                  setIsMenuOpen(false);
                }}
                aria-current={location.pathname === '/' && activeSection === link.section ? 'page' : undefined}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.16em] text-[#efe7da]/75 hover:bg-[#efe7da]/10"
              >
                {link.label}
              </button>
            ))}
            <div className="my-2 h-px bg-[#efe7da]/10" />
            <button
              type="button"
              onClick={() => {
                onPageChange('tools');
                setIsMenuOpen(false);
              }}
              aria-current={isToolsActive ? 'page' : undefined}
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.16em] text-[#efe7da]/75 hover:bg-[#efe7da]/10"
            >
              Tools
            </button>
            {toolLinks.map((item) => (
              <button
                type="button"
                key={item.page}
                onClick={() => {
                  onPageChange(item.page);
                  setIsMenuOpen(false);
                }}
                className="block w-full rounded-2xl px-8 py-3 text-left text-sm font-medium text-[#efe7da]/65 hover:bg-[#efe7da]/10"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                handleContact();
                setIsMenuOpen(false);
              }}
              className="mt-2 block w-full rounded-2xl bg-[#efe7da] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-[#171411]"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
