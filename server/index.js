"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como las de Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política de CORS no permite acceso desde este origen.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express_1.default.json());
// Configurar el transportador de correo
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// API endpoints primero
app.post('/api/contact', async (req, res) => {
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
    }
    catch (error) {
        console.error('Error al enviar email:', error);
        res.status(500).json({ error: 'Error al enviar el email' });
    }
});
// Configuración para servir archivos estáticos
const isProduction = process.env.NODE_ENV === 'production';
let distPath;
if (isProduction) {
    // En Render, intentamos diferentes rutas posibles
    const possiblePaths = [
        '/opt/render/project/src/dist',
        '/opt/render/project/dist',
        path_1.default.join(__dirname, '../../dist'),
        path_1.default.join(__dirname, '../dist')
    ];
    // Encontrar la primera ruta que existe y contiene index.html
    for (const p of possiblePaths) {
        const indexPath = path_1.default.join(p, 'index.html');
        if (fs_1.default.existsSync(indexPath)) {
            console.log(`Encontrado index.html en ${indexPath}`);
            distPath = p;
            break;
        }
    }
    if (!distPath) {
        console.error('No se pudo encontrar la carpeta dist con index.html');
        console.log('Rutas intentadas:', possiblePaths);
        // Intentar crear el directorio y copiar archivos
        distPath = '/opt/render/project/src/dist';
        try {
            fs_1.default.mkdirSync(distPath, { recursive: true });
            console.log(`Directorio ${distPath} creado exitosamente`);
            // Intentar copiar archivos desde la carpeta dist local
            const localDist = path_1.default.join(__dirname, '../../../dist');
            if (fs_1.default.existsSync(localDist)) {
                console.log('Copiando archivos desde:', localDist);
                fs_1.default.cpSync(localDist, distPath, { recursive: true });
            }
            else {
                console.error('No se encontró la carpeta dist local en:', localDist);
            }
        }
        catch (error) {
            console.error('Error al crear/copiar archivos:', error);
        }
    }
}
else {
    distPath = path_1.default.join(__dirname, '../../dist');
}
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Dist path:', distPath);
console.log('__dirname:', __dirname);
console.log('Current working directory:', process.cwd());
// Verificar si el archivo index.html existe
try {
    const indexPath = path_1.default.join(distPath, 'index.html');
    const exists = fs_1.default.existsSync(indexPath);
    console.log('index.html exists:', exists);
    console.log('index.html path:', indexPath);
    if (exists) {
        // Leer y mostrar el contenido del index.html para debug
        const content = fs_1.default.readFileSync(indexPath, 'utf8');
        console.log('index.html content preview:', content.substring(0, 200));
    }
    // Listar contenido del directorio dist
    const files = fs_1.default.readdirSync(distPath);
    console.log('Contenido del directorio dist:', files);
}
catch (error) {
    console.error('Error verificando archivos:', error);
}
// Servir archivos estáticos desde la carpeta dist
app.use(express_1.default.static(distPath, {
    index: false, // Don't serve index.html automatically
    extensions: ['html', 'htm'], // Handle HTML files without extension
    maxAge: '1h' // Add cache control
}));
// Manejar todas las demás rutas
app.get('*', (req, res) => {
    console.log('Requested path:', req.path);
    const indexPath = path_1.default.join(distPath, 'index.html');
    if (!fs_1.default.existsSync(indexPath)) {
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
