@echo off
echo Starting Student Management API backend...

cd /d "%~dp0"
start "Backend Server" cmd /k "npm run dev"

echo Waiting for server to boot up...
timeout /t 3 /nobreak > nul

echo Opening demo frontend...
start "" "%~dp0demo.html"

echo Done. Backend is running in a separate window, demo.html should be open in your browser.