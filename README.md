# Serwis pogodowy

Prosty serwis pogodowy korzystający z API udostępnionego przez `https://openweathermap.org/`.

## Docker

1. Zbudowanie obrazu `docker build -t docker-app .`
2. Uruchomienie kontenera `docker run -p 3000:3000 --env-file .env -d docker-app`

_Wymagane jest posiadanie ważnego klucza API do serwiu pogodowego. Należy go zapisać w pliku `.env` w postaci `WEATHER_API_KEY=<YOUR_API_KEY>`._

### Wykorzystane technologie:
- HTML/CSS
- JS
  * express
  * axios
  * dotenv
- Docker