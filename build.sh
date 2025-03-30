#!/bin/bash

# Instalar dependencias
npm install

# Compilar el servidor
npm run build:server

# Compilar el frontend
npm run build

# Crear el directorio dist en la ubicación correcta
DIST_DIR="/opt/render/project/src/dist"
echo "Creating directory: $DIST_DIR"
mkdir -p "$DIST_DIR"

# Verificar que el directorio se creó correctamente
if [ ! -d "$DIST_DIR" ]; then
    echo "Error: Failed to create directory $DIST_DIR"
    exit 1
fi

# Copiar los archivos compilados
echo "Copying files from dist to $DIST_DIR"
cp -r dist/* "$DIST_DIR/"

# Verificar que los archivos se copiaron
if [ ! -f "$DIST_DIR/index.html" ]; then
    echo "Error: index.html not found in $DIST_DIR"
    echo "Contents of $DIST_DIR:"
    ls -la "$DIST_DIR"
    exit 1
fi

# Asegurar permisos correctos
echo "Setting permissions"
chmod -R 755 "$DIST_DIR"

# Verificar el resultado
echo "Final directory contents:"
ls -la "$DIST_DIR" 