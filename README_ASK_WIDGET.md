# Widget "Pregúntale a esta página"

Este widget flotante permite a los usuarios hacer preguntas sobre el contenido de la página actual utilizando inteligencia artificial.

## Características

- **Widget flotante**: Botón flotante en la esquina inferior derecha
- **Interfaz intuitiva**: Chat-like con historial de preguntas y respuestas
- **Extracción inteligente de contexto**: Analiza automáticamente el contenido de la página
- **Respuestas precisas**: Utiliza OpenAI GPT-4o-mini para generar respuestas contextuales
- **Accesible**: Soporte completo para lectores de pantalla y navegación por teclado
- **Mobile-friendly**: Diseño responsive que funciona en todos los dispositivos

## Instalación

### 1. Configurar variables de entorno

Copia el archivo `env.example` a `.env` y configura las variables:

```bash
cp env.example .env
```

Edita el archivo `.env` y agrega tu API key de OpenAI:

```env
OPENAI_API_KEY=sk-tu-api-key-de-openai-aqui
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run dev:server
```

### 4. Construir para producción

```bash
# Construir frontend
npm run build

# Construir backend
npm run build:server

# Ejecutar en producción
npm start
```

## Uso

### Para usuarios finales

1. **Abrir el widget**: Haz clic en el botón flotante con el ícono de mensaje
2. **Hacer una pregunta**: Escribe tu pregunta en el campo de texto
3. **Enviar**: Presiona Enter o haz clic en el botón de enviar
4. **Ver respuesta**: La IA responderá basándose en el contenido de la página

### Para desarrolladores

El widget está integrado automáticamente en todas las páginas de la aplicación. No requiere configuración adicional.

## Arquitectura

### Frontend (React + TypeScript)

- **`src/components/AskPageWidget.tsx`**: Componente principal del widget
- **`src/lib/getPageContext.ts`**: Función para extraer contexto de la página

### Backend (Node.js + Express)

- **`server/routes/askPage.ts`**: Endpoint `/api/ask-page`
- **`server/index.ts`**: Registro del endpoint

## Funcionalidades técnicas

### Extracción de contexto

El widget extrae automáticamente:

- Título de la página (`document.title`)
- Meta descripción
- Encabezados (h1, h2, h3)
- Contenido principal (dentro de `<main>` o `<body>`)
- URL actual

**Elementos excluidos:**
- Navegación (`nav`, `header`)
- Pie de página (`footer`)
- Scripts y estilos
- Elementos ocultos
- SVG, canvas, iframe

### Seguridad

- **Rate limiting**: 1 solicitud por 2 segundos por IP
- **Validación de entrada**: Sanitización de preguntas
- **Límites de longitud**: Máximo 1000 caracteres por pregunta
- **CORS**: Configurado solo para dominios permitidos

### Accesibilidad

- **ARIA labels**: Etiquetas descriptivas para lectores de pantalla
- **Navegación por teclado**: Soporte completo para teclado
- **Focus management**: Manejo automático del foco
- **Contraste**: Cumple con estándares WCAG

## Pruebas manuales

### Checklist de funcionalidad

- [ ] El botón flotante aparece en la esquina inferior derecha
- [ ] Al hacer clic se abre/cierra el panel del widget
- [ ] El campo de texto recibe el foco automáticamente
- [ ] Se puede escribir una pregunta y enviarla
- [ ] Aparece el indicador "Pensando..." durante la carga
- [ ] Se recibe una respuesta de la IA
- [ ] Las preguntas y respuestas se muestran en el historial
- [ ] El scroll funciona correctamente en el historial
- [ ] Se puede cerrar el widget con el botón X

### Checklist de accesibilidad

- [ ] Funciona con lectores de pantalla (NVDA, JAWS, VoiceOver)
- [ ] Se puede navegar completamente con teclado
- [ ] Los elementos tienen etiquetas ARIA apropiadas
- [ ] El contraste de colores es adecuado
- [ ] Los mensajes de error son claros y accesibles

### Checklist de responsive

- [ ] Funciona correctamente en móviles (320px+)
- [ ] Funciona correctamente en tablets (768px+)
- [ ] Funciona correctamente en desktop (1024px+)
- [ ] El widget no se superpone con otros elementos
- [ ] Los botones son lo suficientemente grandes para tocar

### Checklist de seguridad

- [ ] Las preguntas vacías son rechazadas
- [ ] Las preguntas muy largas son rechazadas
- [ ] El rate limiting funciona correctamente
- [ ] Los errores no exponen información sensible
- [ ] Las respuestas están sanitizadas

## Troubleshooting

### Problemas comunes

1. **"Error de autenticación con OpenAI"**
   - Verifica que `OPENAI_API_KEY` esté configurada correctamente
   - Asegúrate de que la API key sea válida y tenga créditos

2. **"Demasiadas solicitudes"**
   - Espera 2 segundos antes de hacer otra pregunta
   - El rate limiting está funcionando correctamente

3. **El widget no aparece**
   - Verifica que el componente esté importado en `App.tsx`
   - Revisa la consola del navegador para errores

4. **No se extrae el contexto correctamente**
   - Verifica que la página tenga contenido en `<main>` o `<body>`
   - Revisa que no haya errores en `getPageContext.ts`

### Logs útiles

```bash
# Ver logs del servidor
npm run dev:server

# Ver logs del frontend
npm run dev
```

## Contribución

Para contribuir al widget:

1. Crea una nueva branch: `git checkout -b feature/nueva-funcionalidad`
2. Haz tus cambios
3. Ejecuta las pruebas: `npm test`
4. Envía un pull request

## Licencia

Este widget es parte del proyecto GYO Technologies y está sujeto a la misma licencia. 