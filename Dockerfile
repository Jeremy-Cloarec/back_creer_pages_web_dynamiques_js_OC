# Utilise une image Node officielle
FROM node
# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du projet dans le conteneur
COPY . .

# Exposer le port utilisé par json-server
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "start"]
