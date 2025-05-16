const singUpUser = [
    {
        "first_name": "Natalie",
        "last_name": "Carter",
        "username": "ncarter92a",
        "email": "natalie.carter92@example.com",
        "password": "Aq7!vLz9#rP2"
    }
];

// Cheking if current input is valid on blur
document.getElementById("fname").addEventListener("blur", (e) => { validateName(e, "fname");});
document.getElementById("lname").addEventListener("blur", (e) => { validateName(e, "lname");});
document.getElementById("uname").addEventListener("blur", (e) => { validateUsername(e);});
document.getElementById("email").addEventListener("blur", (e) => { validateEmail(e);});
document.getElementById("pass").addEventListener("blur", (e) => { validatePassword(e);}, (e) => { confirmPassword(e);});
document.getElementById("cpass").addEventListener("blur", (e) => { confirmPassword(e);});


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

    // set classes to invalid
    container.classList.add("invalid");

    // change border color to accent (red)
    textBox.classList.remove("border-gray");
    textBox.classList.add("border-accent");
   
}



// function for validating name fields
function validateName(e, id) {
    
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



// function for validating username
function validateUsername(e) {
    
    const textInput = document.getElementById("uname");
    const textValue = textInput.value.trim();
    const error = document.getElementById("uname-error");
    
    // validation with regex
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}[a-zA-Z]$/;
    const isValidInput = usernameRegex.test(textValue);

    if (isValidInput) {
        textBoxToValidStyle("uname");
    }
    else {
        textBoxToInvalidStyle("uname");

        if (textValue.length==0) {
            error.innerText = "Username is required";
        }
        else if (textValue.length<4 || textValue.length>16) {
            error.innerText = "Username must be 4–16 characters";
        }
        else if (textValue.startsWith("_") || /^\d/.test(textValue)){ // starts with "_" or number
            error.innerText = "Username can not start with a number or an underscore";
        }
        else if (textValue.endsWith("_") || /\d$/.test(textValue)){ // ends with "_" or number
            error.innerText = "Username can not end with a number or an underscore";
        }
        else {
            error.innerText = "Username can contain only letters, numbers, underscores";
        }
    }   
}


// function for validating email
function validateEmail(e) {
    
    const textInput = document.getElementById("email");
    const textValue = textInput.value.trim();
    const error = document.getElementById("email-error");
    
    // validation with regex
    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9-]+)*$/;
    const isValidInput = emailRegex.test(textValue);

    if (isValidInput) {
        textBoxToValidStyle("email");
    }
    else {
        textBoxToInvalidStyle("email");

        if (textValue.length==0) {
            error.innerText = "Email is required";
        }
        else if (textValue.split("@").length > 2) { // contains several '@' 
            error.innerText = "Email can contain only one '@' symbol";
        }
        else if (/^@[a-zA-Z0-9-.]/.test(textValue)) {
            error.innerText = "Email must include a name";
        }
        else if (!/@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9-]+)*$/.test(textValue)) {
            error.innerText = "Email must include a valid domain";
        }
        else {
            error.innerText = "Email can contain only '@', letters, numbers, dots";
        }
    }   
}

function passwordRegexTest (pass) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-]{8,50}$/;
    return passwordRegex.test(pass);
}


// function for validating password
function validatePassword(e) {
    
    const textInput = document.getElementById("pass");
    const textValue = textInput.value;
    const error = document.getElementById("pass-error");
    const requirements = document.querySelector("#pass-req-list");
    
    // validation with regex
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-]{8,50}$/;
    const isValidInput = passwordRegexTest(textValue);

    // empty error
    error.innerText = "";
    
    // hide max length limit
    const maxValReq = document.getElementById("pass-li-max-len");
    maxValReq.classList.add("hidden");

    if (isValidInput) {
        textBoxToValidStyle("pass");
        requirements.classList.add("hidden");
    }
    else {

        textBoxToInvalidStyle("pass");
        requirements.classList.remove("hidden");

        const minValReq = document.getElementById("pass-li-min-len");
        const lowercaseReq = document.getElementById("pass-li-lowercase");
        const uppercaseReq = document.getElementById("pass-li-uppercase");
        const digitReq = document.getElementById("pass-li-digit");
        const specCharReq = document.getElementById("pass-li-special-char");

        // show all (except max length)
        const requirementsArray = requirements.querySelectorAll(".visible");
        requirementsArray.forEach(req => {
            req.classList.remove("hidden"); 
        });
        

        if (textValue.length==0) {
            error.innerText = "Password is required";
            requirements.classList.remove("text-dark-gray");
            requirements.classList.add("text-accent");
        }
        else {

            // minimum 8 characters
            if (textValue.length<8) {
                minValReq.classList.add("text-accent");
            }
            else {
                minValReq.classList.add("hidden");
            }

            // maximum 50 characters
            // visible only if overdrawn
            if (textValue.length>50) {
                maxValReq.classList.remove("hidden");
            }

            // lowercase letters
            if (!/[a-z]/.test(textValue)) {
                lowercaseReq.classList.add("text-accent");
            }
            else {
                lowercaseReq.classList.add("hidden");
            }

            // uppercase letters
            if (!/[A-Z]/.test(textValue)) { 
                uppercaseReq.classList.add("text-accent");
            }
            else {
                uppercaseReq.classList.add("hidden");
            }

            // digits
            if (!/[0-9]/.test(textValue)) {
                digitReq.classList.add("text-accent");
            }
            else {
                digitReq.classList.add("hidden");
            }

            // special characters
            if (!/[#?!@$%^&*-]/.test(textValue)) {
                specCharReq.classList.add("text-accent");
            }
            else {
                specCharReq.classList.add("hidden");
            }

            // invalid characters
            if (!/^[A-Za-z0-9#?!@$%^&*-]*$/.test(textValue)){  
                error.innerText = "Please remove invalid characters";
            } 
        }
    }     
}


// function for confirming password
function confirmPassword(e) {
    
    console.log("cpass")
    const passInput = document.getElementById("pass");
    const passValue = passInput.value.trim();
    const cpassInput = document.getElementById("cpass");
    const cpassValue = cpassInput.value.trim();
    const error = document.getElementById("cpass-error");

    const passValid = passwordRegexTest(passValue);
    if (passValid){
        console.log("valid")
        textBoxToValidStyle("pass");
    }
    
    if (cpassValue === passValue) {

        textBoxToValidStyle("cpass");
    }
    else {
        textBoxToInvalidStyle("cpass");

        if (cpassValue.length==0) {
            error.innerText = "Password confirmation is required";
        }
        else {
            textBoxToInvalidStyle("pass");
            error.innerText = "Password and confirm password do not match";
        }
    }   
}