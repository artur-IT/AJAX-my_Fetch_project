let longitudeGeo;
let latitudeGeo;
let cityGeo;

// API DOWNLOAD GEOLOCALIZATION (from IP)
const Geo = () => {
  const urlGeo = "http://ip-api.com/json/?fields=query,lat,lon,city";
  fetch(urlGeo)
    .then((geo) => {
      if (geo.status !== 200) {
        throw Error("To nie jest odp. 200");
      } else {
        return geo.json();
      }
    })
    .then((geo) => {
      longitudeGeo = geo.lon;
      latitudeGeo = geo.lat;
      cityGeo = geo.city;
      Weather();
    })
    .catch((err) => alert(err, "coś z Geolokalizacją jest nie tak!"));
};

// API DOWNLOAD WEATHER
const Weather = () => {
  const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeGeo}&longitude=${longitudeGeo}&hourly=temperature_2m,cloudcover,windspeed_80m,temperature_180m&models=gfs_global&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`;

  // Podstawowa! budowa metody fetch()
  fetch(urlWeather)
    .then((climate) => {
      if (climate.status !== 200) {
        throw Error("To nie jest odp. 200");
      } else {
        return climate.json(); // parsuje tzn. zamienia wyniki z url na obiekt JS
      }
    })
    .then((climate) => showWeather(climate))
    .catch((err) => alert(err, "coś z Pogodą jest nie tak!"));
};

// API WITH LONG WEEKENDS (maybe future)
// const Weekends = () => {
//   const urlWeekends = "https://date.nager.at/api/v3/PublicHolidays/2023/PL";
//   fetch(urlweekends)
//     .then((days) => {
//       return days.json();
//     })
//     .then((days) => showWeekends(days));
// };

// API POBIERAJĄCE KOTA
const Cats = () => {
  const urlCats = "https://cataas.com/cat?json=true";
  fetch(urlCats)
    .then((cats) => {
      if (cats.status !== 200) {
        throw Error("Nie pobiera kotów!!!");
      } else {
        return cats.json();
      }
    })
    // .then((cat) => console.log(cat))
    .then((cat) => showCat(cat.url))
    .catch(Error("coś z Kotami jest nie tak!"));
};

// SHOW RESULTS in DOM
const showWeather = (climate) => {
  const resultArea = document.querySelector(".weather__grid");

  // add city + date
  const city = document.createElement("div");
  const temp = [...climate.hourly.temperature_2m];
  city.textContent = `${cityGeo} (twoja lokalizacja wg ISP), aktualizacja ${climate.current_weather.time}`;
  city.classList.add("city__my");
  resultArea.appendChild(city);

  // add temp.
  for (let i = 14; i < temp.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${temp[i]}°C`;
    text.classList.add("t");
    resultArea.appendChild(text);
  }

  // add wind
  const wind = [...climate.hourly.windspeed_80m];
  for (let i = 14; i < wind.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${wind[i]} km/h`;
    text.classList.add("w");
    resultArea.appendChild(text);
  }

  // add cloud
  const cloud = [...climate.hourly.cloudcover];
  for (let i = 14; i < cloud.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${cloud[i]} %`;
    text.classList.add("c");
    resultArea.appendChild(text);
  }
};

// FUTURE
// const showWeekends = (days) => {
//   const resultArea = document.querySelector(".weekends__show");
//   const weekends = document.createElement("div");
//   resultArea.appendChild(img);
// };

const showCoffee = (cup) => {
  const resultArea = document.querySelector(".coffee__show");
  const img = document.createElement("img");
  img.src = `https://coffee.alexflipnote.dev/random`;
  resultArea.appendChild(img);
};

const showCat = (cat) => {
  const resultArea = document.querySelector(".cats__show");
  const img = document.createElement("img");
  img.src = `https://cataas.com${cat}`;
  resultArea.appendChild(img);
};

// RUN API
Geo();
showCoffee();
Cats();
