const displayOneElement = document.querySelector(".display-1");
const displayTwoElement = document.querySelector(".display-2");
const displayTempElement = document.querySelector(".temp-result");
const numbersElements = document.querySelectorAll(".number");
const operationElements = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearAllElement = document.querySelector(".all-clear");
const clearElement = document.querySelector(".last-entity-clear");


let displayFirstNumber = "";
let displaySecondNumber = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let isThereA0BeforeDot = false;

numbersElements.forEach((numbers) => {
  numbers.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    if (!isThereA0BeforeDot && e.target.innerText == "0" && !haveDot) {
        isThereA0BeforeDot = true;
    } else if (isThereA0BeforeDot && e.target.innerText == "0" && !haveDot) {
        return;
    }
    displaySecondNumber += e.target.innerText;
    displayTwoElement.innerText = displaySecondNumber;
  });
});

operationElements.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!displaySecondNumber) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (displayFirstNumber && displaySecondNumber && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(displaySecondNumber);
    }
    clearDisplay(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});
function clearDisplay(name = "") {
  displayFirstNumber += displaySecondNumber + " " + name + " ";
  displayOneElement.innerText = displayFirstNumber;
  displayTwoElement.innerText = "";
  displaySecondNumber = "";
  displayTempElement.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(displaySecondNumber);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(displaySecondNumber);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(displaySecondNumber);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(displaySecondNumber);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(displaySecondNumber);
  }
}
// operation();

equalElement.addEventListener("click", () => {
  if (!displaySecondNumber || !displayFirstNumber) return;
  haveDot = false;
  mathOperation();
  clearDisplay();
  displayTwoElement.innerText = result;
  displayTempElement.innerText = "";
  displaySecondNumber = result;
  displayFirstNumber = "";
});

clearAllElement.addEventListener("click", () => {
  displayFirstNumber = "";
  displaySecondNumber = "";
  displayOneElement.innerText = "";
  displayTwoElement.innerText = "";
  result = "";
  displayTempElement.innerText = "";
});

clearElement.addEventListener("click", () => {
  displayTwoElement.innerText = "";
  displaySecondNumber = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});
function clickButton(key) {
  numbersElements.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationElements.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalElement.click();
}
