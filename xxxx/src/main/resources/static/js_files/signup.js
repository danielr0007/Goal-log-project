// ELEMENTS
const toggleContainer = document.querySelector(".toggle-element");
const toggleLogin = document.querySelector("#login_toggle");
const toggleSignup = document.querySelector("#signup_toggle");
const loginForm = document.querySelector(".login_form");
const signUpForm = document.querySelector(".signup_form");
const mainContainer = document.querySelector(".container");
const toggleColorTab = document.querySelector("#overlay");
const signUpBtn = document.querySelector("#signup_button");

// TOGGLE ELEMENT FUNCTIONALITY

// puts elements in their proper place as soons as page loads
function activateLoginToggleAndShowLoginForm() {
  signUpForm.style.transform = `translate(0, -115%)`;
  loginForm.style.transform = `translate(0, 0)`;
  toggleColorTab.style.transform = `translate(0, 0`;
  mainContainer.children[1].textContent =
    "You are back! Login to continue smeshing your goals";
}
activateLoginToggleAndShowLoginForm();

// right form shows when user clicks the togle option
toggleContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".toggle");
  if (!clicked) return;
  if (clicked === toggleLogin) {
    if ((loginForm.style.transform = `translate(0, 0)`)) {
      signUpForm.style.transform = `translate(0, -115%)`;
      loginForm.style.transform = `translate(0, 0)`;
      toggleColorTab.style.transform = `translate(0, 0`;
      // change <h2> on page to login text
      mainContainer.children[1].textContent =
        "You are back! Login to continue smeshing your goals";
    }
  }
  if (clicked === toggleSignup) {
    if ((signUpForm.style.transform = `translate(0, 0)`)) {
      signUpForm.style.transform = `translate(0, 0)`;
      loginForm.style.transform = `translate(100%, 0)`;
      toggleColorTab.style.transform = `translate(100%, 0`;
      // change <h2> on page to login text
      mainContainer.children[1].textContent =
        "Begin smeshing your goals, fill in the fields below to create an account";
    }
  }
});

// FUNCTIONALITY THAT AUTOMATICALLY CHANGES THE SIGN UP FORM TO THE LOGIN FORM UPON USER SIGNUP
signUpBtn.addEventListener("click", activateLoginToggleAndShowLoginForm);
