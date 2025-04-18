# Les bonnes pièces

Projet basé sur un cours d' [OpenClassrooms](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript) , forké et entièrement personnalisé.

## Fonctionnalités

- Affichage de pièces auto à partir d'une API locale (`json-server`)
- Filtres dynamiques (prix, description, abordabilité)
- Graphiques (Chart.js) sur les avis et disponibilités
- Formulaire d'avis utilisateur avec validation
- Design responsive et CSS minifié avec Gulp

## Stack technique

- **JavaScript Vanilla** 
- **HTML / CSS**
- **Gulp**
- **Chart.js**
- **JSON Server** 
  
## Démarrage rapide

```bash
npm install    # Installe les dépendances
npm start   # Lance le json-server sur http://localhost:8080
npm run pullDB  # Récupère la base de données distant
npm run lint    # Analyse le code avec ESLint
npx gulp # Minifie le CSS dans ./public/dist/styles.min.css
```
