import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

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

// API endpoints primero
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

// Configuración para servir archivos estáticos
const isProduction = process.env.NODE_ENV === 'production';
let distPath;

if (isProduction) {
  // En Render, usamos la ruta específica donde copiamos los archivos
  distPath = '/opt/render/project/src/dist';
  
  // Verificar si el directorio existe
  if (!fs.existsSync(distPath)) {
    console.error(`El directorio ${distPath} no existe`);
    // Intentar crear el directorio si no existe
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Verificar si index.html existe
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`El archivo index.html no existe en ${distPath}`);
    console.log('Contenido del directorio:', fs.readdirSync(distPath));
  } else {
    console.log(`index.html encontrado en ${indexPath}`);
    // Leer y loggear el contenido de index.html para verificar que es correcto
    const content = fs.readFileSync(indexPath, 'utf8');
    console.log('Contenido de index.html:', content.substring(0, 200) + '...');
  }
} else {
  distPath = path.join(__dirname, '../../dist');
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Dist path:', distPath);
console.log('__dirname:', __dirname);

// Verificar si el archivo index.html existe
try {
  const indexPath = path.join(distPath, 'index.html');
  const exists = fs.existsSync(indexPath);
  console.log('index.html exists:', exists);
  console.log('index.html path:', indexPath);
  
  // Listar contenido del directorio dist
  const files = fs.readdirSync(distPath);
  console.log('Contenido del directorio dist:', files);
} catch (error) {
  console.error('Error verificando archivos:', error);
}

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(distPath));

// Manejar todas las demás rutas
app.get('*', (req, res) => {
  console.log('Requested path:', req.path);
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
}); 