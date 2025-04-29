// Canges vidibility for password fields
function changeVisibility(elementId){
    const container = document.getElementById(elementId);
    const inputElement = container.querySelector("input")
    const eye = container.querySelector(".fa-eye")
    const eye_slash = container.querySelector(".fa-eye-slash")

    isPassword = inputElement.type==="password";

    inputElement.type = isPassword ?  "text" : "password"
        eye.classList.toggle("hidden");
        eye.classList.toggle("inline");
        eye_slash.classList.toggle("hidden");
        eye_slash.classList.toggle("inline");
      
}
