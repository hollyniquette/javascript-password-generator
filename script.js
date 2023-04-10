// Assignment Code
var openPromptBtn = document.getElementById("open-prompts");
var generatePwdBtn = document.getElementById("generate");
var passwordText = document.getElementById("password");
var modal = document.getElementById("modal-background");
var passwordLength = document.getElementById("password-length-input");
var lowercaseCheck = document.getElementById("lowercase");
var uppercaseCheck = document.getElementById("uppercase");
var numericCheck = document.getElementById("numeric");
var specialCheck = document.getElementById("special-character");
var validationTxt = document.getElementById("validation-txt");
var possibleLowercaseChars = "abcdefghijklmnopqrstuvwxyz";
var possibleUppercaseChars = possibleLowercaseChars.toUpperCase();
var possibleNumericChars = "0123456789";
var possibleSpecialChars = "!@#$%^&*()_+{}:<>?,./;'[]-=";

// Write password to the #password input
function writePassword() {
  var password = generatePassword(passwordLength.value);
  passwordText.value = password;
}

// Password generator
function generatePassword(length) {
  var password = "";
  // concat overall possible characters based on prompt input
  var validChars = "";
  if (lowercaseCheck.checked) {
    validChars = validChars.concat(possibleLowercaseChars);
  }
  if (uppercaseCheck.checked) {
    validChars = validChars.concat(possibleUppercaseChars);
  }
  if (numericCheck.checked) {
    validChars = validChars.concat(possibleNumericChars);
  }
  if (specialCheck.checked) {
    validChars = validChars.concat(possibleSpecialChars);
  }
  for (var i = 0; i < length; i++) {
    // generate random index
    var randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }
  return password;
}

// Add event listener to prompt button to show modal window
openPromptBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

/*
  Add event listener for when user presses escape key
  This will also reset all prompt inputs
*/
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
    resetValues();
  }
});

// Add event listener to Generate Password button
generatePwdBtn.addEventListener("click", function () {
  var isValid = true;
  // check to ensure prompts are valid
  if (
    !lowercaseCheck.checked &&
    !uppercaseCheck.checked &&
    !numericCheck.checked &&
    !specialCheck.checked
  ) {
    isValid = false;
  }
  if (!/^-?\d+\.?\d*$/.test(passwordLength.value)) {
    isValid = false;
  }
  if (
    parseInt(passwordLength.value) < 8 ||
    parseInt(passwordLength.value) > 128
  ) {
    isValid = false;
  }
  // if all checks are truthy, if not display validation message
  if (isValid) {
    writePassword();
    resetValues();
    modal.style.display = "none";
  } else {
    validationTxt.style.display = "block";
  }
});

// Validators - using https://jsfiddle.net/emkey08/zgvtjc51
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

// Don't allow non-numeric characters or values over 128
setInputFilter(passwordLength, function (value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 128);
});

/* 
  Reset prompt values whenever modal window is submitted
  or exited out of
*/
function resetValues() {
  validationTxt.style.display = "none";
  passwordLength.value = "";
  lowercaseCheck.checked = false;
  uppercaseCheck.checked = false;
  numericCheck.checked = false;
  specialCheck.checked = false;
}
