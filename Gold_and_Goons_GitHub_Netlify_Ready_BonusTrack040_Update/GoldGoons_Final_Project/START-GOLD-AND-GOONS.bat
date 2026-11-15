@echo off
cd /d "%~dp0"
title Gold ^& Goons TCG Companion

echo ==========================================
echo   Gold ^& Goons TCG Companion
echo ==========================================

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install the LTS version from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies for the first run...
  call npm install
  if errorlevel 1 goto error
)

echo Starting Gold ^& Goons...
call npm run dev
if errorlevel 1 goto error
goto end

:error
echo.
echo Something went wrong. Check the messages above.
pause
exit /b 1

:end
