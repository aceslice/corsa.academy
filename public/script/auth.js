const loginButton = document.getElementById("log");
const signupButton = document.getElementById("sign");

const login = document.getElementById("login-form");
const signup = document.getElementById("signup-form");

if (login) {
  login.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const body = {
      email: login.email.value,
      password: login.password.value,
    };
    console.log(body);
    try {
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  });
}
if (signup) {
  const password = document.querySelector("input[name='password']");
    const confPassword = document.querySelector("input[name='conf_password']");
    const passwordError = document.querySelector(".password-error");
function checkPassword() {
  const passwordValue = password.value.trim();
  const confPasswordValue = confPassword.value.trim();

  if (passwordValue === "" || confPasswordValue === "") {
    passwordError.textContent = "Passwords cannot be empty!";
  } else if (passwordValue !== confPasswordValue) {
    passwordError.textContent = "Passwords do not match!";
  } else {
    passwordError.textContent = "";
  }

  passwordError.style.color = (passwordError.textContent === "") ? "" : "red";
}

  password.addEventListener("input", checkPassword);
  confPassword.addEventListener("input", checkPassword);
  signup.addEventListener("submit", async (evt) => {
    evt.preventDefault();
  });
}
if (signupButton) {
  signupButton.addEventListener("click", () => {
    window.location.assign(`/signup`);
  });
}
if (loginButton) {
  loginButton.addEventListener("click", () => {
    window.location.assign(`/login`);
  });
}
