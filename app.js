const express = require('express');
const axios = require('axios');
require('dotenv').config();

// API w pliku .env

// express
const app = express();
const PORT = 3000;
app.use(express.static('public'))

// po przesałniu formularza
app.get('/weather', async (req, res) => {
  const { country, city } = req.query;

  if (country != null && city != null) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=pl&appid=${process.env.WEATHER_API_KEY}`);
      res.json({
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        wind: response.data.wind.speed,
      });
    } catch (error) {
      res.status(500).json({ error: 'Nie udało się pobrać pogody' });
    }
  } else {
    return res.status(400).json({ error: 'Dane nie są poprawnie uzupełnione' });
  }
})

// uruchomienie serwera // nie wiem czy to jest potrzebne bo wyszło zamieszanie z punktem 1?
let meta_data = `http://localhost:${PORT}\nAutor: Maciej Kamiński\n${Date()}`
app.listen(PORT, () => console.log(meta_data));
