import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getApiUrl } from '../lib/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fieldClass = 'w-full rounded-2xl border border-[#171411]/12 bg-[#efe7da] px-4 py-3 text-[#171411] placeholder:text-[#171411]/40 outline-none transition focus:border-[#d75f32] focus:bg-[#f8f0e3]';
const labelClass = 'mb-2 block text-xs font-black uppercase tracking-[0.2em] text-[#171411]/55';

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `
            Empresa: ${formData.company}
            Telefono: ${formData.phone}
            Mensaje: ${formData.message}
          `
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-[#171411]/65 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-description"
                className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#171411]/10 bg-[#f8f0e3] p-6 text-[#171411] shadow-2xl md:p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(215,95,50,0.16),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(126,107,216,0.13),transparent_30%)]" />
                <div className="relative z-10">
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div>
                      <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#d75f32]">Primera conversacion</p>
                      <h2 id="contact-modal-title" className="text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">Solicitar una demo</h2>
                      <p id="contact-modal-description" className="mt-4 max-w-xl leading-7 text-[#171411]/65">Contanos que queres construir, ordenar o vender. Te respondemos con una proxima accion clara.</p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full border border-[#171411]/10 p-2 transition hover:bg-[#171411] hover:text-[#efe7da]" aria-label="Cerrar modal">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="modal-name" className={labelClass}>Nombre</label>
                        <input type="text" id="modal-name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className={fieldClass} placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label htmlFor="modal-company" className={labelClass}>Empresa</label>
                        <input type="text" id="modal-company" name="company" value={formData.company} onChange={handleChange} required autoComplete="organization" className={fieldClass} placeholder="Nombre de tu empresa" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="modal-email" className={labelClass}>Email</label>
                        <input type="email" id="modal-email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={fieldClass} placeholder="tu@email.com" />
                      </div>
                      <div>
                        <label htmlFor="modal-phone" className={labelClass}>Telefono</label>
                        <input type="tel" id="modal-phone" name="phone" value={formData.phone} onChange={handleChange} required autoComplete="tel" className={fieldClass} placeholder="+54 9 11 1234 5678" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modal-message" className={labelClass}>Mensaje</label>
                      <textarea id="modal-message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={`${fieldClass} resize-none`} placeholder="Cuentanos sobre tu proyecto" />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button type="submit" disabled={status === 'loading'} className="inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#efe7da] transition hover:bg-[#d75f32] disabled:opacity-50">
                        {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'} <ArrowRight className="ml-3 h-4 w-4" />
                      </button>
                      {status === 'success' && <p role="status" className="font-black text-[#7fa36b]">Solicitud enviada correctamente.</p>}
                      {status === 'error' && <p role="alert" className="font-black text-[#d75f32]">Error al enviar. Intenta nuevamente.</p>}
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
