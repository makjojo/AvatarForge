#!/bin/bash

# ============================================
# 🚀 Script de Déploiement AvatarForge
# Par Jordey Tendart MAKOSSO
# ============================================

echo "🎭 AvatarForge - Déploiement"
echo "============================"

# 1. Build du projet
echo "📦 Construction du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# 2. Copier vers docs/
echo "📁 Copie vers le dossier docs..."
cp -r dist/* docs/

# 3. Commit
echo "💾 Commit des modifications..."
git add .
git commit -m "🚀 Déploiement $(date)"

# 4. Push
echo "📤 Push vers GitHub..."
git push

echo ""
echo "✅ Déploiement terminé !"
echo "🌐 Vérifie sur: https://makjojo.github.io/AvatarForge/"
echo "⏳ Patiente 2-3 minutes"
