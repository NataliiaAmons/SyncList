// Example users
const users = [
    {
      username: "james_walker",
      email: "james.walker@example.com",
      password: "Jw@2024rock"
    },
    {
      username: "sofia.reed",
      email: "sofia.reed@example.com",
      password: "S0f!aR33d#"
    }
];

// Checks if input is correct
document.getElementById("log-in-form").addEventListener("submit", function(event){

    const textInput = document.getElementById("email-or-usern").value.trim();
    const password = document.getElementById("pass").value;

    const error = document.getElementById("error");

    //error.classList.add("hidden");

    let getUser;
    // check if input is email or username
    if (isValidEmail(textInput)) {
        getUser = users.find(user => user.email === textInput);
    }
    else {
        getUser = users.find(user => user.username === textInput);
    }

    if (!getUser || password != getUser.password) {
        event.preventDefault();
        error.classList.toggle("hidden");
        error.innerText = "Wrong email or password";

        // changing input border colors
        const container = document.getElementById("log-in-form");
        const textElement = container.querySelector("#email-or-usern");
        const passElement = container.querySelector("#pass");

        textElement.classList.remove("border-gray");
        textElement.classList.add("border-accent");
        passElement.classList.remove("border-gray");
        passElement.classList.add("border-accent");

    }
});

// Checking if email is valid
function isValidEmail (text){
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(text);
};

// Reloads page with different url
document.getElementById("log-in-form").action = "purchase.html";