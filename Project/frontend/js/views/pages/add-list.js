import Component from '../component.js';

import AllFish from '../../models/allfish.js';


class AddAndList extends Component {
	constructor() {
		super();
		
		this.model = new AllFish();
	}

    getData() {
        return new Promise(resolve => this.model.getFishList().then(allFish => resolve(allFish)));
    }
	
    render(allFish) {
		return new Promise(resolve => {
			resolve(`
				<div class="container">
                    <div class="app-title">
                        <h1>Регион</h1>
                    </div>
                <div class="inner-container">
                    <div class="icon">
                        <img src="images/icons/city.png" alt="">
                    </div>
                    <div class="choose-container">
                        <label>Страна:
                        <select name="" id="country">
                            <option disabled selected>Выберите страну</option>
                            <option value="BY">Belarus</option>
                            <option value="RU">Russia</option>
                            <option value="UA">Ukraine</option>
                        </select>
                        </label>
                        <label>Город:
                        <select name="" id="city">
                        </select>
                        </label>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="app-title">
                    <h1>Погода</h1>
                </div>
                <div class="notification"></div>
                <div class="inner-container">
                    <div class="weather-icon">
                        <img src="images/icons/unknown.png" alt="">
                    </div>
                    <div class="temperature-value">
                        <p>- °<span>C</span></p>
                    </div>
                    <div class="pressure-value">
                        <p>- <span>hpa</span></p>
                    </div>
                    <div class="wind-speed">
                        <p>- <span>m/s</span></p>
                    </div>
                    <div class="temperature-description">
                        <p> - </p>
                    </div>
                    <div class="location">
                        <p>-</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="app-title">
                    <h1>Вид рыбы</h1>
                </div>
                <div class="inner-container">
                    <div class="icon">
                        <img src="images/icons/fish.png" alt="">
                    </div>
                    <div class="choose-container">
                    ${allFish.map(fish => AddAndList.getTaskHTML(fish)).join('\n ')}                    
                    </div>
                </div>
            </div>
            <div class="fish-forecast">                
            </div>                    
			`);
		});
    }

    afterRender() {
        this.setActions();
    }

    static getTaskHTML(fish) {
        return `
            <button class="fish" data-name="${fish.name}" data-description="${fish.description}" data-image="${fish.img}">
            <img src="images/${fish.img}"><span>${fish.name}</span></button>
        `;
    }

    setActions() {
        const countrySelect = document.getElementById('country'),
              citySelect = document.getElementById('city'),
              iconElement = document.querySelector(".weather-icon"),
              tempElement = document.querySelector(".temperature-value p"),
              pressureElement = document.querySelector(".pressure-value p"),
              windElement = document.querySelector(".wind-speed p"),
              descElement = document.querySelector(".temperature-description p"),
              locationElement = document.querySelector(".location p"),
              notificationElement = document.querySelector(".notification"),
              addFishButtons = document.getElementsByClassName('choose-container')[1],
              fishDescription = document.getElementsByClassName('fish-forecast')[0];

        const weather = {};

        weather.temperature = {
            unit : "celsius"
        };

        const KELVIN = 273;

        const key = "82005d27a116c2880c8f0fcb866998a0";

        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(setPosition, showError);
        }else{
            notificationElement.style.display = "block";
            notificationElement.innerHTML = `<p>Browser doesn't support geolocation</p>`;
        }

        function setPosition(position){
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            getWeather(latitude, longitude);
        }

        function showError(error){
            notificationElement.style.display = "block";
            notificationElement.innerHTML = `<p> ${error.message} </p>`;
        }

        function getWeather(latitude, longitude){
            let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

            fetch(api)
                .then(function(response){
                    let data = response.json();
                    return data;
                })
                .then(function(data){
                    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                    weather.description = data.weather[0].description;
                    weather.iconId = data.weather[0].icon;
                    weather.pressure = data.main.pressure;
                    weather.wind = data.wind.speed;
                    weather.city = data.name;
                    weather.country = data.sys.country;
                })
                .then(function(){
                    displayWeather();
                });
        }

        function displayWeather(){
            iconElement.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            pressureElement.innerHTML = `${weather.pressure} <span>hpa</span>`;
            windElement.innerHTML = `${weather.wind} <span>m/s</span>`;
            descElement.innerHTML = weather.description;
            locationElement.innerHTML = `${weather.city}, ${weather.country}`;

            if (fishDescription.children.length) {
                showForecastBite();
            }
        }

        function celsiusToFahrenheit(temperature){
            return (temperature * 9/5) + 32;
        }

        tempElement.addEventListener("click", function(){
            if(weather.temperature.value === undefined) return;

            if(weather.temperature.unit == "celsius"){
                let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
                fahrenheit = Math.floor(fahrenheit);

                tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
                weather.temperature.unit = "fahrenheit";
            }else{
                tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
                weather.temperature.unit = "celsius"
            }
        });
              addCity();

        function addCity(){
            let api = `current.city.list.min.json`;

            fetch(api)
                .then(function(response){
                    let data = response.json();
                    return data;
                })
                .then(function(data){


                    countrySelect.onchange = function(){
                        let cityList = '';

                        for (let key in data) {
                            if (data[key].country === $('#country option:selected').val()) {
                                cityList += `<option data-latitude="${data[key].coord.lat}" 
                             data-longitude="${data[key].coord.lon}">${data[key].name}</option>`;
                            }
                        }

                        citySelect.innerHTML = cityList;
                    };

                    citySelect.onchange = function() {
                        let latitude = $('#city option:selected').data('latitude'),
                            longitude = $('#city option:selected').data('longitude');
                        notificationElement.style.display = "none";

                        getWeather(latitude, longitude);
                    };
                })
        }

        addFishButtons.addEventListener('click', function (event) {
            let target = event.target,
                showFish = '';

            while (target != this) {
                if (target.tagName === 'BUTTON') {
                    showFish = `<div class="fish-forecast__title">
                    <h1>Прогноз клёва</h1>
                        </div>
                    <div class="fish-container">
                            <div class="fish-logo"><img src="images/${target.dataset.image}"/><span>${target.dataset.name}</span></div>                            
                            <div class="fish-description">${target.dataset.description}</div>                                      
                    </div>
                    <div class="fish-forecast__bite"></div>
                    `;
                    fishDescription.innerHTML = showFish;
                }
                target = target.parentNode;
            }
            showForecastBite();
        });

        function showForecastBite() {
            const fishForecast = document.getElementsByClassName('fish-forecast__bite')[0];
            let html = `<div>${weather.temperature.value}</div>`;

            fishForecast.innerHTML = html;
        }
    }
}

export default AddAndList;