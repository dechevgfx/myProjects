

const clockElement = document.querySelector('.clock');

setInterval(time, 1000);

function time() {
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let now = date.toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
    clockElement.innerHTML = `<h1>${time}</h1> \n <h6>${now}</h6>`;
}
