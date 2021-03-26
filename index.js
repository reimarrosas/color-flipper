/**
 * Take Input
 *    selection? !!
 *        if hex, one input
 *        else three
 *    on form submit
 *        add event listener
 *    validate
 *      check if #ffffff for HEX and if less than 256
 *      and greater or equal to zero on RGB
 *    save
 * Calculate
 *    take results from input
 *    calculate depending on format (RGB/HEX)
 *    save
 * Output
 *    display output to copy-able input:disabled
 */

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

const inputList = [];
function handleUserInput(e, colorType) {
  const inputElements = filterVisibleInputs([...e.target.elements], colorType);
  inputElements.forEach(input => {
    if (validateInput(input, colorType)) {
      inputList.push(input)
    } else alert("Invalid Input!");
  });
  e.preventDefault();
}

function filterVisibleInputs(inputList, colorType) {
  return inputList.filter(input => input.name.includes(colorType));
}

function validateInput(input, colorType) {
  return colorType === "hex"
          ? /#[0-9a-f]/.test(input)
          : /[0-255]/.test(input);
}