@echo off
title Desinstalacion Total de Gemini CLI
cls

echo =======================================================
echo  ELIMINANDO GEMINI CLI Y TODOS SUS RASTROS
echo =======================================================
echo.

:: 1. Desinstalar el paquete global de NPM
echo [1/4] Desinstalando paquete npm...
call npm uninstall -g @google/gemini-cli
if %errorlevel% equ 0 (
    echo [OK] Paquete desinstalado.
) else (
    echo [INFO] No se pudo desinstalar via npm (o no existia).
)

:: 2. Eliminar la carpeta de configuracion (.gemini)
echo.
echo [2/4] Eliminando carpeta de configuracion y extensiones...
set "GEMINI_DIR=%USERPROFILE%\.gemini"

if exist "%GEMINI_DIR%" (
    rmdir /s /q "%GEMINI_DIR%"
    echo [OK] Carpeta %GEMINI_DIR% eliminada.
) else (
    echo [INFO] La carpeta .gemini no existe.
)

:: 3. Limpieza de cache temporal de NPM (Opcional)
echo.
echo [3/4] Limpiando cache de npm...
call npm cache clean --force >nul 2>&1
echo [OK] Cache de npm depurada.

:: 4. Verificacion final
echo.
echo [4/4] Verificando...
where gemini >nul 2>nul
if %errorlevel% neq 0 (
    echo [EXITO] El comando 'gemini' ya no existe en el sistema.
) else (
    echo [ALERTA] El comando 'gemini' aun aparece. Revisa tu PATH.
)

echo.
echo =======================================================
echo  NOTA: Debes eliminar la variable GEMINI_API_KEY manualmente
echo  si la configuraste en Windows.
echo =======================================================
pause