import { ArrowUpRight, Linkedin } from 'lucide-react';

const footerColumns = [
  {
    title: 'Estudio',
    items: ['Direccion creativa', 'Diseno web', 'UX/UI', 'Contenido comercial']
  },
  {
    title: 'Tecnologia',
    items: ['Desarrollo web', 'Ecommerce', 'Automatizaciones', 'Agentes de IA']
  },
  {
    title: 'Tools',
    items: ['GYO Agile Stock', 'GYO Agile Academy', 'Brief Builder', 'AI Agent Starter']
  }
];

const Footer = () => {
  return (
    <footer className="bg-[#171411] px-4 py-16 text-[#efe7da]">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr_0.7fr]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img src="/gyo-banner.png" alt="GYO Technologies" loading="lazy" decoding="async" className="h-10" />
              <h3 className="text-3xl font-black tracking-[-0.06em]">GYO</h3>
            </div>
            <p className="max-w-sm text-lg leading-8 text-[#efe7da]/68">
              Diseno con pulso. Tecnologia con columna. Un estudio creativo-tecnologico para ideas que necesitan verse mejor, vender mejor y operar mejor.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#d75f32]">{column.title}</h4>
                <ul className="space-y-3 text-sm text-[#efe7da]/60">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#7fa36b]">Contacto</h4>
            <ul className="space-y-3 text-sm text-[#efe7da]/60">
              <li>
                <a href="https://www.linkedin.com/company/gyo-technologies" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#efe7da]">
                  <Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} />
                </a>
              </li>
              <li>info@gyotechnologies.com.ar</li>
              <li>+54 9 11 3948 6971</li>
              <li>Ciudad Autonoma de Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#efe7da]/10 pt-8 text-sm text-[#efe7da]/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} GYO Technologies. Todos los derechos reservados.</p>
          <p>Estudio creativo-tecnologico de diseno, desarrollo, automatizacion e IA.</p>
        </div>

        <div className="sr-only">
          <p>GYO Technologies - Estudio creativo-tecnologico especializado en diseno web, desarrollo web, ecommerce, automatizaciones, agentes de IA y herramientas digitales.</p>
          <p>Servicios de direccion creativa, UX/UI, agentes de IA personalizados, bots de IA, MCP clients, consultoria IT y software inteligente.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
