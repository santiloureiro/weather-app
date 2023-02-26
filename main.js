const apiKey = "13f9f9f523d7b215ae85633e2304e5f9"

let inputValue = ""

const msg = document.querySelector("#error-message")

let weatherCardContainer = document.querySelector("#info-container")

let queryInfo;

let weatherCard;

const getInputVal = () => {
    let val = document.querySelector("#search-bar").value
    console.log(val)
    inputValue = val;
}

const buildWeatherCard = () => {
    const icon = `https://openweathermap.org/img/wn/${queryInfo.weather[0].icon}@2x.png`;

    let weatherCard = `
                <div id="weather-container">
                <div id="city-close-container">
                    <button onclick="eraseCity()" id="city-close"><i class="fa-regular fa-rectangle-xmark"></i></button>
                </div>
                <div class="city-info"><span id="city-name">${queryInfo.name}</span><span id="city-country">${queryInfo.sys.country}</span></div>
                <div class="city-temp">${Math.round(queryInfo.main.temp)}<span id="city-temp-celsius">°C</span></div>
                <div class="city-temp-maxmin"><span id="city-temp-min"><i class="fa-solid fa-temperature-arrow-down"></i> ${Math.round(queryInfo.main.temp_min)}°C</span><span id="city-temp-max"><i class="fa-solid fa-temperature-arrow-up"></i> ${Math.round(queryInfo.main.temp_max)}°C</span></div>
                    <div class="city-weather"><img id="city-weather-img" src=${icon}><p id="city-weather-description">${queryInfo.weather[0].description.toUpperCase()}</p></div>
                </div>`
        
    
    return weatherCard
}

const eraseCity = () => {
    weatherCardContainer.innerHTML = ""
}

const appendWeatherCard = () => {
    
    weatherCard = buildWeatherCard()
    
    weatherCardContainer.innerHTML = weatherCard
}

const getWeather = () => {

    getInputVal()

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`

    fetch(url).then((response) => {
        if (response.ok) {
          msg.textContent = ""
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        console.log(responseJson)
        queryInfo = responseJson
        appendWeatherCard()
      })
      .catch((error) => {
        console.log(error)
        msg.textContent = "Search for a valid location!"
        setTimeout(() => {
            msg.textContent = ""
        }, 3000);
      });
}

