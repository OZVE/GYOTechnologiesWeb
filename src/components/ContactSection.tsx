import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-tight py-2">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Conecta con nuestro equipo de expertos en IA. Estamos aquí para ayudarte a implementar soluciones inteligentes que impulsen el crecimiento de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de Contacto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
                <p className="text-gray-300 mb-8">
                  Nuestro equipo está disponible para responder tus consultas y ayudarte a encontrar la mejor solución para tu negocio.
                </p>
              </div>

              {/* Cards de Información */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="text-[#252525]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                      <p className="text-gray-300 mb-1">info@gyotechnologies.com.ar</p>
                      <p className="text-sm text-gray-400">Respuesta en 24 horas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="text-[#252525]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Teléfono</h4>
                      <p className="text-gray-300 mb-1">+54 9 11 3948 6971</p>
                      <p className="text-sm text-gray-400">Lunes a Viernes, 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="text-[#252525]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Ubicación</h4>
                      <p className="text-gray-300 mb-1">Ciudad Autónoma de Buenos Aires</p>
                      <p className="text-sm text-gray-400">Argentina</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Formulario */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">

              <p className="text-gray-300 mb-8">
                Cuéntanos sobre tu proyecto y te responderemos con una propuesta personalizada.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 