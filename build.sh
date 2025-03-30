#!/bin/bash

# Instalar dependencias
npm install

# Compilar el servidor
npm run build:server

# Compilar el frontend
npm run build

# Asegurarse de que la carpeta dist existe en la ubicación correcta
mkdir -p /opt/render/project/src/dist

# Copiar los archivos compilados a la ubicación correcta
cp -r dist/* /opt/render/project/src/dist/

# Asegurar permisos correctos
chmod -R 755 /opt/render/project/src/dist

# Verificar que los archivos se copiaron correctamente
echo "Contenido del directorio dist:"
ls -la /opt/render/project/src/dist 