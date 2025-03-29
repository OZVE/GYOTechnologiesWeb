import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      const apiUrl = import.meta.env.PROD 
        ? 'https://GYOTechnologiesWeb.onrender.com' // URL de Render en producción
        : 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/contact`, {
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
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black text-base"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black text-base"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2.5 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black text-base"
          placeholder="Tu mensaje..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex justify-center py-3 px-6 text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-md shadow-sm disabled:opacity-50 transition-colors duration-200"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>

      {status === 'success' && (
        <div className="text-green-600 text-center text-base">
          ¡Mensaje enviado correctamente!
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600 text-center text-base">
          Error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}
    </form>
  );
};

export default ContactForm;