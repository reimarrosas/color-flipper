"use strict";

let colorInputs = [];

// || Take user input
const colorOptions = document.getElementById("color-type");
colorOptions.addEventListener("change", toggleFormInputs);

function toggleFormInputs(e) {
  const colorHex = document.getElementById("color-hex");
  const colorRgb = document.getElementById("color-rgb");

  const decideDisplay = compareSelectedToDisplayedInput(e.target.value);
  colorHex.style.display = decideDisplay(colorHex);
  colorRgb.style.display = decideDisplay(colorRgb);
}

function compareSelectedToDisplayedInput(colorType) {
  return (colorTextInputs) => {
    return colorTextInputs.id.includes(colorType)
                ? "block"
                : "none";
  };
}

const formInput = document.getElementById("user-input");
formInput.addEventListener("submit", (e) => {handleUserInput(e, colorOptions.value)});

function handleUserInput(e, colorType) {
  const inputElements = filterVisibleInputs([...e.target.elements], colorType);
  if (inputElements.every(input => validateInput(input, colorType))) {
    colorInputs = [...inputElements];
  } else {
    alert("Invalid Input!");
  }
  e.preventDefault();
}

function filterVisibleInputs(inputs, colorType) {
  return inputs.filter(input => input.name.includes(colorType))
               .map(input => input.value);
}

function validateInput(input, colorType) {
  return colorType === "hex"
          ? /#[0-9a-f]/.test(input)
          : parseInt(input) < 256
            && parseInt(input) >= 0;
}

// || Calculate Complementary Colors from User Input
function calculateComplementary(colorInput) {
  if (colorInput.length === 1) {
    const hexValue = colorInput[0];
    const inputs = hexValue.slice(1).toLowerCase().match(/\w\w/g);
    return calculateForHex(inputs);
  } else if (colorInput.length === 3) {
    return calculateForRgb(colorInput);
  }
  return "Invalid Input!";
}

function calculateForHex(rgbSeparatedHex) {
  return rgbSeparatedHex
          .map(componentColor => (255 - parseInt(componentColor, 16)).toString(16).padStart(2, "0"))
          .reduce((colorAcc, componentColorCur) => `${colorAcc}${componentColorCur}`, "#");
}

function calculateForRgb(rgbValues) {
  return rgbValues.map(componentColor => (255 - parseInt(componentColor)).toString());
}

// || Display output
formInput.addEventListener("submit", (e) => {handleOutput(e, colorInputs)});

function handleOutput(e, colorInputs) {
  const display = document.querySelector("input[readonly]");
  display.value = calculateComplementary(colorInputs);
  e.preventDefault();
}

// || Copy Functionality
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", handleCopyClick);

function handleCopyClick() {
  const outputText = document.querySelector("input[readonly]");
  outputText.focus();
  outputText.select();
  outputText.setSelectionRange(0, 100);
  document.execCommand("copy");
}