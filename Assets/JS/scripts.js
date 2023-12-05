 // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
 const apiKey = '79346457f41a36e5addd987bba5ca442';
 const city = 'Miami';  // Replace with the name of your city
 const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

 // Function to convert temperature from Kelvin to Celsius
 function kelvinToCelsius(kelvin) {
     return (kelvin - 273.15).toFixed(1);
 }

 // Fetch data from OpenWeatherMap API
 fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
         const forecastContainer = document.getElementById('forecast-container');

         // Extract the 5-day forecast data
         const forecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

         // Display each day's forecast
         forecasts.forEach(forecast => {
             const date = new Date(forecast.dt_txt);
             const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
             const temperature = kelvinToCelsius(forecast.main.temp);

             const dayElement = document.createElement('div');
             dayElement.classList.add('day');
             dayElement.innerHTML = `
                 <h3>${dayOfWeek}</h3>
                 <p>${temperature} °C</p>
             `;

             forecastContainer.appendChild(dayElement);
         });
     })
     .catch(error => console.error('Error fetching data:', error));