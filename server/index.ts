import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { askPageHandler } from './routes/askPage';

const app = express();
const port = process.env.PORT || 3001;

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://gyotechnologies.github.io', // GitHub Pages
  'https://gyotechnologies.github.io/project-bolt', // GitHub Pages con subpath
  'https://www.gyotechnologies.com.ar', // Dominio personalizado
  'https://ozve.github.io', // Tu GitHub Pages
  'https://ozve.github.io/project-bolt', // Tu GitHub Pages con subpath
  'https://gyotechnologies-web.onrender.com', // Render backend
  'https://gyotechnologies-web.render.com' // Render backend alternativo
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

app.use(express.json({ limit: '10mb' }));

// Headers de seguridad (solo para rutas no-API)
app.use((req, res, next) => {
  // Solo aplicar headers de seguridad a rutas que no sean /api/*
  if (!req.path.startsWith('/api/')) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  }
  next();
});

// Configurar el transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API endpoints primero
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: port
  });
});

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

// Ask Page Widget endpoint
app.post('/api/ask-page', (req, res, next) => {
  console.log('🔍 DEBUG - Endpoint /api/ask-page llamado:');
  console.log('  Method:', req.method);
  console.log('  Headers:', req.headers);
  console.log('  Origin:', req.headers.origin);
  console.log('  User-Agent:', req.headers['user-agent']);
  next();
}, askPageHandler);

// Configuración para servir archivos estáticos
const isProduction = process.env.NODE_ENV === 'production';
let distPath;

if (isProduction) {
  // En Render, intentamos diferentes rutas posibles
  const possiblePaths = [
    '/opt/render/project/src/dist',
    '/opt/render/project/dist',
    path.join(__dirname, '../../dist'),
    path.join(__dirname, '../dist')
  ];

      // Encontrar la primera ruta que existe y contiene index.html
    for (const p of possiblePaths) {
      const indexPath = path.join(p, 'index.html');
      if (fs.existsSync(indexPath)) {
        distPath = p;
        break;
      }
    }

    if (!distPath) {
      console.error('No se pudo encontrar la carpeta dist con index.html');
      // Intentar crear el directorio y copiar archivos
      distPath = '/opt/render/project/src/dist';
      try {
        fs.mkdirSync(distPath, { recursive: true });
        
        // Intentar copiar archivos desde la carpeta dist local
        const localDist = path.join(__dirname, '../../../dist');
        if (fs.existsSync(localDist)) {
          fs.cpSync(localDist, distPath, { recursive: true });
        } else {
          console.error('No se encontró la carpeta dist local en:', localDist);
        }
      } catch (error) {
        console.error('Error al crear/copiar archivos:', error);
      }
    }
} else {
  distPath = path.join(__dirname, '../dist');
}

// Verificar si el archivo index.html existe
try {
  const indexPath = path.join(distPath, 'index.html');
  const exists = fs.existsSync(indexPath);
  
  if (!exists) {
    console.error('index.html no encontrado en:', indexPath);
  }
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
      const indexPath = path.join(distPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html no encontrado en ${indexPath}`);
      res.status(404).send('File not found');
      return;
    }
  
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
}); 