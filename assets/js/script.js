// global variable
const apiKey = 'ecd683ba8b864d9192d530fdce8e639c';
let savedLocations = [];


// searched locations
const recentSearchs = document.querySelector('.recent-search');
recentSearchs.forEach(element => {
    if (element.textContent.includes(cityName)) {
        element.parentNode.removeChild(element);
    }
});


// city input
const searchHistoryInput = document.createElement("p");
searchHistoryInput.classList.add("recent-search");
searchHistoryInput.textContent = cityName;

// create container for searches
const searchContainerEL = document.getElementById('recent-search-container');
const searchContainer = document.createElement('div');
searchContainer.classList.add('recent-search-container');
searchContainer.appendChild(searchHistoryInput);
searchContainerEL.appendChild(searchContainer);


if (savedLocations.length > 0) {
    const recentSavedLocations = localStorage.getItem("savedLocations");
    savedLocations = json.parse(recentSavedLocations);
}



// add city to array
savedLocations.push(cityName);
localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

// reset search
document.getElementById("search-input").value = "";



// put saved location in history div
const loadSearchLocation = () => {
    let savedLoctionHisotry = localStorage.getItem("savedLocations");

    // if statement for no prevoise saved location
    if (!savedLoctionHisotry) {
        return false;

    }
    savedLoctionHisotry = JSON.parse(savedLoctionHisotry);

    for (var i = 0; i < savedLoctionHisotry.length; i++) {
        searchHistoryList(savedLoctionHisotry[i]);
    }
};

const currentWeatherSection = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`)
        .then(response => response.json())
        .then(response => {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}`)

        })
        .then(response => response.json())
        .then(response => {
            searchHistoryList(cityName);

            const currentWeatherCont = document.getElementById("current-weather-cont");
            currentWeatherCont = classList.add("current-weather-cont");

            let currentTitle = document.getElementById("current-header");
            let currentDay = moment().format("MM/DD/YYYY");
            currentTitle.textContent = `${cityName} (${currentDay})`;

            let currentIcon = document.getElementById("current-weather-icon");
            currentIcon.classList.add("current-weather-icon");
            let currentIconCode = response.current.weather[0].icon;
            currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

            let currentTemperature = document.getElementById("current-temperature");
            currentTemperature.textContent = "Temperature: " + response.current.temp + " \u00B0F";

            let currentHumidity = document.getElementById("current-humidity");
            currentHumidity.textContent = "Humidity: " + response.current.humidity + "%";

            let currentWindSpeed = document.getElementById("current-wind-speed");
            currentWindSpeed.textContent = "Wind Speed: " + response.current.wind_speed + "MPH";

            let currentUvIndex = document.getElementById("currnet-uv-index");
            currentUvIndex.textContent = "UV: " + response.current.uvi;

        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
};

const fiveDayForecastSection = (cityName) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

    .then 
}


         
                





