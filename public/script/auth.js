// Get the login and signup buttons
const loginButton = document.getElementById("log");
const signupButton = document.getElementById("sign");

// Get the login and signup forms
const login = document.getElementById("login-form");
const signup = document.getElementById("signup-form");

// Add a submit event listener to the login form
if (login) {
  login.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    // Get the email and password values from the form
    const body = {
      email: login.email.value,
      password: login.password.value,
    };
    try {
      // Send a POST request to the server with the email and password values
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if(data.user){
        location.assign("/home")
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// Add a submit event listener to the signup form
if (signup) {
  // Get the password and confirm password fields and the password error message element
  const password = document.querySelector("input[name='password']");
  const confPassword = document.querySelector("input[name='conf_password']");
  const passwordError = document.querySelector(".password-error");

  /**
   * Checks if the password and confirm password values are valid.
   */
  function checkPassword() {
    // Get the trimmed values of password and confirm password
    const passwordValue = password.value.trim();
    const confPasswordValue = confPassword.value.trim();

    // Check if either password or confirm password is empty
    if (passwordValue === "" || confPasswordValue === "") {
      passwordError.textContent = "Passwords cannot be empty!";
    } else if (passwordValue !== confPasswordValue) {
      // Check if password and confirm password values match
      passwordError.textContent = "Passwords do not match!";
    } else {
      passwordError.textContent = "";
    }

    // Set the color of the password error message
    passwordError.style.color = (passwordError.textContent === "") ? "" : "red";
  }

  // Add input event listeners to the password and confirm password fields
  password.addEventListener("input", checkPassword);
  confPassword.addEventListener("input", checkPassword);

  // Prevent the default form submission behavior
  signup.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    // Check if the passwords match
    if (password.value !== confPassword.value) {
      passwordError.textContent = "Passwords do not match!";
      passwordError.style.color = "red";
    } else {
      // Get the email and password values from the form
      const body = {
        email: signup.email.value,
        password: signup.password.value,
      };
      console.log(body);
      try {
        // Send a POST request to the server with the email and password values
        const res = await fetch("/signup", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if(data.user){
          location.assign("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
// Add a click event listener to the signup button
if (signupButton) {
  signupButton.addEventListener("click", () => {
    // Redirect the user to the signup page
    window.location.assign(`/signup`);
  });
}

// Add a click event listener to the login button
if (loginButton) {
  loginButton.addEventListener("click", () => {
    // Redirect the user to the login page
    window.location.assign(`/login`);
  });
}