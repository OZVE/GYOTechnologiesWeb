#!/bin/bash

# Instalar dependencias
npm install

# Compilar el servidor
npm run build:server

# Compilar el frontend
npm run build

# Asegurarse de que la carpeta dist existe en la ubicación correcta
mkdir -p /opt/render/project/dist

# Copiar los archivos compilados a la ubicación correcta
cp -r dist/* /opt/render/project/dist/ 