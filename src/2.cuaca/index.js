const axios = require('axios');
const apiKey = '809fa66c000e9c3d360f9a303bbc6f42';

const getCoordinateByCityName = async (city) => {
  const cityName = city;
  const stateCode = 'ID';
  const countryCode = 'ID';
  const limit = 1;
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`,
  );

  const data = response.data;

  const result = {
    lat: data[0].lat,
    lon: data[0].lon,
  };

  return result;
};

const getWeather = async (city) => {
  const { lat, lon } = await getCoordinateByCityName(city);

  const uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await axios.get(uri);
  const data = response.data;
  const list = data.list;

  const groupedByDate = {};

  for (const weather of list) {
    const date = new Date(weather.dt_txt);
    const formatDate = new Intl.DateTimeFormat(`en-US`, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);

    if (!groupedByDate[formatDate]) {
      groupedByDate[formatDate] = [];
    }

    groupedByDate[formatDate].push(weather);
  }

  console.log('Weather Forecast:');
  for (const [date, weathers] of Object.entries(groupedByDate)) {
    const firstWeather = weathers[0];
    const temp = firstWeather.main.temp;
    const result = `${date}: ${temp}°C`;
    console.log(result);
  }
};

getWeather('Jakarta');
