//Select elements

const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

// App data 

const weather = {}

weather.temperature = {
  unit: "celsius"
}

//App constants and lets

const KELVIN = 273

//API KEY

const APIKEY = '65f09e6364c2b52d60f9dc2fc731d09e'

//Check if browser supports geolocation

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
  notificationElement.style.display = "block"
  notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}

//Set user's position 

function setPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  getWeather(lat, lon)
}

//Show error when there is an issue with geolocation service

function showError(error) {
  notificationElement.style.display = "block"
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//Get weather from api provider 

function getWeather(lat, lon){
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`

  fetch(api)
  .then(function(response){
    let data = response.json()
    return data
    
  })
  .then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN)
    weather.description = data.weather [0].description
    weather.iconId = data.weather[0].icon
    weather.city = data.name
    weather.country = data.sys.country
  })
  .then(function(){
    displayWeather()
  })
  
}

//Display weather to UI

function displayWeather () {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
  tempElement.innerHTML = `${weather.temperature.value}º<span>C</span>`
  descElement.innerHTML = weather.description
  locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

//C fo F conversion

function celsiusToFahrenheit(temperature) {
  return (temperature * 9/5) +32
}

//Event click on temperature

tempElement.addEventListener("click", function() {
  if (weather.temperature.value === undefined) return
  if(weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
    fahrenheit = Math.floor(fahrenheit)

    tempElement.innerHTML = `${fahrenheit}º<span>F</span>`
    weather.temperature.unit = "fahrenheit"

  } else {
   tempElement.innerHTML = `${weather.temperature.value}º<span>C</span>`
   weather.temperature.unit = "celsius"
  }
})
