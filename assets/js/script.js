var cityEl = document.querySelector('#city');
var searchBtn = document.querySelector("#search");
var form = document.querySelector('#user-form')
var currentWeatherEl = document.querySelector('#currentWeatherContainer');
var key = "fa7dfdeff2817a4b3a31fef9131a11f3";

var formSubmit = function (event) {
    event.preventDefault();

    var cityInput = cityEl.value.trim();
    if (cityInput) {
        getCurrentweather(cityInput);
        currentWeatherEl.textContent = '';
    } else {
        alert("Please Enter City Name");
    }
};

var getCurrentweather = function (cityName) {
    var CurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&unit=metric&appid=" + key;
    fetch(CurrentWeatherApi)
    .then(function (response) {
        if(response.ok){
            response.json().then(function (data) {
                // displayCurrentweather(data, cityName);
                console.log(response);
                console.log(data, cityName)
            })
        } else {
            alert('Error:' + response.status)
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Server');
    });   
};


form.addEventListener("submit", formSubmit);

