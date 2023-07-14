var cityEl = document.querySelector('#city');
var searchBtn = document.querySelector("#search");
var form = document.querySelector('#user-form')
var currentWeatherEl = document.querySelector('#currentWeatherContainer');
var fivedaysEl = document.querySelector('#fivedaysForecast')
var searchHistoryEl = document.querySelector('#searchHistory');

var key = "fa7dfdeff2817a4b3a31fef9131a11f3";

var formSubmit = function (event) {
    event.preventDefault();

    var cityInput = cityEl.value.trim();
    if (cityInput) {
        getCurrentweather(cityInput);
        getFivedayWeather(cityInput);
        addSearchHistory(cityInput);
    } else {
        alert("Please Enter City Name");
    }
};

var getCurrentweather = function (cityName) {
    var CurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + key;
    fetch(CurrentWeatherApi)
        .then(function (response) {
            if(response.ok){
                response.json().then(function (data) {
                    displayCurrentweather(data, cityName);
                    // console.log(response);
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

var getFivedayWeather = function (cityName) {
    var fivedayweatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + key;
    fetch(fivedayweatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayFivedayforecast(data)
                    // console.log(data);
                })
            } else {
                alert('Error:' + response.status)
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Server');
        })
}

var displayCurrentweather = function (currentData) {
    currentWeatherEl.textContent = '';

    var currentName = currentData.name;
    var currentDate = currentData.dt;
    var currentTemp = currentData.main.temp;
    var currentWind = currentData.wind.speed;
    var currentHumidity = currentData.main.humidity;
    var description = currentData.weather[0].description;
    var currentIcon = currentData.weather[0].icon;
    // console.log(currentName, currentDate, currentTemp, currentWind, currentHumidity);
    
    if (description.includes('clear')) {
        document.body.style.backgroundImage = "url('./assets/images/clear.jpg')";
    } else if (description.includes('thunderstorm')) {
        document.body.style.backgroundImage = "url('./assets/images/thunderstrom.jpg')";
    } else if (description.includes('rain')) {
        document.body.style.backgroundImage = "url('./assets/images/rain.jpg')";
    } else {
        // Default background image for other weather conditions
        document.body.style.backgroundImage = "url('./assets/images/clear.jpg')";
    }

    var currentEl = document.createElement('div');
    currentEl.classList = 'list-item flex-row justify-space-between align-center';

    var setCityName = document.createElement('h1');
    setCityName.textContent = currentName;

    var dateEl = document.createElement('span');
    dateEl.classList = 'date';
    dateEl.textContent = formatDate(currentDate);

    var iconEl = document.createElement('img');
    iconEl.classList = 'weather-icon';
    iconEl.src = getIconUrl(currentIcon);
    iconEl.alt = 'Weather Icon';

    var desEl = document.createElement('li');
    desEl.textContent = 'Condition: ' + description;

    var temperatureEl = document.createElement('li');
    temperatureEl.textContent = 'Temperature: ' + currentTemp + '°F';

    var windEl = document.createElement('li');
    windEl.textContent = 'Wind Speed: ' + currentWind + ' m/s';

    var humidityEl = document.createElement('li');
    humidityEl.textContent = 'Humidity: ' + currentHumidity + '%';

    currentWeatherEl.appendChild(currentEl);
    currentEl.appendChild(setCityName);
    currentEl.appendChild(dateEl);
    currentEl.appendChild(iconEl);
    currentEl.appendChild(desEl);
    currentEl.appendChild(temperatureEl);
    currentEl.appendChild(windEl);
    currentEl.appendChild(humidityEl);
}
function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  function getIconUrl(icon) {
    return 'https://openweathermap.org/img/wn/'+ icon +'@2x.png'
  }

function displayFivedayforecast(fivedaysData, city) {

    fivedaysEl.innerHTML = '';
    for(var i=0; i < fivedaysData.list.length; i+=8){
        console.log(fivedaysData.list[i])
        var date = fivedaysData.list[i].dt;
        var temp = fivedaysData.list[i].main.temp;
        var humidity = fivedaysData.list[i].main.humidity;
        var wind = fivedaysData.list[i].wind.speed;
        var weatherIcon = fivedaysData.list[i].weather[0].icon;

        var cardContainer = document.createElement('div');
        cardContainer.classList = 'col';
    
        var card = document.createElement('div');
        card.classList = 'card';
    
        var cardBody = document.createElement('div');
        cardBody.classList = 'card-body';
    
        var dateEl = document.createElement('h5');
        dateEl.classList = 'card-title';
        dateEl.textContent = formatDate(date);

        var iconEl = document.createElement('img');
        iconEl.classList = 'weather-icon';
        iconEl.src = getIconUrl(weatherIcon);
        iconEl.alt = 'Weather Icon';
    
        var temperatureEl = document.createElement('p');
        temperatureEl.classList = 'card-text';
        temperatureEl.textContent = 'Temperature: ' + temp + '°F';
    
        var windEl = document.createElement('p');
        windEl.classList = 'card-text';
        windEl.textContent = 'Wind Speed: ' + wind + ' m/s';
    
        var humidityEl = document.createElement('p');
        humidityEl.classList = 'card-text';
        humidityEl.textContent = 'Humidity: ' + humidity + '%';
    
        cardBody.appendChild(dateEl);
        cardBody.appendChild(iconEl);
        cardBody.appendChild(temperatureEl);
        cardBody.appendChild(windEl);
        cardBody.appendChild(humidityEl);
    
        card.appendChild(cardBody);
    
        cardContainer.appendChild(card);
    
        fivedaysEl.appendChild(cardContainer);
    }
}
var addSearchHistory = function(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
      searchHistory.push(city);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      displaySearchHistory();
    }
};

var displaySearchHistory = function() {
    searchHistoryEl.innerHTML = '';
  
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement('a');
      historyItem.classList = 'history-item list-group-item list-group-item-action';
      historyItem.textContent = searchHistory[i];
      historyItem.setAttribute('data-city', searchHistory[i]);
  
      historyItem.addEventListener('click', function() {
        var city = this.getAttribute('data-city');
        getCurrentweather(city);
        currentWeatherEl.textContent = '';
        getFivedayWeather(city);
      });
        searchHistoryEl.appendChild(historyItem);
    }
        var clearBtn = document.createElement('a');
        clearBtn.classList = 'clear-item list-group-item list-group-item-action';
        clearBtn.setAttribute('style', 'color:red');
        clearBtn.textContent = 'Clear History';
        clearBtn.addEventListener('click', function() {
        clearSearchHistory();
        });
        searchHistoryEl.appendChild(clearBtn);
        var clearSearchHistory = function() {
            localStorage.clear();
            displaySearchHistory();
          }
  };

form.addEventListener("submit", formSubmit, displaySearchHistory());




