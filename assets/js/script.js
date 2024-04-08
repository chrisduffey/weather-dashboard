// global variable
var apiKey = 'ecd683ba8b864d9192d530fdce8e639c';
var savedLocations = [];


// searched locations
var searchHistory = function(cityName) {
$('.recent-search:contains("' + cityName + '")').remove();


// city input
var searchHistoryInput = $("<p>");
searchHistoryInput.addClass("recent-search");
searchHistoryInput.text(cityName);

// create container for searches
var searchContainer = $("<div>");
searchContainer.addClass("recent-search-container");

// append search container
searchContainer.append(searchHistoryInput);

// append inputs to the container
var searchContainerEl = $("#recent-search-container");
searchContainerEl.append(searchContainer);

// if statement
if (savedLocations.length > 0) {
    var recentSavedLocations = localStorage.getItem("savedLocations");
    savedLocations = JSON.parse(recentSavedLocations);
}

// add city to array
savedLocations.push(cityName);
localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

// reset search
$("#search-input").val("");

};

// put saved location in history div
var loadSearchLocation = function() {
    var savedLoctionHisotry = localStorage.getItem("savedLocations");

    // if statement for no prevoise saved location
    if (!savedLoctionHisotry) {
        return false;

    }
    savedLoctionHisotry = JSON.parse(savedLoctionHisotry);

    for (var i = 0; i < savedLoctionHisotry.length; i++) {
        searchHistoryList(savedLoctionHisotry[i]);
    }
};

var currentWeatherSection = function(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;

        fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}')
    })
    
}
