'use strict';

// Get HTML elements by their IDs
const searchLocation = document.getElementById('search');
const locationName = document.getElementById('location');
const weatherInfo = document.getElementById('weatherInfo');
const secondDayWeatherInfo = document.getElementById('secondDayWeatherInfo');
const thirdDayWeatherInfo = document.getElementById('thirdDayWeatherInfo');
const currnetTemp = document.getElementById('currentTemp');
const secondDayMaxTemp = document.getElementById('secondDayMaxTemp');
const secondDayMinTemp = document.getElementById('secondDayMinTemp');
const thirdDayMaxTemp = document.getElementById('thirdDayMaxTemp');
const thirdDayMinTemp = document.getElementById('thirdDayMinTemp');
const currentIcon = document.getElementById('currentIcon');
const secondIcon = document.getElementById('secondIcon');
const thirdIcon = document.getElementById('thirdIcon');
const currentDay = document.getElementById('currentDay');
const secondDay = document.getElementById('secondDay');
const thirdDay = document.getElementById('thirdDay');
const dayMonth = document.getElementById('dayMonth');
const weatherVideo = document.getElementById('weatherVideo');

// Arrays for days and months
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let result;
// Function to fetch weather data

async function getData(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d8ea10593f2c4435bf543048240401&q=${location}&days=3&aqi=no&alerts=no`);
    result = await response.json();
    displayWeather()
}
getData('egypt')

// Event listener for input changes in the search ba
searchLocation.addEventListener('input', function () {
        // Call the getData function when the input changes
        getData(this.value);
        // Update weather information for the current, second, and third days
        displayWeather()
})
function displayWeather(){
            // Update weather information for the current, second, and third days
            if(!result.error){                
                currentDayInfo();
                secondDayInfo();
                thirdDayInfo();
            }
}
// Function to display weather information for the current day
function currentDayInfo(){
    // Update HTML elements with the corresponding weather data
    locationName.innerHTML = result.location.name;
    currnetTemp.innerHTML = result.current.temp_c + '°C';
    currentIcon.setAttribute('src', `http:${result.current.condition.icon}`);
    weatherInfo.innerHTML = result.current.condition.text;
    if(weatherInfo.innerHTML == 'Sunny' || weatherInfo.innerHTML == 'Clear'){
        sunny()
    }
    else if(weatherInfo.innerHTML == 'Overcast' || weatherInfo.innerHTML == 'Light sleet' || weatherInfo.innerHTML == 'Partly cloudy' || weatherInfo.innerHTML == 'Cloudy' || weatherInfo.innerHTML == 'Mist'){
        overcast()
    }
    else if(weatherInfo.innerHTML == 'Light rain' || weatherInfo.innerHTML == 'Heavy rain' || weatherInfo.innerHTML == 'Light rain shower'){
        rain()
    }else{
        weatherVideo.src = 'videos/production_id_5155396 (2160p).mp4'
    }

    // Get the day, day number, and month number for the current day
    let currentDate = new Date(result.forecast.forecastday[0].date);
    currentDay.innerHTML = days[currentDate.getDay()];
    let dayNumber = currentDate.getDate();
    let monthNumber = currentDate.getMonth();
    dayMonth.innerHTML = dayNumber + "-" + months[monthNumber];
}
// Function to display weather information for the second day
function secondDayInfo() {
    // Update HTML elements with the corresponding weather data for the second day
    secondIcon.setAttribute('src', `http:${result.forecast.forecastday[1].day.condition.icon}`);
    secondDayWeatherInfo.innerHTML = result.forecast.forecastday[1].day.condition.text;
    secondDayMaxTemp.innerHTML = result.forecast.forecastday[1].day.maxtemp_c + '°C';
    secondDayMinTemp.innerHTML = result.forecast.forecastday[1].day.mintemp_c + '°C';
    
    // Get the day for the second day
    let secondDate = new Date(result.forecast.forecastday[1].date);
    secondDay.innerHTML = days[secondDate.getDay()];
}

// Function to display weather information for the third day
function thirdDayInfo() {
    // Update HTML elements with the corresponding weather data for the third day
    thirdIcon.setAttribute('src', `http:${result.forecast.forecastday[2].day.condition.icon}`);
    thirdDayWeatherInfo.innerHTML = result.forecast.forecastday[2].day.condition.text;
    thirdDayMaxTemp.innerHTML = result.forecast.forecastday[2].day.maxtemp_c + '°C';
    thirdDayMinTemp.innerHTML = result.forecast.forecastday[2].day.mintemp_c + '°C';
    
    // Get the day for the third day
    let thirdDate = new Date(result.forecast.forecastday[2].date);
    thirdDay.innerHTML = days[thirdDate.getDay()];
}
function sunny(){
    weatherVideo.src = 'videos/sky_-_36816 (Original).mp4'
}
function overcast(){
    weatherVideo.src = 'videos/overcast.mp4'
}
function rain(){
    weatherVideo.src = 'videos/storm_-_15250 (Original).mp4'
}
