// Get the login and signup buttons
const loginButton = document.getElementById("log");
const signupButton = document.getElementById("sign");

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
