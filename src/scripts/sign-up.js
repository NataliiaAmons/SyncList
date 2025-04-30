const singUpUser = [
    {
        "first_name": "Natalie",
        "last_name": "Carter",
        "username": "ncarter92",
        "email": "natalie.carter92@example.com",
        "password": "Aq7!vLz9#rP2"
    }
];

const inputs = document.querySelectorAll(".form-field");
const submit = document.getElementById("submit-btn");

function checkInputs() {
    let allFilled = true;
    inputs.forEach(inputDiv => {
      const input = inputDiv.getElementsByTagName("input")[0];
      if (input.value.trim() === '') {
        allFilled = false;
      }
      else if (inputDiv.classList.contains("invalid")){
        allFilled = false;
        console.log("invalid " + input.type);
      }
    });

    if (allFilled){
        submit.disabled = false;
    }
    else {
        submit.disabled = true;
    }
    console.log(allFilled);
}



const form = document.getElementById("sing-up-form");
// SIGN UP: Cheks if input is valid on blur
document.getElementById("fname").addEventListener("focusout", (e) => { validateFName(e);});


inputs.forEach(inputDiv => {
    const input = inputDiv.getElementsByTagName("input")[0];
    input.addEventListener("focusout", checkInputs);
});


form.addEventListener('submit', function(event) {
    const inputs = document.querySelectorAll(".form-field");

    let allValid = true;

    inputs.forEach(input => {
        if(input.classList.contains("invalid")){
            const inputBox = input.getElementsByTagName("input")[0];
            inputBox.style.boxShadow ='5px 5px 10px rgba(241, 169, 169, 0.3)';

            allValid = false;
        }
    });

});






function validateFName(event) {
    
    const textInput = document.getElementById("fname");
    const textValue = textInput.value.trim();
    const error = document.getElementById("fname-error");
    
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]{2,30}$/;

    const container = document.getElementById("fname-container");
    const textElement = container.querySelector("#fname");

    textElement.classList.add("border-gray");
    textElement.classList.remove("border-accent");

    textInput.setCustomValidity("");
    error.innerText = "";
    
    const isValidInput = nameRegex.test(textValue);

    container.classList.remove("invalid");
    if (!isValidInput) {
        console.log(textInput);

        container.classList.add("invalid");

        event.preventDefault()
        textElement.classList.remove("border-gray");
        textElement.classList.add("border-accent");
        error.classList.remove("hidden");

        if (textValue.length==0) {
            error.innerText = "First name is required";
        }
        else if (textValue.length<2 || textValue.length>30) {
            error.innerText = "Name must be 2–30 characters";
        }
        else {
            error.innerText = "Name can contain only letters, spaces, hyphens, apostrophes";
        }

    }

    
}