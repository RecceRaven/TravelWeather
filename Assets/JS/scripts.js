const apiKey = '79346457f41a36e5addd987bba5ca442';
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const endpoint = 'forecast';

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const forecast = document.getElementById('forecast');

    function searchWeather(city) {
        const cityName = city.trim();

        if (!cityName) {
            alert('Please enter a city name');
            return;
        }

        fetch(`${baseUrl}/weather?q=${cityName}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                // Handle weather data and update weatherInfo div
                weatherInfo.innerHTML = `<p>Current temperature: ${data.main.temp}°C <br>Feels like: ${data.main.feels_like}°C <br>Humidity: ${data.main.humidity}<br>Wind Speed: ${data.wind.speed} km/hr </p>`;
                // Call saveSearch after successful weather data retrieval
                saveSearch(cityName);
            })
            .catch(error => {
                console.error('Error fetching current weather:', error);
                weatherInfo.innerHTML = '<p>Error fetching weather data</p>';
            });

        // Use fetch to get 5-day forecast
        fetch(`${baseUrl}/${endpoint}?q=${cityName}&appid=${apiKey}&units=metric`)
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

    function saveSearch(city) {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

        // Keep only the last 5 searches
        previousSearches.push(city);
        if (previousSearches.length > 5) {
            previousSearches.shift();
        }

        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));

        // Update previous searches div
        displayPreviousSearches();
        console.log('Saved searches:', previousSearches);
    }

    // Function to display previous searches in the UI
    function displayPreviousSearches() {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        const previousSearchesDiv = document.getElementById('previousSearches');
        previousSearchesDiv.innerHTML = '<p>Previous Searches:</p>';

        previousSearches.forEach((search, index) => {
            // Create a link for each search
            const link = document.createElement('a');

            link.textContent = search;
            link.href = '#';
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default link behavior
                cityInput.value = search; // Set the input field value to the clicked city
                searchWeather(search);
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

    // Attach event listener without parentheses
    searchButton.addEventListener('click', function () {
        searchWeather(cityInput.value);
    });
});
