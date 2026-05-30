import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { getApiUrl } from '../lib/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = "w-full rounded-2xl border border-[#efe7da]/10 bg-[#efe7da]/10 px-4 py-3 text-[#efe7da] placeholder:text-[#efe7da]/35 outline-none transition focus:border-[#d75f32] focus:bg-[#efe7da]/15";
  const labelClass = "mb-2 block text-xs font-black uppercase tracking-[0.2em] text-[#efe7da]/55";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className={labelClass}>
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            className={fieldClass}
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Servicio de interes
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="">Selecciona un servicio</option>
            <option value="design">Diseno / UX/UI</option>
            <option value="development">Desarrollo web</option>
            <option value="tools">Tools / producto</option>
            <option value="automation">Automatizacion / IA</option>
            <option value="custom">Solucion personalizada</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Cuentanos que queres construir, ordenar o vender..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#efe7da] px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#171411] transition hover:bg-[#d75f32] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando mensaje...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar mensaje
            </>
          )}
        </button>
      </div>

      {status === 'success' && (
        <div className="rounded-2xl border border-[#7fa36b]/35 bg-[#7fa36b]/10 p-4 text-center">
          <div role="status" className="mb-1 font-black text-[#7fa36b]">Mensaje enviado correctamente.</div>
          <div className="text-sm text-[#efe7da]/65">Te responderemos en las proximas 24 horas.</div>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-2xl border border-[#d75f32]/40 bg-[#d75f32]/10 p-4 text-center">
          <div role="alert" className="mb-1 font-black text-[#d75f32]">Error al enviar el mensaje.</div>
          <div className="text-sm text-[#efe7da]/65">Por favor, intenta nuevamente o contactanos directamente.</div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
