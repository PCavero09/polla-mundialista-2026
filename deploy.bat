@echo off
echo 🚀 Iniciando despliegue de la Polla Mundialista...

:: 1. Crear carpeta docs si no existe
if not exist docs mkdir docs

:: 2. Copiar archivos al folder docs
copy index.html docs\index.html /Y
copy "Polla Mundialista 2026.html" "docs\Polla Mundialista 2026.html" /Y
copy app.js docs\app.js /Y
copy styles.css docs\styles.css /Y
copy "Logo Mundial 2026.png" "docs\Logo Mundial 2026.png" /Y
copy "Trofeo.png" "docs\Trofeo.png" /Y

echo 📦 Archivos copiados a docs/ correctamente.

:: 3. Git commit y push
git add .
git commit -m "Actualizacion de diseno y trofeo"
git push -u origin main

echo  ¡Todo listo y subido a GitHub Pages!
pause
