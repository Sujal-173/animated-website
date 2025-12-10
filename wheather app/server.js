let input = document.querySelector("#cityInput");
let button = document.querySelector("#getWeatherBtn");
let weatherResult = document.querySelector("#weatherResult");

let api = "a1cd516e92354a99bcb83315250310";
let city = "New Delhi";

button.addEventListener("click", async () => {
  city = input.value;
  let url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`;

  let data = await fetch(url);
  let weatherData = await data.json();

  let cityName = weatherData.location.name;
  let weatherCondition = weatherData.current.condition.text;
  let currentTemp = weatherData.current.temp_c;
  let countryName = weatherData.location.country;
  let Region = weatherData.location.region;

  //  console.log(weatherData);
  //  console.log(input.value);
  //  console.log(weatherCondition);
  //  console.log(currentTemp);
  //  console.log(countryName);
  //  console.log(Region);
  //  console.log(cityName);
  console.log(data.url);
  

  function format12Hour(unix) {
    const d = new Date(unix * 1000);

    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 → 12

    return `${hours}:${minutes} ${ampm}`;
  }

  const ts = format12Hour(weatherData.current.last_updated_epoch);

  weatherResult.innerHTML = `<p>last Updated : ${ts}</p>
      <h2>${cityName}</h2>
      <h3>country : ${countryName}</h3>
      <h3>region :  ${Region}</h3>
      <h3>temperature : ${currentTemp} °C</h3>
      <h3>condition : ${weatherCondition}</h3>`;
});
