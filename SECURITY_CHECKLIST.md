# 🔒 Checklist de Seguridad para Producción

## ✅ Verificaciones Pre-Despliegue

### Variables de Entorno
- [ ] `OPENAI_API_KEY` configurada en Render
- [ ] `EMAIL_USER` configurada en Render
- [ ] `EMAIL_PASS` configurada en Render
- [ ] `EMAIL_TO` configurada en Render
- [ ] `NODE_ENV=production` configurado

### Archivos Sensibles
- [ ] `.env` NO está en el repositorio
- [ ] `env.example` NO contiene datos reales
- [ ] No hay API keys hardcodeadas en el código
- [ ] No hay contraseñas en el código

### Configuración de Seguridad
- [ ] CORS configurado correctamente
- [ ] Rate limiting activado
- [ ] Headers de seguridad implementados
- [ ] Protección contra prompt injection activa
- [ ] Validación de entrada estricta

### Logs y Debugging
- [ ] Logs de debugging removidos para producción
- [ ] No se exponen datos sensibles en logs
- [ ] Solo logs de error críticos activos

## 🚨 Verificaciones Post-Despliegue

### Funcionalidad
- [ ] El chat funciona correctamente
- [ ] Las respuestas están formateadas
- [ ] El rate limiting funciona
- [ ] Los errores no exponen información sensible

### Seguridad
- [ ] No se puede acceder a `/api/ask-page` desde orígenes no autorizados
- [ ] Las preguntas maliciosas son bloqueadas
- [ ] Los logs de ataque se registran correctamente
- [ ] No hay información sensible en la consola del navegador

### Performance
- [ ] El servidor responde rápidamente
- [ ] No hay memory leaks
- [ ] El rate limiting no afecta usuarios legítimos

## 🔧 Comandos de Verificación

```bash
# Verificar que no hay archivos sensibles en el repo
git ls-files | grep -E "\.(env|key|secret|password)"

# Verificar que no hay console.log en producción
grep -r "console\.log" src/ server/ --include="*.ts" --include="*.tsx"

# Verificar configuración de CORS
curl -H "Origin: https://malicious-site.com" -X POST https://tu-dominio.com/api/ask-page

# Verificar rate limiting
for i in {1..5}; do curl -X POST https://tu-dominio.com/api/ask-page; done
```

## 📞 Contacto de Emergencia

En caso de detectar una vulnerabilidad:
1. Desactiva inmediatamente el endpoint `/api/ask-page`
2. Revisa los logs de Render
3. Cambia la API key de OpenAI
4. Actualiza las variables de entorno
5. Revisa el código para identificar la causa

## 🔄 Actualizaciones de Seguridad

- [ ] Revisar patrones de prompt injection mensualmente
- [ ] Actualizar dependencias regularmente
- [ ] Monitorear logs de ataque diariamente
- [ ] Revisar configuración de CORS trimestralmente
