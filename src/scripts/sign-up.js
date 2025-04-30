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



// Cheking if current input is valid on blur
document.getElementById("fname").addEventListener("blur", (e) => { validateName(e, "fname");});
document.getElementById("lname").addEventListener("blur", (e) => { validateName(e, "lname");});


// Sets textbox styles and classes to 'valid'
function textBoxToValidStyle (id) {

    const container = document.getElementById(id+"-container");
    const textBox = container.querySelector("#"+id);
    const error = document.getElementById(id+"-error");

    // set classes to valid
    container.classList.remove("invalid");

    // change border color to gray
    textBox.classList.remove("border-accent");
    textBox.classList.add("border-gray");

    // empty error
    error.innerText = "";
   
}

// Sets textbox styles and classes to 'invalid'
function textBoxToInvalidStyle (id) {

    const container = document.getElementById(id+"-container");
    const textBox = container.querySelector("#"+id);
    const error = document.getElementById(id+"-error");

    // set classes to invalid
    container.classList.add("invalid");

    // change border color to accent (red)
    textBox.classList.remove("border-gray");
    textBox.classList.add("border-accent");
   
}



// function for validating name fields
function validateName(event, id) {
    
    const textInput = document.getElementById(id);
    const textValue = textInput.value.trim();
    const error = document.getElementById(id+"-error");
    
    // validation with regex
    const nameRegex = /^(?!.*[ '\-]{2})[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]{2,30}$/;
    const isValidInput = nameRegex.test(textValue);

    if (isValidInput) {
         textBoxToValidStyle(id);
    }
    else {
        event.preventDefault();
        textBoxToInvalidStyle(id);

        // error messages for "First name"
        if (id==="fname") {
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
        
        // error messages for "Last name"
        else if (id==="lname"){
            if (textValue.length==0) {
                error.innerText = "Last name is required";

            }
            else if (textValue.length<2 || textValue.length>30) {
                error.innerText = "Last name must be 2–30 characters";
            }
            else {
                error.innerText = "Last name can contain only letters, spaces, hyphens, apostrophes";
            }
        }
    }   
}

