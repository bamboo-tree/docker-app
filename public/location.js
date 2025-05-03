// kraje i miasta
const LOCATION = [
  {"Polska": ["Warszawa", "Lublin", "Wrocław", "Gdańsk", "Kraków"]},
  {"Niemcy": ["Berlin", "Frankfurt", "Monachium", "Hamburg", "Kolonia"]},
  {"Francja": ["Paryż", "Marsylia", "Lyon", "Tuluza", "Nicea"]},
  {"Włochy": ["Rzym", "Neapol", "Mediolan", "Wenecja", "Florencja"]},
  {"Hiszpania": ["Madryt", "Barcelona", "Sewilla", "Walencja", "Malaga"]},
  {"Portugalia": ["Lizbona", "Porto", "Braga", "Coimbra", "Faro"]},
  {"Holandia": ["Amsterdam", "Rotterdam", "Haga", "Utrecht", "Eindhoven"]},
  {"Belgia": ["Bruksela", "Antwerpia", "Gandawa", "Liège", "Brugia"]},
  {"Czechy": ["Praga", "Brno", "Ostrawa", "Pilzno", "Liberec"]},
  {"Szwecja": ["Sztokholm", "Göteborg", "Malmö", "Uppsala", "Västerås"]}
]

// generowanie listy z krajami
function createCountrySelection() {
  let innerHTML = `<label for='country'>Wybierz kraj</label><select id='country' name='country' onchange='updateCities()'>`;

  LOCATION.forEach(countryObj => {
    let name = Object.keys(countryObj)[0];
    innerHTML += `<option value='${name}'>${name}</option>`;
  });
  innerHTML += `</select>`;

  document.getElementById("form-country").innerHTML = innerHTML;
}

// generowanie listy z miastami na podstawie wybranego kraju
function createCitySelection(selectedCountry) {
  const countryObj = LOCATION.find(obj => 
    Object.keys(obj)[0] === selectedCountry
  );
  
  if (!countryObj) return;

  const cities = countryObj[Object.keys(countryObj)[0]];
  let innerHTML = `<label for='city'>Wybierz miasto</label><select id='city' name='city'>`;

  cities.forEach(city => {
    innerHTML += `<option>${city}</option>`;
  });

  innerHTML += `</select>`;
  document.getElementById("form-city").innerHTML = innerHTML;
}

// aktualizacja listy z miastami w przypadku zmiany kraju
function updateCities() {
  const countrySelect = document.getElementById('country');
  const selectedCountry = countrySelect.value;
  createCitySelection(selectedCountry);
}

// wywołanie funckji
window.onload = function() {
  createCountrySelection();
  createCitySelection(Object.keys(LOCATION[0])[0]);
};

// oczekiwanie na przesłanie formularza
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const country = document.getElementById('country').value;
  const city = document.getElementById('city').value;

  try {
    const response = await fetch(`/weather?country=${country}&city=${city}`);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    displayWeather(data);
  } catch (error) {
    document.getElementById('result').innerHTML = `<div class="error">Błąd: ${error.message}</div>`;
  }
});

function displayWeather(data) {
  document.getElementById('result').innerHTML = `
    <div class="weather-card">
      <h2>${data.city}, ${data.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Ikona pogody">
      <div class="weather-data">
        <p class="temp">${Math.round(data.temp)}°C</p>
        <p class="wind">${Math.round(data.wind)}m/s</p>
      </div>
      <p class="desc">${data.description}</p>
    </div>
  `;
}