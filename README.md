# Marqueur — Brief Generator

Générateur de brief créatif propulsé par l'IA.

## Stack
- React 18
- Anthropic Claude API
- Vercel (déploiement)

## Déploiement

### 1. GitHub
```bash
git init
git add .
git commit -m "init: marqueur brief generator"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/marqueur-brief.git
git push -u origin main
```

### 2. Vercel
1. Va sur vercel.com → "Add New Project"
2. Connecte ton GitHub et sélectionne le repo `marqueur-brief`
3. Vercel détecte automatiquement React — clique "Deploy"
4. C'est en ligne en 2 min

## Variable d'environnement (optionnel)
Si tu veux sécuriser la clé API plus tard :
- Dans Vercel → Settings → Environment Variables
- Ajoute `REACT_APP_ANTHROPIC_KEY` = ta clé
