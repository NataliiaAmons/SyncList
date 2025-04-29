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
]


// Changes visibility for password fields
function changeVisibility(elementId){
    const container = document.getElementById(elementId);
    const inputElement = container.querySelector("input");
    const eye = container.querySelector(".fa-eye");
    const eye_slash = container.querySelector(".fa-eye-slash");

    isPassword = inputElement.type==="password";

    inputElement.type = isPassword ?  "text" : "password";
    eye.classList.toggle("hidden");
    eye.classList.toggle("inline");
    eye_slash.classList.toggle("hidden");
    eye_slash.classList.toggle("inline");
      
}

// LOG IN: Checks if input is correct
document.getElementById("log-in-form").addEventListener("submit", function(event){

    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    const error = document.getElementById("error");

    error.classList.add("hidden");

    const getUser = users.find(user => user.email === email);

    if (!getUser || password != getUser.password) {
        event.preventDefault();
        error.classList.toggle("hidden");
        error.innerText = "Wrong email or password";
    }
})

// LOG IN: Reloads page with different url
document.getElementById("log-in-form").action = "purchase.html";

