const apiKey = '79346457f41a36e5addd987bba5ca442';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const endpoint = 'forecast';

document.addEventListener('DOMContentLoaded', function () {

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
                weatherInfo.innerHTML = `<p>Current temperature: ${data.main.temp}°C <br> Feels like ${data.main.feels_like}°C</p>`;
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
                forecast.innerHTML = '<p>5-day forecast:</p>';

                data.list.forEach(entry => {
                    // Check if the timestamp is around noon
                    if (entry.dt_txt.includes('12:00')) {
                        forecast.innerHTML += `<p>${entry.dt_txt}: ${entry.main.temp}°C</p>`;
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching forecast:', error);
                forecast.innerHTML = '<p>Error fetching forecast data</p>';
            });
    }

    // Function to save a search to localStorage
    function saveSearch(cityInput) {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

        // Keep only the last 5 searches
        previousSearches.push(cityInput);
        if (previousSearches.length > 5) {
            previousSearches.shift(); // Remove the oldest search
        }

        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));

        // Update previous searches div
        displayPreviousSearches();
    }

    // Function to display previous searches in the UI
    function displayPreviousSearches() {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        const previousSearchesDiv = document.getElementById('previousSearches');
        previousSearchesDiv.innerHTML = '<p>Previous Searches:</p>';

        previousSearches.forEach((search, index) => {
            // Create a link for each search
            const link = document.createElement('a');
            link.href = '#'; // You can set a link to perform a specific action if needed
            link.textContent = search;
            link.addEventListener('click', () => {
                // Handle the click event (e.g., perform a new search with the selected city)
                // For now, you can just log the selected city to the console
                console.log(`Clicked on search: ${search}`);
            });

            // Append the link to the previousSearchesDiv
            previousSearchesDiv.appendChild(link);

            // Add a separator (comma) between links, except for the last one
            if (index < previousSearches.length - 1) {
                previousSearchesDiv.appendChild(document.createTextNode(', '));
            }
        });
    }

    // Initial display of previous searches
    displayPreviousSearches();

    // Your JavaScript code here
    searchButton.addEventListener('click', searchWeather);
});