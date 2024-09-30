document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = '61d3dac2c74f076f800093a7db807891'; // Your OpenWeatherMap API key
    
    if (city === "") {
    document.getElementById('weatherResult').innerHTML = '<p>Please enter a city name.</p>';
    return;
    }
    
    // Fetch weather data from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
    if (!response.ok) {
    throw new Error("City not found or API request failed.");
    }
    return response.json();
    })
    .then(data => {
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherMain = data.weather[0].main.toLowerCase(); // Get main weather description (e.g., "Clear", "Clouds", etc.)
    
    // Change background based on weather condition
    changeBackground(weatherMain);
    
    // Front side: city name and weather icon
    const frontCard = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    `;
    document.getElementById('flipCardFront').innerHTML = frontCard;
    
    // Back side: detailed weather forecast
    const weatherInfo = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp.toFixed(1)}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherInfo;
    
    // Add a class to flip the card
    document.querySelector('.flip-card').classList.add('flipped');
    
    // Remove the class after 5 seconds to flip the card back
    setTimeout(() => {
    document.querySelector('.flip-card').classList.remove('flipped');
    }, 5000);
    })
    .catch(error => {
    document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    });
    });
    
    // Function to change the background based on weather condition
    function changeBackground(weatherMain) {
    let backgroundUrl = '';
    
    switch (weatherMain) {
    case 'clear sky':
    backgroundUrl = 'https://images.unsplash.com/photo-1609376224342-8902c39a3675?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsZWFyJTIwYmx1ZSUyMHNreXxlbnwwfHwwfHx8MA%3D%3D'; // Clear sky image
    break;
    case 'overcast clouds':
    backgroundUrl = 'https://sunmodo.com/wp-content/uploads/2015/08/solar-on-cloudy-days.jpg';
    break;
    case 'scattered clouds':
    backgroundUrl = 'https://live.staticflickr.com/2106/1909487867_de140c7eb8_b.jpg';
    break;
    case 'rain':
    backgroundUrl = 'https://media.istockphoto.com/id/503284599/photo/rainy-weather.jpg?s=612x612&w=0&k=20&c=pV38CVp0CLArYEZ6OUWnaqo6J5mo4JpbEZd61Vxr_I4='; // Rainy sky image
    break;
    case 'snow':
    backgroundUrl = 'https://media.wired.com/photos/65e83b39f0b1b3977f10f101/master/w_1600%2Cc_limit/iStock-613015246.jpg'; // Snowy weather image
    break;
    case 'thunderstorm':
    backgroundUrl = 'https://s.w-x.co/thunderstormasthma.jpg'; // Thunderstorm image
    break;
    case 'mist':
    backgroundUrl = 'https://static.wikia.nocookie.net/weather/images/f/fc/Fog.jpeg/revision/latest?cb=20120804193216'; // Foggy weather image
    break;
    case 'haze':
    backgroundUrl = 'https://static.wikia.nocookie.net/weather/images/f/fc/Fog.jpeg/revision/latest?cb=20120804193216'; // Foggy weather image
    break;
    default:
    backgroundUrl = 'https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg'; // Default fallback image
    break;
    }
    
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    }