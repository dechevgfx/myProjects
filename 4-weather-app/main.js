let weather = {

    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ac56af183efca5c6bd28daeb4206376f`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => { alert("The place was not found!") })
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, country, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name + ", " + country;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${(parseFloat(temp)).toFixed(1)}°C`;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

let searchBtn = document.querySelector(".search button");
let searchBar = document.querySelector(".search-bar");
function clear() {
    document.querySelector('.search-bar').value = ''
}

searchBtn.addEventListener("click", function () {
    weather.search();
    clear()
});


searchBar.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        weather.search()
        clear();
    }
});
