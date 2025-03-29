import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://gyotechnologies.github.io', // GitHub Pages
  'https://gyotechnologies.github.io/project-bolt' // GitHub Pages con subpath
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (como las de Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política de CORS no permite acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'oz@gyotechnologies.com.ar',
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).json({ error: 'Error al enviar el email' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
}); 