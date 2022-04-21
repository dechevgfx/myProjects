//Взимаме всички елементи от HTML файла.
const displayOneElement = document.querySelector('.display-1');
const displayTwoElement = document.querySelector('.display-2');
const displayTempElement = document.querySelector('.temp-result-display');
const numbersElements = document.querySelectorAll('.numbers');
const operationElements = document.querySelectorAll('.operations');
const equalElement = document.querySelector('.equal');
const clearAllElement = document.querySelector('.all-clear');
const clearElement = document.querySelector('.last-entity-clear');

//Създаваме променливите с които ще работим.
let displayFirstNumber = "";
let displaySecondNumber = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let isThereA0BeforeDot = false

numbersElements.forEach(numbers => {
    numbers.addEventListener('click', (e) => {
        if (e.target.innerText === "." && !haveDot) { //Ако натиснем десетичната запетая и не сме я натискали преди това, то правим haveDot = true.
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) { //Ако натиснем десетичната запетая и ВЕЧЕ СМЕ Я ПОЛЗВАЛИ, то ние не искаме да я полчваме отново, защото десетична запетая се използва само веднъж в този случай и за това използваме return.
            return;
        }

        if (!isThereA0BeforeDot && e.target.innerText === "0" && !haveDot) {
            isThereA0BeforeDot = true;
        } else if (isThereA0BeforeDot && e.target.innerText === "0" && !haveDot) {
            return;
        }
        displaySecondNumber += e.target.innerText; //Ако започнем да пишем число, за да е цяло а не разделено конкатенираме подаваните стойности.
        displayTwoElement.innerText = displaySecondNumber //Извеждаме числата на дисплея.

    })
});

operationElements.forEach(operations => {
    operations.addEventListener('click', (e) => {
        if (!displaySecondNumber) return;
        haveDot = false; //Правим го на false защото тук ще въведем второто число, а в него няма '.'.
        const operationName = e.target.innerText;
        if (displayFirstNumber && displaySecondNumber && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(displaySecondNumber)
        }
        clearDisplay(operationName);
        lastOperation = operationName;
    })
})
equalElement.addEventListener('click', (e) => { //Създаваме функционалност на бутона "=".
    if (!displayFirstNumber || !displaySecondNumber) return;
    haveDot = false;
    mathOperation();
    clearDisplay();
    displayTwoElement.innerText = result;
    displayTempElement.innerText = "";
    displaySecondNumber = result;
    displayFirstNumber = "";
})

clearAllElement.addEventListener('click', (e) => { //Изчистваме целия дисплей.
    displayOneElement.innerText = "0";
    displayTwoElement.innerText = "0";
    displayFirstNumber = "";
    displaySecondNumber = "";
    result = "";
    displayTempElement.innerText = "0";
})

clearElement.addEventListener('click', (e) => { //Изчистваме последното въведено число.
    displayTwoElement.innerText = "";
    displaySecondNumber = "";
})

//Създавам функционалност с която мога да ползвам клавиатурата си за въвеждане на данните в калкулатора.
window.addEventListener('keydown', (e) => {
    if (e.key == '0' ||
        e.key == '1' ||
        e.key == '2' ||
        e.key == '3' ||
        e.key == '4' ||
        e.key == '5' ||
        e.key == '6' ||
        e.key == '7' ||
        e.key == '8' ||
        e.key == '9' ||
        e.key == '.') {
        clickButtonElement(e.key);
    } else if (
        e.key == "%" ||
        e.key === "/" ||
        e.key === "-" ||
        e.key === '+') {
        clickOperation(e.key)
    } else if (e.key == "*") {
        clickOperation('X') //Ако опитаме да натиснем "*" от клавиатурата, то тя трябва да е равна на "Х".
    } else if (e.key == 'Enter' || e.key == '=') {
        clickEqual();
    }
})


//Functions


function clearDisplay(name = "") { //След въвеждане на първата цифра и оператора, главният дисплей се изчиства и очаква следваща стойност с която да извържи операцията.
    displayFirstNumber += displaySecondNumber + " " + name + " ";
    displayOneElement.innerText = displayFirstNumber;
    displayTwoElement.innerText = "";
    displaySecondNumber = "";
    displayTempElement.innerText = result;

}

function mathOperation() { //Създаваме фунционалност за всяка математическа операция.
    if (lastOperation === "X") {
        result = parseFloat(result) * parseFloat(displaySecondNumber)
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(displaySecondNumber)
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(displaySecondNumber)
    }
    else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(displaySecondNumber)
    }
    else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(displaySecondNumber)
    }
}


//Виж 69ти ред. ----->
function clickButton(key) {
    numbersElements.forEach(button => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operationElements.forEach(button => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickEqual() {
    equalElement.click()
}