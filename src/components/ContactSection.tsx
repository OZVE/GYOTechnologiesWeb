import ContactForm from './ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#171411] px-4 py-20 text-[#efe7da] md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#d75f32]">Contacto</p>
            <h2 className="text-4xl md:text-6xl font-black mb-3 md:mb-4 leading-tight tracking-[-0.05em]">
              Una buena entrega empieza con una conversacion clara.
            </h2>
            <p className="hidden md:block text-base text-[#efe7da]/65 max-w-3xl mx-auto">
              Contanos que queres construir, vender u ordenar. Te ayudamos a convertir la idea en alcance, criterio visual e implementacion real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información de Contacto */}
            <div className="space-y-4 self-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Informacion de contacto</h3>
                <p className="text-[#efe7da]/65 mb-4 hidden md:block">
                  Un primer contacto sirve para entender objetivos, fricciones, alcance y que tiene que estar funcionando al final.
                </p>
              </div>

              {/* Cards de Información */}
              <div className="space-y-4">
                <div className="bg-[#efe7da]/7 p-4 rounded-2xl border border-[#efe7da]/10 hover:border-[#d75f32]/60 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#efe7da] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="text-[#171411]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">Email</h4>
                      <p className="text-[#efe7da]/70 mb-1">info@gyotechnologies.com.ar</p>
                      <p className="text-xs text-[#efe7da]/45">Respuesta en 24 horas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#efe7da]/7 p-4 rounded-2xl border border-[#efe7da]/10 hover:border-[#d75f32]/60 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#efe7da] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="text-[#171411]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">Teléfono</h4>
                      <p className="text-[#efe7da]/70 mb-1">+54 9 11 3948 6971</p>
                      <p className="text-xs text-[#efe7da]/45">Lunes a Viernes, 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#efe7da]/7 p-4 rounded-2xl border border-[#efe7da]/10 hover:border-[#d75f32]/60 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#efe7da] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="text-[#171411]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">Ubicación</h4>
                      <p className="text-[#efe7da]/70 mb-1">Ciudad Autonoma de Buenos Aires</p>
                      <p className="text-xs text-[#efe7da]/45">Argentina</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Formulario */}
            <div className="bg-[#efe7da]/7 p-6 rounded-2xl border border-[#efe7da]/10 self-start">
              {/* Texto compacto */}
              <p className="text-[#efe7da]/65 mb-4 hidden md:block">
                Cuentanos sobre tu proyecto y te responderemos con una propuesta personalizada.
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
