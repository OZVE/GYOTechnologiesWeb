import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contacto</h2>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection; 