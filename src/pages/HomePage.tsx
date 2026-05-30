import { ArrowRight, Check, Compass, Layers, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactSection from '../components/ContactSection';
import Navbar from '../components/Navbar';
import CursorOrb from '../components/visual/CursorOrb';
import Noise from '../components/visual/Noise';
import {
  designModules,
  developmentModules,
  featuredProjects,
  lateralPanels,
  methodSteps,
  studioCapabilities,
  studioChips,
  studioPrinciples,
  workLines
} from '../content/studio';
import { getApiUrl } from '../lib/api';
import { useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const sectionReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

function AbstractBoard() {
  return (
    <div data-board className="relative w-full max-w-[620px] rotate-0 lg:rotate-[-2deg]">
      <div data-board-card className="absolute -left-3 top-14 z-20 hidden w-44 rotate-[-8deg] rounded-[2rem] border border-[#171411]/18 bg-[#f8f0e3] p-5 shadow-2xl lg:block">
        <p className="text-xs uppercase tracking-[0.24em] text-[#171411]/45">Brief</p>
        <p className="mt-5 text-2xl font-black leading-none tracking-[-0.04em]">idea sin forma</p>
      </div>

      <div className="rounded-[3rem] border border-[#171411]/16 bg-[#f8f0e3]/75 p-4 shadow-[0_40px_120px_rgba(23,20,17,0.16)] backdrop-blur">
        <div className="grid grid-cols-6 gap-3">
          <div data-board-card className="col-span-6 rounded-[2.2rem] bg-[#171411] p-7 text-[#efe7da]">
            <div className="flex items-start justify-between gap-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#efe7da]/45">GYO ecosystem</p>
              <p className="rounded-full border border-[#efe7da]/15 px-3 py-1 text-xs text-[#efe7da]/60">home → portfolio</p>
            </div>
            <p className="mt-16 max-w-sm text-4xl font-black leading-[0.95] tracking-[-0.05em]">Un sitio para mostrar vision, obra y herramientas.</p>
          </div>

          <div data-board-card data-hoverable className="col-span-3 rounded-[2rem] border border-[#171411]/12 bg-[#d75f32]/20 p-6 transition hover:scale-[1.02]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#171411]/45">Design</p>
            <div className="mt-12 h-24 rounded-full border border-[#171411]/20 bg-[#efe7da]/45" />
            <p className="mt-5 text-lg font-black tracking-[-0.03em]">direccion visual</p>
          </div>

          <div data-board-card data-hoverable className="col-span-3 rounded-[2rem] border border-[#171411]/12 bg-[#7e6bd8]/18 p-6 transition hover:scale-[1.02]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#171411]/45">Develop</p>
            <div className="mt-12 space-y-2">
              <div className="h-3 w-full rounded-full bg-[#171411]/50" />
              <div className="h-3 w-2/3 rounded-full bg-[#171411]/25" />
              <div className="h-3 w-5/6 rounded-full bg-[#171411]/15" />
            </div>
            <p className="mt-8 text-lg font-black tracking-[-0.03em]">arquitectura</p>
          </div>

          <div data-board-card data-hoverable className="col-span-6 rounded-[2rem] border border-[#171411]/12 bg-[#7fa36b]/22 p-6 transition hover:scale-[1.02]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#171411]/45">Tools suite</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Briefs', 'Agentes', 'Dashboards'].map((item) => (
                <div key={item} className="rounded-2xl border border-[#171411]/12 bg-[#f8f0e3]/60 px-4 py-4 text-sm font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-board-card className="absolute -bottom-7 right-7 z-20 hidden w-52 rotate-[5deg] rounded-[2rem] border border-[#171411]/18 bg-[#171411] p-5 text-[#efe7da] shadow-2xl lg:block">
        <p className="text-xs uppercase tracking-[0.24em] text-[#efe7da]/40">Entrega</p>
        <p className="mt-5 text-2xl font-black leading-none tracking-[-0.04em]">sitio completo</p>
      </div>
    </div>
  );
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lateralSectionRef = useRef<HTMLElement>(null);
  const lateralTrackRef = useRef<HTMLDivElement>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [isSendingLead, setIsSendingLead] = useState(false);
  const [leadMessage, setLeadMessage] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleSendLead = async () => {
    setLeadMessage(null);
    setLeadError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
      setLeadError('Ingresa un email valido.');
      return;
    }

    try {
      setIsSendingLead(true);
      const response = await fetch(getApiUrl('/api/lead'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail })
      });

      if (!response.ok) {
        throw new Error('Lead request failed');
      }

      setLeadMessage('Gracias. Te contactamos para ordenar la primera conversacion.');
      setLeadEmail('');
    } catch {
      setLeadError('No pudimos enviar tu email. Intenta nuevamente.');
    } finally {
      setIsSendingLead(false);
    }
  };

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let cleanupCursor: (() => void) | undefined;
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-chip], [data-hero-title], [data-hero-copy], [data-hero-cta], [data-board]', { opacity: 0, y: 34 });
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('[data-hero-chip]', { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 })
        .to('[data-hero-title]', { opacity: 1, y: 0, duration: 1.05 }, '-=0.45')
        .to('[data-hero-copy]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.55')
        .to('[data-hero-cta]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
        .to('[data-board]', { opacity: 1, y: 0, duration: 1.1, rotate: -2 }, '-=0.85');

      gsap.to('[data-orb-one]', { x: 80, y: -40, scale: 1.15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('[data-orb-two]', { x: -70, y: 50, scale: 0.9, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('[data-orb-three]', { x: 60, y: 55, scale: 1.08, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('[data-board-card]', { y: (index) => (index % 2 === 0 ? -12 : 12), duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.22 });
      gsap.to('[data-marquee-track]', { xPercent: -50, ease: 'none', duration: 24, repeat: -1 });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%' }
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-line-card]').forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          y: 70,
          rotate: index % 2 === 0 ? -2 : 2,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%' }
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-capability]').forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          scale: 0.8,
          y: 18,
          rotate: index % 2 === 0 ? -5 : 5,
          duration: 0.65,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: element, start: 'top 90%' }
        });
      });

      if (lateralSectionRef.current && lateralTrackRef.current && window.matchMedia('(min-width: 1024px)').matches) {
        const getScrollAmount = () => Math.max(0, lateralTrackRef.current!.scrollWidth - lateralSectionRef.current!.offsetWidth);

        const horizontalTween = gsap.to(lateralTrackRef.current, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: lateralSectionRef.current,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        gsap.utils.toArray<HTMLElement>('[data-lateral-card]').forEach((element, index) => {
          gsap.from(element, {
            opacity: 0,
            y: 42,
            rotate: index % 2 === 0 ? -2 : 2,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'left 86%',
              horizontal: true,
              containerAnimation: horizontalTween
            }
          });
        });

        gsap.to('[data-lateral-ghost]', {
          xPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: lateralSectionRef.current,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1
          }
        });
      }

      if (cursorRef.current && window.matchMedia('(pointer: fine)').matches) {
        const cursor = cursorRef.current;
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 1 });
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
        const moveCursor = (event: MouseEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        const growCursor = () => gsap.to(cursor, { scale: 2.6, duration: 0.25, ease: 'power2.out' });
        const shrinkCursor = () => gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'power2.out' });
        window.addEventListener('mousemove', moveCursor);
        const hoverables = gsap.utils.toArray<HTMLElement>('a, button, [data-hoverable]');
        hoverables.forEach((element) => {
          element.addEventListener('mouseenter', growCursor);
          element.addEventListener('mouseleave', shrinkCursor);
        });
        cleanupCursor = () => {
          window.removeEventListener('mousemove', moveCursor);
          hoverables.forEach((element) => {
            element.removeEventListener('mouseenter', growCursor);
            element.removeEventListener('mouseleave', shrinkCursor);
          });
        };
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      cleanupCursor?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen overflow-hidden bg-[#efe7da] text-[#171411]">
      <CursorOrb cursorRef={cursorRef} />
      <Navbar onPageChange={onPageChange} />

      <header id="hero" className="relative min-h-screen overflow-hidden px-4 pt-32 md:pt-40">
        <Noise />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(215,95,50,0.18),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(126,107,216,0.16),transparent_30%),radial-gradient(circle_at_65%_88%,rgba(127,163,107,0.18),transparent_30%)]" />
        <div data-orb-one className="absolute left-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[#d75f32]/15 blur-3xl" />
        <div data-orb-two className="absolute right-[-8%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-[#7e6bd8]/14 blur-3xl" />
        <div data-orb-three className="absolute bottom-[-18%] left-[35%] h-[34rem] w-[34rem] rounded-full bg-[#7fa36b]/16 blur-3xl" />
        <div className="container relative z-10 grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-8 flex flex-wrap gap-3">
              {studioChips.map((chip) => (
                <span data-hero-chip key={chip} className="rounded-full border border-[#171411]/15 bg-[#f8f0e3]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#171411]/70">
                  {chip}
                </span>
              ))}
            </div>
            <h1 data-hero-title className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.075em] text-[#171411] md:text-8xl lg:text-9xl">
              Diseno con pulso. Tecnologia con columna.
            </h1>
            <p data-hero-copy className="mt-8 max-w-2xl text-lg leading-8 text-[#171411]/72 md:text-xl">
              GYO es un estudio creativo-tecnologico para empresas que necesitan verse mejor, vender mejor y operar mejor. Disenamos ideas, las convertimos en sistemas y las construimos para soportar uso real.
            </p>
            <div data-hero-cta className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#efe7da] transition hover:bg-[#d75f32]">
                Explorar proyectos <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button onClick={() => onPageChange('tools')} className="inline-flex items-center justify-center rounded-full border border-[#171411]/20 bg-[#f8f0e3]/70 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#171411] transition hover:border-[#171411]">
                Ver tools de GYO
              </button>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <AbstractBoard />
          </motion.div>
        </div>
      </header>

      <section className="overflow-hidden border-y border-[#171411]/10 bg-[#171411] py-6 text-[#efe7da]">
        <div data-marquee-track className="flex w-max gap-6 whitespace-nowrap text-4xl font-black uppercase tracking-[-0.04em] opacity-80 md:text-6xl">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-6">
              <span>Diseno con intencion</span><span>•</span><span>Codigo con criterio</span><span>•</span><span>Tools propias</span><span>•</span><span>Entrega real</span><span>•</span>
            </div>
          ))}
        </div>
      </section>

      <motion.section id="studio" className="px-4 py-24 md:py-32" {...sectionReveal}>
        <div className="container">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Nueva arquitectura</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              Home para vender la vision. Tools y productos para mostrar obra viva.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#171411]/70">
              Adaptamos el brief a las paginas actuales: la Home concentra el manifiesto, proyectos, diseno y desarrollo; Tools mantiene el ecosistema de activos propios; Agile Stock y Agile Academy funcionan como productos destacados.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {studioPrinciples.map((principle, index) => (
              <div key={principle} className="rounded-[1.75rem] border border-[#171411]/10 bg-[#f8f0e3] p-6">
                <div className="mb-10 text-sm font-black text-[#d75f32]">0{index + 1}</div>
                <p className="text-2xl font-black leading-tight tracking-[-0.04em]">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="projects" className="bg-[#171411] px-4 py-24 text-[#efe7da] md:py-32" {...sectionReveal}>
        <div className="container">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7fa36b]">Proyectos actuales</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
                Proyectos que muestran como piensa y construye GYO.
              </h2>
            </div>
            <button onClick={() => onPageChange('tools')} className="inline-flex items-center rounded-full border border-[#efe7da]/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] transition hover:bg-[#efe7da] hover:text-[#171411]">
              Ver suite <ArrowRight className="ml-3 h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <button key={project.title} onClick={() => onPageChange(project.page)} className="group rounded-[2rem] border border-[#efe7da]/12 bg-[#efe7da]/7 p-7 text-left transition hover:-translate-y-1 hover:bg-[#efe7da]/12">
                <div className="mb-8 text-xs font-black uppercase tracking-[0.28em] text-[#7fa36b]">{project.area}</div>
                <h3 className="text-3xl font-black tracking-[-0.04em]">{project.title}</h3>
                <p className="mt-5 leading-7 text-[#efe7da]/70">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#efe7da]/15 px-3 py-1 text-xs text-[#efe7da]/70">{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="design" className="px-4 py-24 md:py-32" {...sectionReveal}>
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#7e6bd8]">Diseno</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              Disenar no es decorar. Es ordenar percepcion, decision y accion.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {designModules.map((module) => (
              <div key={module} className="rounded-[1.5rem] border border-[#171411]/10 bg-[#f8f0e3] p-6">
                <Sparkles className="mb-8 h-5 w-5 text-[#7e6bd8]" />
                <h3 className="text-2xl font-black tracking-[-0.04em]">{module}</h3>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="development" className="px-4 pb-24 md:pb-32" {...sectionReveal}>
        <div className="container rounded-[2.25rem] bg-[#f8f0e3] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Desarrollo</p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
                Implementacion como garantia de realidad.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#171411]/70">
                Webs, ecommerce, agentes de IA, automatizaciones e integraciones construidas con criterio tecnico, calidad y foco en operacion real.
              </p>
            </div>
            <div className="grid gap-3">
              {developmentModules.map((module) => (
                <div key={module} className="flex items-center gap-4 rounded-2xl border border-[#171411]/10 bg-[#efe7da] p-5 text-xl font-black tracking-[-0.03em]">
                  <Check className="h-5 w-5 text-[#7fa36b]" /> {module}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="services" className="px-4 pb-24 md:pb-32" {...sectionReveal}>
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Lineas de trabajo</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              Menos menu de servicios. Mas entradas claras para navegar GYO.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {workLines.map((line) => (
              <div data-line-card data-hoverable key={line.number} className="rounded-[2rem] border border-[#171411]/10 bg-[#f8f0e3] p-7 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-10 flex items-center justify-between text-xs font-black uppercase tracking-[0.25em] text-[#171411]/45">
                  <span>{line.number}</span>
                  <span>{line.label}</span>
                </div>
                <h3 className="text-3xl font-black tracking-[-0.05em]">{line.title}</h3>
                <p className="mt-5 leading-7 text-[#171411]/70">{line.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section ref={lateralSectionRef} className="relative hidden h-screen overflow-hidden border-y border-[#171411]/15 bg-[#efe7da] lg:block">
        <Noise />
        <div className="absolute left-0 top-0 z-10 w-full px-5 py-8 sm:px-8 lg:px-10">
          <div className="container">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Scroll lateral</p>
            <h2 className="mt-5 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.06em] md:text-7xl">
              Una idea no nace terminada. Se desplaza, se organiza y se construye.
            </h2>
          </div>
        </div>

        <div ref={lateralTrackRef} className="flex h-full w-max items-end gap-5 px-5 pb-8 pt-48 sm:px-8 lg:px-10">
          {lateralPanels.map((panel, index) => {
            const isDark = panel.className.includes('text-[#efe7da]');
            return (
              <article key={panel.title} data-lateral-card data-hoverable className={`relative flex h-[62vh] w-[72vw] max-w-[760px] shrink-0 overflow-hidden rounded-[2.8rem] border border-[#171411]/14 p-8 shadow-[0_30px_80px_rgba(23,20,17,0.10)] ${panel.className}`}>
                <p data-lateral-ghost className={`pointer-events-none absolute -right-8 top-10 text-[7rem] font-black leading-none tracking-[-0.08em] opacity-[0.055] md:text-[10rem] ${isDark ? 'text-[#efe7da]' : 'text-[#171411]'}`}>{panel.ghost}</p>
                <div className="relative z-10 flex h-full w-full flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-6">
                    <p className={`text-xs font-black uppercase tracking-[0.24em] ${isDark ? 'text-[#efe7da]/45' : 'text-[#171411]/45'}`}>0{index + 1} / {panel.label}</p>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/20"><ArrowRight className="h-4 w-4" /></span>
                  </div>
                  <div>
                    <h3 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">{panel.title}</h3>
                    <p className={`mt-6 max-w-xl text-lg leading-8 ${isDark ? 'text-[#efe7da]/68' : 'text-[#171411]/66'}`}>{panel.description}</p>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-5">
                    <div className={`h-px ${isDark ? 'bg-[#efe7da]/18' : 'bg-[#171411]/18'}`} />
                    <span className={`text-sm ${isDark ? 'text-[#efe7da]/55' : 'text-[#171411]/45'}`}>Scroll para avanzar</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-24 lg:hidden">
        <div className="container grid gap-5">
          {lateralPanels.map((panel, index) => {
            const isDark = panel.className.includes('text-[#efe7da]');
            return (
              <article key={panel.title} className={`rounded-[2rem] border border-[#171411]/10 p-7 ${panel.className}`}>
                <p className={`text-xs font-black uppercase tracking-[0.24em] ${isDark ? 'text-[#efe7da]/45' : 'text-[#171411]/45'}`}>0{index + 1} / {panel.label}</p>
                <h3 className="mt-10 text-3xl font-black tracking-[-0.05em]">{panel.title}</h3>
                <p className={`mt-4 leading-7 ${isDark ? 'text-[#efe7da]/68' : 'text-[#171411]/66'}`}>{panel.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <motion.section id="technologies" className="px-4 pb-24 md:pb-32" {...sectionReveal}>
        <div className="container">
          <div className="mb-10 flex items-end justify-between gap-8">
            <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              Una mesa de trabajo, no una lista infinita de promesas.
            </h2>
            <Compass className="hidden h-16 w-16 text-[#d75f32] md:block" />
          </div>
          <div className="flex flex-wrap gap-3">
            {studioCapabilities.map((capability) => (
              <span data-capability data-hoverable key={capability} className="rounded-full border border-[#171411]/12 bg-[#f8f0e3] px-5 py-3 text-sm font-bold text-[#171411]/75 transition hover:-translate-y-1 hover:border-[#171411]/35 hover:text-[#171411]">
                {capability}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-[#171411] px-4 py-24 text-[#efe7da] md:py-32" {...sectionReveal}>
        <div className="container">
          <div className="mb-14 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Metodo</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
              El proceso es creativo, pero la entrega no puede depender de inspiracion.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {methodSteps.map((step) => (
              <div key={step.label} className="rounded-[1.75rem] border border-[#efe7da]/12 bg-[#efe7da]/7 p-6">
                <div className="mb-8 font-serif text-4xl italic text-[#d75f32]">{step.label}</div>
                <h3 className="text-2xl font-black tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#efe7da]/65">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="px-4 py-20">
        <div className="container grid gap-8 rounded-[2rem] bg-[#d75f32] p-8 text-[#171411] md:grid-cols-[1fr_0.8fr] md:p-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#171411]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
              <Layers className="h-4 w-4" /> Primera conversacion
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">Ordenemos la idea antes de producir.</h2>
          </div>
          <div className="self-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input type="email" aria-label="Email para contacto" autoComplete="email" value={leadEmail} onChange={(event) => setLeadEmail(event.target.value)} placeholder="tu@email.com" className="min-h-14 flex-1 rounded-full border border-[#171411]/20 bg-[#efe7da] px-5 font-semibold outline-none placeholder:text-[#171411]/45" />
              <button type="button" onClick={handleSendLead} disabled={isSendingLead} className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#171411] px-6 font-black uppercase tracking-[0.18em] text-[#efe7da] disabled:opacity-60">
                <Mail className="mr-2 h-4 w-4" /> {isSendingLead ? 'Enviando' : 'Enviar'}
              </button>
            </div>
            {leadMessage && <p role="status" className="mt-3 text-sm font-bold">{leadMessage}</p>}
            {leadError && <p role="alert" className="mt-3 text-sm font-bold text-[#171411]">{leadError}</p>}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
