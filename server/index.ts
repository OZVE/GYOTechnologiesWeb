import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://gyotechnologies.github.io', // GitHub Pages
  'https://gyotechnologies.github.io/project-bolt', // GitHub Pages con subpath
  'https://www.gyotechnologies.com.ar' // Dominio personalizado
];

app.use(cors({
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
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

// Servir archivos estáticos
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ error: 'Error al enviar el email' });
  }
});

// Manejar todas las demás rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
}); 