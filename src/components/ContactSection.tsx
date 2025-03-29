import React from 'react';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1c1c1e]">
            Contacta con Nosotros
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 