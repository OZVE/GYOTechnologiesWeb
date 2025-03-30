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
  'https://www.gyotechnologies.com.ar', // Dominio personalizado
  'https://ozve.github.io', // Tu GitHub Pages
  'https://ozve.github.io/project-bolt' // Tu GitHub Pages con subpath
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
  // En producción, usar la carpeta dist local
  distPath = path.join(__dirname, '../../dist');
  
  // Si no existe, intentar otras ubicaciones
  if (!fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('No se encontró index.html en la ubicación principal, buscando en otras ubicaciones...');
    
    const possiblePaths = [
      '/opt/render/project/src/dist',
      '/opt/render/project/dist',
      path.join(__dirname, '../dist'),
      path.join(process.cwd(), 'dist')
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(path.join(p, 'index.html'))) {
        console.log(`Encontrado index.html en ${p}`);
        distPath = p;
        break;
      }
    }
  }
} else {
  distPath = path.join(__dirname, '../../dist');
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Dist path:', distPath);
console.log('__dirname:', __dirname);
console.log('Current working directory:', process.cwd());

// Verificar si el archivo index.html existe
try {
  const indexPath = path.join(distPath, 'index.html');
  const exists = fs.existsSync(indexPath);
  console.log('index.html exists:', exists);
  console.log('index.html path:', indexPath);
  
  if (exists) {
    // Leer y mostrar el contenido del index.html para debug
    const content = fs.readFileSync(indexPath, 'utf8');
    console.log('index.html content preview:', content.substring(0, 200));
  }
  
  // Listar contenido del directorio dist
  const files = fs.readdirSync(distPath);
  console.log('Contenido del directorio dist:', files);
} catch (error) {
  console.error('Error verificando archivos:', error);
}

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(distPath, {
  index: false, // Don't serve index.html automatically
  extensions: ['html', 'htm'], // Handle HTML files without extension
  maxAge: '1h' // Add cache control
}));

// Manejar todas las demás rutas
app.get('*', (req, res) => {
  console.log('Requested path:', req.path);
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error(`index.html no encontrado en ${indexPath}`);
    res.status(404).send('File not found');
    return;
  }
  
  // Leer el archivo y enviarlo con los headers correctos
  try {
    const content = fs.readFileSync(indexPath, 'utf8');
    res.set({
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    }).send(content);
  } catch (error) {
    console.error('Error leyendo index.html:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
}); 