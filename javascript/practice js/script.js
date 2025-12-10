let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let emailans = emailRegex.test(email.value)
  let passans = passwordRegex.test(password.value)

  let isvalid = true ;

    if (!emailans) {
        document.querySelector("#emailError").textContent = "Invalid email format.";
        document.querySelector("#emailError").style.display = "initial"
        isvalid = false ;
    }
    if (!passans) {
        document.querySelector("#PassError").textContent = "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.";
        document.querySelector("#PassError").style.display = "initial";
        isvalid = false ;
    }

    if (isvalid){
        document.querySelector("#PassError").style.display = "none";
        document.querySelector(".error").style.display = "none"
        alert("everything is correct You logged in !!! ")
    }
  console.log("Email:", email.value);
  console.log("Password:", password.value);
});