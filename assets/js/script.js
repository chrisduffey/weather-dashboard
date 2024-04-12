// global variable
const apiKey = 'ecd683ba8b864d9192d530fdce8e639c';
let savedLocations = [];


// searched locations
function removeExistingSearch(cityName) {
    const recentSearchElements = document.querySelectorAll('.recent-search');
    recentSearchElements.forEach(element =>{
        if (element.textContent === cityName) {
            element.parentNode.removeChild(element);
        }
    });
}
document.getElementById("search-form").addEventListener("submit", function(event) { 
    event.preventDefault();
    
    
    const cityName = document.getElementById("search-input").value.trim();
    
    if(cityName===""){
        alert("Please enter name of city.");
        return;
    }
    if (savedLocations.includes(cityName)){
        alert("This city is already in your recent searches.");
        return;
    }

    removeExistingSearch(cityName);

    savedLocations.push(cityName);
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
});
const searchHistoryInput = document.createElement("p");
searchHistoryInput.classList.add("recent-search");
searchHistoryInput.textContent = cityName;

    // city input
    const searchHistoryContainer = document.getElementById("search-history-container");
    searchHistoryContainer.appendChild(searchHistoryInput);


// create container for searches
const searchContainerEL = document.getElementById('recent-search-container');
const searchContainer = document.createElement('div');
searchContainer.classList.add('recent-search-container');
searchContainer.appendChild(searchHistoryInput);
searchContainerEL.appendChild(searchContainer);

if (savedLocations.length > 0) {
    const recentSavedLocations = localStorage.getItem("savedLocations");
    savedLocations = JSON.parse(recentSavedLocations);
}

if (localStorage.getItem("savedLocations")) {
    savedLocations = JSON.parse(localStorage.getItem("savedLocations"));
}

const loadSearchHistory = () => {
    let savedLocationsHistory = localStorage.getItem("savedLocations");
    if (!savedLocationsHistory) {
        return false;
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

            const currentTitle = document.getElementById("current-header");
            let currentDay = moment().format("MM/DD/YYYY");
            currentTitle.textContent = `${cityName} (${currentDay})`;

            const currentIcon = document.getElementById("current-weather-icon");
            currentIcon.classList.add("current-weather-icon");
            const currentIconCode = response.current.weather[0].icon;
            currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

            const currentTemperature = document.getElementById("current-temperature");
            currentTemperature.textContent = "Temperature: " + response.current.temp + " \u00B0F";

            const currentHumidity = document.getElementById("current-humidity");
            currentHumidity.textContent = "Humidity: " + response.current.humidity + "%";

            const currentWindSpeed = document.getElementById("current-wind-speed");
            currentWindSpeed.textContent = "Wind Speed: " + response.current.wind_speed + "MPH";

            const currentUvIndex = document.getElementById("currnet-uv-index");
            currentUvIndex.textContent = "UV: " + response.current.uvi;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

const fiveDayForecastSection = (cityName) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)

    .then(response => response.json())
    .then(response => {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            var futureCard = document.getElementById("future-forecast-title");
            futureForecastTitle.innerText = "5-Day Forecast";

            for (var i = 1; i <= 5; i++) {
                var futureCard = document.createElement("div");
                futureCard.classList.add("card", "future-card-details");

                var futureDate = document.createElement("p");
                futureDate.innerText = moment().add(i, "d").format("MM/DD/YYYY");

                var futureIcon = document.createElement("img");
                futureIcon.classList.add("future-icon");
                var futureIconCode = response.daily[i].weather[0].icon;
                futureIcon.src = `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`;

                var futureTemp = document.getElementById("p");
                futureTemp.innerText = "Temp: " + response.daily[i].temp.day + "\u00B0F";

                var futureHumidity = document.createElement("p");
                futureHumidity.innerText = "Humidity: " + response.daily[i].humidity + "%";

                futureCard.appendChild(futureDate);
                futureCard.appendChild(futureIcon);
                futureCard.appendChild(futureTemp);
                futureCard.appendChild(futureHumidity);
                
                document.getElementById("future-forecast-container").appendChild(futureCard);

            }
        })
        
    })
};

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var cityName = document.getElementById("search-input").value;

    if (cityName === "" || cityName == null) {
        alert("Please enter name of city.");
        event.preventDefault();

    }else {
        currentWeatherSection(cityName);
        fiveDayForecastSection(cityName);
    }
});
loadSearchHistory(); 
// })                