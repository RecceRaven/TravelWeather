const apiKey = '79346457f41a36e5addd987bba5ca442';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const endpoint = 'forecast';

function searchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const forecast = document.getElementById('forecast');
    const searchButton = document.getElementById('searchButton');

    // Use fetch to get current weather
    fetch(`${baseUrl}/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Handle weather data and update weatherInfo div
            // You can access data.main.temp, data.weather, etc.
            weatherInfo.innerHTML = `<p>Current temperature: ${data.main.temp}°C</p>`;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            weatherInfo.innerHTML = '<p>Error fetching weather data</p>';
        });

    // Use fetch to get 5-day forecast
    fetch(`${baseUrl}/${endpoint}?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Handle forecast data and update forecast div
            // You can access data.list for individual forecast entries
            forecast.innerHTML = '<p>5-day forecast:</p>';
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            forecast.innerHTML = '<p>Error fetching forecast data</p>';
        });

    // Store previous searches using localStorage
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    previousSearches.push(cityInput);
    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));

    // Update previous searches div
    displayPreviousSearches();
}

function displayPreviousSearches() {
    const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
    const previousSearchesDiv = document.getElementById('previousSearches');
    previousSearchesDiv.innerHTML = '<p>Previous Searches:</p>';
    
    previousSearches.forEach(search => {
        previousSearchesDiv.innerHTML += `<p>${search}</p>`;
    });
}

// Initial display of previous searches
displayPreviousSearches();

searchButton.addEventListener('click', searchWeather);
