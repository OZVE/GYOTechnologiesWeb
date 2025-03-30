#!/bin/bash

# Crear el directorio dist si no existe
mkdir -p /opt/render/project/src/dist

# Copiar los archivos del frontend
cp -r dist/* /opt/render/project/src/dist/

# Copiar los archivos del servidor
cp -r dist/server /opt/render/project/src/dist/

# Verificar el contenido
ls -la /opt/render/project/src/dist 