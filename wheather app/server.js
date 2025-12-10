let input = document.querySelector("#cityInput");
let button = document.querySelector("#getWeatherBtn");
let api = "a1cd516e92354a99bcb83315250310";
let city = "indore";
button.addEventListener("click", async () => {
  city = input.value;
  let url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`
   let data = await fetch(url) ;
   let weatherData = await data.json();
   console.log(weatherData);
   console.log(weatherData.location.country);
   console.log(input.value);
   
   
  //  data.then((res) => {
  //    return res.json();
  //  }).then((res) => {
  //   console.log(res.location.country);
  //  }).catch((err) => {
  //   console.log(err);
  //  });
});
