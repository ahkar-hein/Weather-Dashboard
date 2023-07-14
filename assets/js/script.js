// Selected HTML element by using id, querySelector method and assign to variables
var cityEl = document.querySelector('#city');
var searchBtn = document.querySelector("#search");
var form = document.querySelector('#user-form')
var currentWeatherEl = document.querySelector('#currentWeatherContainer');
var fivedaysEl = document.querySelector('#fivedaysForecast')
var searchHistoryEl = document.querySelector('#searchHistory');

// api key assign to variables
var key = "fa7dfdeff2817a4b3a31fef9131a11f3";

// formSubmit function
var formSubmit = function (event) {
    // prevents the default form submission behavior when called 
    event.preventDefault();

    // get user input city name
    var cityInput = cityEl.value.trim();
    if (cityInput) {
        // if user correctly input, execute getCurrentWeather, getFivedayWeather and addSearchHistory function.
        getCurrentweather(cityInput);
        getFivedayWeather(cityInput);
        addSearchHistory(cityInput);
    } else {
        // other wise alert please enter city name
        alert("Please Enter City Name");
    }
};
// getCurrentWeather Function
var getCurrentweather = function (cityName) {
    // current weather api url assign into variable
    var CurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + key;
    // fetch the api
    fetch(CurrentWeatherApi)
        .then(function (response) {
            if(response.ok){
                response.json().then(function (data) {
                    // if api run well, displayCurrentweather function execute with data and cityNmae parameter.
                    displayCurrentweather(data, cityName);
                })
            } else {
                // otherwise error 404 will be alert.
                alert('Error:' + response.status)
            }
    })
    .catch(function (error) {
        alert('Unable to connect to Server');
    });   
};
// fivedayWeather function
var getFivedayWeather = function (cityName) {
    // fivedays weather api url assign into variable
    var fivedayweatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + key;
    // fetch the api
    fetch(fivedayweatherApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function(data) {
                    // execte the function 
                    displayFivedayforecast(data)
                })
            } else {
                alert('Error:' + response.status)
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Server');
        })
}

// display current weather function
var displayCurrentweather = function (currentData) {
    // clear the html content
    currentWeatherEl.textContent = '';
    // getting required data from the api array and assign into variables
    var currentName = currentData.name;
    var currentDate = currentData.dt;
    var currentTemp = currentData.main.temp;
    var currentWind = currentData.wind.speed;
    var currentHumidity = currentData.main.humidity;
    var description = currentData.weather[0].description;
    var currentIcon = currentData.weather[0].icon;
    
    // if statement of change the background images based on the weather condition
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

    // create the html element and display the current weather information
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

    // Appends multiple elements to the current weather information container, forming the structure of the container
    currentWeatherEl.appendChild(currentEl);
    currentEl.appendChild(setCityName);
    currentEl.appendChild(dateEl);
    currentEl.appendChild(iconEl);
    currentEl.appendChild(desEl);
    currentEl.appendChild(temperatureEl);
    currentEl.appendChild(windEl);
    currentEl.appendChild(humidityEl);
}
// function for format Date
function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
//   function for Iconurl
  function getIconUrl(icon) {
    return 'https://openweathermap.org/img/wn/'+ icon +'@2x.png'
  }
// function for fivedayforecast
function displayFivedayforecast(fivedaysData) {
    // clear the html
    fivedaysEl.innerHTML = '';
    // looping for getting require date skipping the unnesserary three hourly data
    for(var i=0; i < fivedaysData.list.length; i+=8){
        //  getting required data from the api array and assign into variables
        var date = fivedaysData.list[i].dt;
        var temp = fivedaysData.list[i].main.temp;
        var humidity = fivedaysData.list[i].main.humidity;
        var wind = fivedaysData.list[i].wind.speed;
        var weatherIcon = fivedaysData.list[i].weather[0].icon;

        // create the required multiple html element and class
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
        
        // append the multiple html element into five day weather container
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
// function for add search history 
var addSearchHistory = function(city) {
    // retrieves the search history from the browser's local storage by using the key 'searchHistory'
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    //checks if the searchHistory array does not already include the city
    if (!searchHistory.includes(city)) {
        //adds into the searchHistory array using push
      searchHistory.push(city);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      //execute the dispplay search history function
      displaySearchHistory();
    }
};

var displaySearchHistory = function() {
    searchHistoryEl.innerHTML = '';
    //getting data from localstorage
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    for (var i = 0; i < searchHistory.length; i++) {
        // create html element for display the search history
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
    // create html element for clear button
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
// event listener which listen submit button and exectue the function.
form.addEventListener("submit", formSubmit, displaySearchHistory());




