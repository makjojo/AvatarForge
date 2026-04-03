@echo off
:: ============================================
:: 🚀 Script de Déploiement AvatarForge
:: Par Jordey Tendart MAKOSSO
:: ============================================

echo 🎭 AvatarForge - Déploiement
echo ============================

:: 1. Build du projet
echo 📦 Construction du projet...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)

echo ✅ Build réussi !

:: 2. Copier vers docs
echo 📁 Copie vers le dossier docs...
xcopy /E /I /Y dist\* docs\

:: 3. Commit
echo 💾 Commit des modifications...
git add .
git commit -m "🚀 Déploiement %date% %time%"

:: 4. Push
echo 📤 Push vers GitHub...
git push

echo.
echo ✅ Déploiement terminé !
echo 🌐 Vérifie sur: https://makjojo.github.io/AvatarForge/
echo ⏳ Patiente 2-3 minutes
pause
