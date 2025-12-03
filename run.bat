:: Script para ejecutar la aplicación en SO Windows.
:: En tu cmd, estando en /DraVeterinaria, ejecuta run.bat (o en su defecto, doble click sobre el archivo run.bat)
@echo off
title DraVeterinaria - Launcher

start cmd /k "cd backend\schedulingAPI\scheduling && mvn clean && mvn spring-boot:run"

start cmd /k "cd backend\loginAPI && mvn clean && mvn spring-boot:run"

start cmd /k "cd frontend\DraVeterinaria && npm run dev"
