//* ====================================================== //
//*                     IOS CALCULATOR
//* ====================================================== //

/* ---------------------------------- */
//!             Selectors             */
/* ---------------------------------- */

const numberDivs = document.querySelectorAll(".num"); // nodeList (Array)
const operationDivs = document.querySelectorAll(".operator"); // nodeList (Array)
const equalDiv = document.querySelector(".equal");
const preDisplayDiv = document.querySelector(".previous-display");
const currentDisplayDiv = document.querySelector(".current-display");

/* ---------------------------------- */
//!             Variables             */
/* ---------------------------------- */

let preDisplayText = "";
let currentDisplayText = "";
let operation = "";

// prepare a boolean variable to enter new numbers in the new operation after pressing the percentage or equal to the percentage, it is clicked, not clicked, the equalize (and percentage) button is clicked, this is true, so it is clicked.
let equalAndPercentPress = false;

//^ clicking on any numbers
// when any number clicked (return true on that number)
numberDivs.forEach((number) => {
  number.onclick = () => {
    displayReq(number.textContent);
    updateDisplay();
  };
});

//^ clicking on any operations
// when any op clicked (return true on that op)
operationDivs.forEach((op) => {
  op.onclick = () => {
    // If the currentDisplayDiv is empty and no numbers have been entered, do not press the operator. Returning empty will not perform the action you are trying to perform.
    // return can be used anywhere within the function. When the code reaches the return line, the function stops and the value is sent back to where the function was called. There can be more than one return function within a function. return does not have to return a value. We should use if instead of else after return
    if (currentDisplayText === "") return;

    // If the operation is pressed repeatedly without pressing equal (if the operation is continued while the upper and lower screens are full)
    if (currentDisplayText && preDisplayText) calculate();

    operation = op.textContent;
    preDisplayText = currentDisplayText;
    currentDisplayText = "";
    updateDisplay();
  };
});

/* ---------------------------------- */
//!             Functions             */
/* ---------------------------------- */

//& display requirements
const displayReq = (num) => {
  // If it displays 0 and user enters again 0 and decimal point (.) / If a number other than that is entered, only the new number entered (0 is cancelled) appears on the screen.
  if (currentDisplayText === "0" && num !== "0" && num !== ".") {
    currentDisplayText = num;
    return;
    // (0 + 5 == 55) => (0 + 5 == 5)
    // Exit this loop, it has finished its work by changing the global variable, but it will not return anything, it will ignore the previous 0.
  }

  // If a decimal point already exist, then dont allow to enter again a point
  if (num == "." && currentDisplayText.includes(".")) return;

  // User should not enter after 10 digits
  if (currentDisplayText.length > 9) return;

  // If the user first enters 0, then dont allow to enter 0 again. return a single 0.
  if (currentDisplayText == "0" && num == "0") return;

  // After pressing equal or percent, the entered number appears on the screen alone, because a new operation begins (when the result of the operation says 72 on the screen, pressing 5 does not become 725, becomes 5).
  if (equalAndPercentPress == true) {
    equalAndPercentPress = false;
    currentDisplayText = num; // not result in preDisplayText
    return; // Exit this loop, it has finished its work by changing the global variable, but it will not return anything, it will ignore the previous number.
  }

  // If all conditions have been passed successfully, add the printed numbers one after another.
  currentDisplayText += num;
};

//& update display
const updateDisplay = () => {
  currentDisplayDiv.textContent = currentDisplayText;
  // The result of the operation should not exceed 8 digits

  // after added operator
  if (operation) {
    preDisplayDiv.textContent = `${preDisplayText} ${operation}`;
  } else {
    preDisplayDiv.textContent = "";
  }
};

//& clicking on equal operator

equalDiv.onclick = () => {
  calculate();
  updateDisplay();
  equalAndPercentPress = true;
};

//& calculate number according to operation
const calculate = () => {
  switch (operation) {
    case "+":
      result = +preDisplayText + Number(currentDisplayText);
      break;
    case "-":
      result = preDisplayText - currentDisplayText;
      break;
    case "x":
      result = preDisplayText * currentDisplayText;
      break;
    case "÷":
      result = preDisplayText / currentDisplayText;
      break;
    default:
      break;
  }

  currentDisplayText = result;
  preDisplayText = "";
  operation = "";
};

/* ---------------------------------- */
//!         Event Listeners           */
/* ---------------------------------- */

//& clicking on AC operator (reset all)
document.querySelector(".ac").onclick = () => {
  operation = "";
  currentDisplayText = "";
  preDisplayText = "";
  updateDisplay();
};

//& clicking on PM (plus-minus) operator
document.querySelector(".pm").onclick = () => {
  if (currentDisplayText) {
    currentDisplayText *= -1;
    updateDisplay();
  }
};

//& clicking on % operator
document.querySelector(".percent").onclick = () => {
  if (currentDisplayText) {
    equalAndPercentPress = true; // return new operation after that (1.method)
    currentDisplayText /= 100;
    updateDisplay();
    // currentDisplayText = "" // (2.method)
  }
};
