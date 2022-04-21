const clockElement = document.querySelector('.clock');
const buttons = document.querySelectorAll('.format button')
let format;

setInterval(time, 1000);

function time() {
    format = clockElement.getAttribute('data-format')
    const date = new Date;
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    const timeStatus = (hour > 12) ? 'AM' : 'PM'

    if (format === '12') {
        hour = (hour > 12) ? hour % 12 : hour;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    clockElement.innerHTML = `<h1>${hour} : ${minutes} : ${seconds} ${timeStatus}</h1> \n <h6>${day}.${month}.${year}</h6>`;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        format = button.getAttribute('data-format');
        clockElement.setAttribute('data-format', format);
        time();
    })
})
