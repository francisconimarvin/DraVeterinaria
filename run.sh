#!/bin/bash
# Archivo de ejecución bash para SO Linux
# Para ejecutar se debe estar en /DraVeterinaria y darle permisos de ejecución al archivo: chmod +x run.sh
# Puedes correrlo en terminar con ./run.sh desde /DraVeterinaria

# Detectar terminal disponible (si el tuyo no está presente, simplemente añádelo en otro anillo elif)
if command -v kitty &> /dev/null; then
    TERM_CMD="kitty bash -c"
elif command -v alacritty &> /dev/null; then
    TERM_CMD="alacritty -e bash -c"
elif command -v foot &> /dev/null; then
    TERM_CMD="foot bash -c"
elif command -v gnome-terminal &> /dev/null; then
    TERM_CMD="gnome-terminal -- bash -c"
else
    echo "No se encontró terminal compatible."
    exit 1
fi

# Abrir Scheduling API
$TERM_CMD "cd backend/schedulingAPI/scheduling && mvn clean && mvn spring-boot:run; exec bash" &

# Abrir Login API
$TERM_CMD "cd backend/loginAPI && mvn clean && mvn spring-boot:run; exec bash" &

# Abrir Frontend
$TERM_CMD "cd frontend/DraVeterinaria && npm run dev; exec bash" &

