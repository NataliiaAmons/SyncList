// Changes visibility for password fields
function changeVisibility(elementId){
    const container = document.getElementById(elementId);
    const inputElement = container.querySelector("input");
    const eye = container.querySelector(".fa-eye");
    const eye_slash = container.querySelector(".fa-eye-slash");

    //check if password input hidden
    isPassword = inputElement.type==="password";

    inputElement.type = isPassword ?  "text" : "password";
    eye.classList.toggle("hidden");
    eye_slash.classList.toggle("hidden");
      
};

const inputs = document.querySelectorAll(".form-field");
const submit = document.getElementById("submit-btn");

// function to check if all inputs are valid
// (for enabling 'submit' button)
function checkInputs() {
    let allFilled = true;

    //check if any inputs are invalid
    inputs.forEach(inputDiv => {
      const input = inputDiv.getElementsByTagName("input")[0];
      // check if input element is empty
      if (input.value.trim() === '') {
        allFilled = false;
      }
      // check if input div is marked 'invalid'
      else if (inputDiv.classList.contains("invalid")){
        allFilled = false;
      }
    });

    // enable/disable 'submit' button
    if (allFilled){
        submit.disabled = false;
    }
    else {
        submit.disabled = true;
    }
}

// Enabling/diabling (if needed) 'submit' button after each input
inputs.forEach(inputDiv => {
    const input = inputDiv.getElementsByTagName("input")[0];
    input.addEventListener("blur", checkInputs);
});
