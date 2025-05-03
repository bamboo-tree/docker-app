FROM node:18-alpine

WORKDIR /usr/src/app

# kopia package.json i package-lock.json
COPY package*.json ./

# pobranie zależności
RUN npm install

# kopia reszty projektu
COPY . .

# udostępnienie portu aplikacji
EXPOSE 3000

# uruchomienie aplikacji
CMD ["node", "app.js"]