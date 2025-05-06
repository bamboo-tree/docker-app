# Etap 1
FROM node:18-alpine AS builder

LABEL org.opencontainers.image.authors="Maciej Kamiński"

WORKDIR /app

# kopia package.json i package-lock.json
COPY package*.json ./

# pobranie zależności
RUN npm install

# kopia reszty projektu
COPY . .

# Etap 2
FROM node:18-alpine

LABEL org.opencontainers.image.authors="Maciej Kamiński"

WORKDIR /app

# instalacja curl i czyszczenie cache
RUN apk update && apk add curl && rm -rf /var/cache/apk/*

# kopia tylko wymaganych zasobów
COPY --from=builder /app /app

# Upewnij się, że tylko produkcyjne zależności zostają
RUN npm prune --production

# udostępnienie portu aplikacji
EXPOSE 3000

# health check sprawdza czy można wczytać stronę
HEALTHCHECK --interval=10s --timeout=1s \
  CMD cmd curl -f http://localhost:3000/ || exit 1

# uruchomienie aplikacji
CMD ["node", "app.js"]