let firstName = document.getElementById("first_name");
let lastName = document.getElementById("last_name");
let email = document.getElementById("email");
let goalText = document.getElementById("goal_text");

async function registerUser() {
  event.preventDefault();

  // capitalizes the user input info
  function capitalizeUserInput(element) {
    let FirstLetter = element.value.slice(0, 1).toUpperCase();
    const NameCap = FirstLetter + element.value.slice(1);
    return NameCap;
  }

  // user input in capitalized form
  const firstNameCapitalized = capitalizeUserInput(firstName);
  const lastNameCapitalized = capitalizeUserInput(lastName);
  const emailCapitalized = capitalizeUserInput(email);
  const goalTextCapitalized = capitalizeUserInput(goalText);

  let userData = {};
  userData.firstName = firstNameCapitalized;
  userData.lastName = lastNameCapitalized;
  userData.email = emailCapitalized;
  userData.password = document.getElementById("password").value;
  userData.goal = goalTextCapitalized;

  //console.log(userData)   testing purposes

  let password2 = document.getElementById("confirm_password").value;

  if (password2 !== userData.password) {
    alert("passwords don't match, enter again.");
    document.getElementById("password").value = "";
    document.getElementById("confirm_password").value = "";
    return;
  }

  const rawResponse = await fetch("/registerUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  //const content = await rawResponse.json();
  // console.log(content);
  alert("user registered!");
  //window.location = 'index.html';
}
