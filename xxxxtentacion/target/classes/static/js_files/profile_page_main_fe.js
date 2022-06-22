// ELEMENTS USED..............................
const initialGoalInput = document.querySelector("#new_goal_input");
const macroGoalContainer = document.querySelector(".percentage_goal_box");
const subGoalContainer = document.querySelector(".subgoal_box_container");
const addSubGoalContainer = document.querySelector(".add_subgoal_container");
const addMainGoalBtn = document.querySelector("#add_main_goal_btn");
const individualPercentageBox = document.querySelector(
  ".individual_percentage_goal_box"
);
// const allIndiPercentageBoxes = document.querySelectorAll(
//   ".individual_percentage_goal_box"
// );
const macroSubGoalContainer = document.querySelector(".subgoal_box_container");
const macroSubsubGoalContainerHidden = document.querySelector(
  ".subsubgoals_macro_container"
);
const subSubGoalContainer = document.querySelector(".subsubgoals_container");
const subSubGoalInput = document.querySelector("#subsubgoal_input");
const subSubGoalBtn = document.querySelector("#subsubgoal_btn");

// HELPER FUNCTIONS
// .................................................................
// .................................................................
// .................................................................
// .................................................................
let mainGoals = [];
//on ready load user profile info with session storage saved user object at login
let userObject = JSON.parse(localStorage.getItem("userID")); //CONVERTS THE TEXT TO JSON FORMAT

let userData = {};

userData.id = userObject;

//calls api when page loads to get user data and load it to profile as soon as page load
const rawResponse = fetch("/getUser", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.token,
  },
  body: JSON.stringify(userData), //the object containing email and pass converted to JSON in the request body
})
    .then((response) => response.json()) //extract the response body
    .then((data) => {
      console.log("User object response from getUser API:");
      console.log(data);
      if (data != null) {
        if (data.picture == null) {
          document.getElementById("profileImage").src =
              "images/default_profile_pic.jpeg";
          document.getElementById("profileImage2").src =
              "images/default_profile_pic.jpeg";
        } else if (data.picture != null) {
          document.getElementById("profileImage").src =
              "data:image/jpeg;base64," + data.picture;
          document.getElementById("profileImage2").src =
              "data:image/jpeg;base64," + data.picture;
        }

        document.getElementById("username1").innerText =
            data.firstName + " " + data.lastName;
        document.getElementById("usergoal1").innerText = data.goal;

        localStorage.setItem("userOBJ", JSON.stringify(data));

        console.log("this is from fetch in profilemainfe: ");
        let userObj = JSON.parse(data.goalObject);
        console.log(userObj);

        mainGoals = userObj;

        console.log("maingoals content:")
        console.log(mainGoals);

        populateFetchData();

      }
    });




// this helper function finds the active/clickedon goal in a container and returns it's name//////////////////////////////////////////////////////
function findClickedGoalName(parentContainerHoldingGoals) {
  // variable holding a collection/list of all subgoals currently in container
  const GoalsCurrentlyInContainer = parentContainerHoldingGoals.children;

  // logic goes through each individual subgoal using a loop and finds which one has the active tab on it, meaning it has been clicked by user. Places that subgoal element in a variable.
  let activeGoal;
  for (let goal of GoalsCurrentlyInContainer) {
    if (goal.hasAttribute("data-active")) {
      activeGoal = goal;
    }
  }

  // name of the subgoal containing the active data tab. To be used to find right location in the mainGoals array
  const activegoalName = activeGoal.innerText;
  return activegoalName;
}
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this helper function finds the active/clickon goal in a container and returns it's element//////////////////////////////////////////////////////
function findClickedGoalElement(parentContainerHoldingGoals) {
  // variable holding a collection/list of all subgoals currently in container
  const GoalsCurrentlyInContainer = parentContainerHoldingGoals.children;

  // logic goes through each individual subgoal using a loop and finds which one has the active tab on it, meaning it has been clicked by user. Places that subgoal element in a variable.
  let activeGoal;
  for (let goal of GoalsCurrentlyInContainer) {
    if (goal.hasAttribute("data-active")) {
      activeGoal = goal;
    }
  }

  return activeGoal;
}

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this helper function finds the subgoal array within the objects used in this APP//////////////////////////////////////////////////////
function locateSubGoalsObjectToLoop(containerHoldingGoals, objectToLoop) {
  // find the main goals element name that has been clicked
  const mainActiveGoalObjectName = findClickedGoalElement(
    containerHoldingGoals
  ).innerText;

  // matches the element name of the active DIV to the one in the array mainGoals
  const rightMainGoalObject = objectToLoop.find((goal) => {
    return goal.name === mainActiveGoalObjectName;
  });

  // object found with the logic above that will be looped through to find the next subsubgoal (contains active data)
  const GoalSubgoalsArray = rightMainGoalObject.subgoals;

  return GoalSubgoalsArray;
}
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this helper function removes an item from an array//////////////////////////////////////////////////////
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// STORAGE, HOLDS ALL GOALS IN A HIERARCHY, MAIN GOALS > SUBGOALS > SUBSUBGOALS
// .................................................................
// .................................................................
// .................................................................
// .................................................................

// .................................................................
// .................................................................

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this function sends mainGoals array to database everytime a trigger is clicked. Also sends back info to be used for page population//////////////////////////////////////////////////////

function sendMainGoalsToDb() {
  const mainGoalsString = JSON.stringify(mainGoals);

  const userData = {};
  userData.goalObject = mainGoalsString;
  userData.id = localStorage.userID;

  const rawResponse = fetch("/postGoalObject", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    body: JSON.stringify(userData), //the object containing email and pass converted to JSON in the request body
  })
    .then((response) => response.json()) //extract the response body
    .then((data) => console.log(data));
}

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this function loads the data into the profile page when the user logs in/////////////////////

function loadDataFromLocalStorageFromDB() {
  const dataInStringForm = localStorage.getItem("userOBJ");

  const profileDataObject = JSON.parse(dataInStringForm);

  if (
    profileDataObject.goalObject === undefined ||
    profileDataObject.goalObject === null
  )
    return;

  const targetDataObject = JSON.parse(profileDataObject.goalObject);

  console.log(targetDataObject);
}

//loadDataFromLocalStorageFromDB();
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// this function prevents certain elements to be cached. (the ones that have the no_cache class/////////////////////
function preventCache() {
  var nods = document.getElementsByClassName("no_cache");
  for (var i = 0; i < nods.length; i++) {
    nods[i].attributes["src"].value += "?a=" + Math.random();
  }
}

//preventCache();

// START OF CODE GOAL ADDING AND DELETING FUNCTIONALITY
// ADD NEW MAIN GOAL FUNCTIONALITY..................................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

// this function creates a new object and places the **MAIN** goal that the user put in
const createAndPlaceNewGoalObject = function () {
  // if nothing is in the input, the function does not run (button does nothing)
  if (initialGoalInput.value === "") return;

  // saves the inputed info into a variable
  const goalDescription = initialGoalInput.value;

  // pushes object into maingoals array
  mainGoals.push({ name: goalDescription, subgoals: [] });

  // html code of element to put in page
  const html = `<div class="individual_percentage_goal_box no_cache">
  <p>${goalDescription}</p>
  <div class="add_subgoal_container hide">
      <form action="">
          <input type="text" name="new_goal" id="new_subgoal_input" placeholder="type in your new subgoal" required>
          <button class="add_subgoal_btn" type="button"><i class="fa-solid fa-plus"></i></button>
      </form>
  </div>
  <i class="fa-solid fa-trash-can"></i>
</div>`;

  // adds main goal element into DOM
  macroGoalContainer.insertAdjacentHTML("afterbegin", html);

  // clears input
  initialGoalInput.value = "";

  // sends mainGoals to database and returns data
  sendMainGoalsToDb();
};

// TOP FUNCTION
// initial goal input event listener
addMainGoalBtn.addEventListener("click", createAndPlaceNewGoalObject);

// SHOW AND ADD SUB-GOALS FUNCTIONALITY.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

// this function shows add new function DIV and shows goal's subgoals on bottom section
const showAddNewGoalDivAndSubGoals = function () {
  macroGoalContainer.addEventListener("click", function (e) {
    // logic clears all percentage boxes of the data-tab, that way only one has it at all times, also adds hide to input sect to all
    const allIndiPercentageBoxes = macroGoalContainer.children;

    for (let box of allIndiPercentageBoxes) {
      box.removeAttribute("data-active");
      box.children[1].classList.add("hide");
    }

    // logic allows to select the needed element (user clicked) using event delegation
    const boxclicked = e.target.closest(".individual_percentage_goal_box");
    if (!boxclicked) return;

    // adds data attribute to currently clicked element to identify later
    boxclicked.dataset.active = "active";

    // shows input section (removes hide class) box so user can enter a new subgoal
    boxclicked.children[1].classList.remove("hide");

    // saves in a variable the text/goalname of the box clicked to be used to add data to right object
    const boxClickedName = findClickedGoalName(macroGoalContainer);

    // locates the right object in the mainGoals array to get the subgoals from by matching the variable above to the mainGoals value
    let locatedsubGoals;
    mainGoals.forEach(function (goal, i) {
      if (goal.name === boxClickedName) {
        locatedsubGoals = mainGoals[i].subgoals;
      }
    });

    // hide subsubcontainer
    document
      .querySelector(".subsubgoals_macro_container")
      .classList.add("hide");

    // shows the appropriate found subgoals in the DOM in the subgoals section
    subGoalContainer.innerHTML = "";
    locatedsubGoals.forEach(function (goal) {
      subGoalContainer.insertAdjacentHTML(
        "afterbegin",
        ` <div class="subgoal_box">
        <h4>${goal.name}</h4>
        <div class="completed_autocheck_container">
          <input type="checkbox" name="check_note" id="check_note_main" ${
            goal.checkState === true ? "checked" : "unchecked"
          }>
        </div>
        <i class="fa-solid fa-trash-can"></i>
    </div>`
      );
    });
  });
};

// TOP FUNCTION
showAddNewGoalDivAndSubGoals();

// ADDS SUBGOAL THOROUGH AN INPUT AND SUBMIT BTN.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

const addSubGoal = function () {
  macroGoalContainer.addEventListener("click", function (e) {
    // selects only the button using event delegation formula
    const clicked = e.target.closest(".add_subgoal_btn");
    if (!clicked) return;

    // locates parent text or goal name to compare using a loop
    const parentHoldingTextGoalname = findClickedGoalName(macroGoalContainer);

    // locates sibling holding text entered by user to add to subgoals array
    const userSubgoalInputValue = clicked.previousElementSibling;

    // loops to find matching goal
    const objectHoldingCorrectSubgoals = mainGoals.find(function (goal) {
      return goal.name === parentHoldingTextGoalname;
    });

    // ends the function if the user inputed an empty string
    if (userSubgoalInputValue.value === "") return;

    // pushes the subgoal into the correct main goal
    objectHoldingCorrectSubgoals.subgoals.push({
      name: userSubgoalInputValue.value,
      subgoals: [],
      checkState: false,
    });

    // removes all shown subgoals from the DOM, that way the user has to click the main goal element.
    const subGolazos = document.querySelectorAll(".subgoal_box");
    for (let goal of subGolazos) {
      goal.remove();
    }

    // clears input
    userSubgoalInputValue.value = "";

    const addSubGContainer = document.querySelectorAll(
      ".add_subgoal_container"
    );
    for (let goal of addSubGContainer) {
      goal.classList.add("hide");
    }

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
};

// TOP FUNCTION
addSubGoal();

//.. SHOW AND ADD SUB-SUB-GOALS FUNCTIONALITY.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................
function showAndAddSubsubGoalSection() {
  // selects clicked on subgoal box using event delegation
  macroSubGoalContainer.addEventListener("click", function (e) {
    // object that will be looped through to find the next subsubgoal (contains active data)
    const mainGoalSubgoalsArray = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    // logic clears all subgoal boxes of the data-tab, that way only one has it at all times
    const subGoalsCurrentlyInContainer = subGoalContainer.children;
    for (let subgoal of subGoalsCurrentlyInContainer) {
      subgoal.removeAttribute("data-active");
    }

    // targets the subgoal div so you cant select anything else
    const boxClicked = e.target.closest(".subgoal_box");
    if (!boxClicked) return;

    // adds the active data attribute to clicked goal
    boxClicked.dataset.active = "active";

    // shows hidden container holding subsubgoals
    macroSubsubGoalContainerHidden.classList.remove("hide");

    // holds the subgoal subgoal array (used to display data into the dom)
    const subGoalSubSubgoalsArray = locateSubGoalsObjectToLoop(
      subGoalContainer,
      mainGoalSubgoalsArray
    );

    // shows the appropriate subgoals in the DOM in the subgoals section
    subSubGoalContainer.innerHTML = "";
    subGoalSubSubgoalsArray.forEach(function (goal) {
      subSubGoalContainer.insertAdjacentHTML(
        "afterbegin",
        ` <div class="individual_subsubgoal">
        <p>${goal.name}</p>
        <input type="checkbox" name="check_note" id="check_note" ${
          goal.checkState === true ? "checked" : "unchecked"
        }>
        <i id="subsubgoal_trash" class="fa-solid fa-trash-can"></i>
    </div>`
      );
    });
  });
}

// TOP FUNCTION
showAndAddSubsubGoalSection();

// ADDS SUBSUBGOAL TO SUBSUBGOAL SECTION.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

const addSubSubGoal = function () {
  subSubGoalBtn.addEventListener("click", function () {
    // object that will be looped through to find the next subsubgoal (contains active data)
    const mainGoalSubgoalsArray = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    // holds the subgoal subgoal array (used to push data into the dom)
    const subGoalSubSubgoalsArray = locateSubGoalsObjectToLoop(
      subGoalContainer,
      mainGoalSubgoalsArray
    );

    // ends the function if the user inputed an empty string
    if (subSubGoalInput.value === "") return;

    // pushes the subgoal into the correct main goal
    subGoalSubSubgoalsArray.push({
      name: subSubGoalInput.value,
      checkState: false,
    });

    // clears input
    subSubGoalInput.value = "";

    // hides section holding subsubgoals
    document
      .querySelector(".subsubgoals_macro_container")
      .classList.add("hide");

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
};

addSubSubGoal();

// macroGoalContainer.dataset.active = "active";

// console.log(macroGoalContainer.outerHTML);
// console.log(macroGoalContainer.dataset);
// console.log(macroGoalContainer.hasAttribute("data-active"));

// CHECKS HOW MANY SUNSUBGOALS ARE CHECKED OFF AND CHANGES THE STATE TO TRUE IF CLICKED, OR FALSE IF UNCLICKED, THEN ADD PERCENTAGE BAR AND CALCULATES PROGRESS.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................
function checkoffSubSubGoalsAndAddPercentage() {
  subSubGoalContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    // makes sure the rest of the code doesnt execute if a check was not clicked
    if (clicked.tagName !== "INPUT") return;

    // gets the name of the goal where the user checked off
    const nameOfGoalClicked = clicked.previousElementSibling.innerText;

    // finds the correct object based on main goal currently clicked
    const mainClickedGoal = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    // finds correct object based on subgoal currently clicked
    const subClickedGoal = locateSubGoalsObjectToLoop(
      subGoalContainer,
      mainClickedGoal
    );

    // loops through the subsubgoals and finds a match to the element clicked, then changes the STATE of the subsubgoal from false to true (change of state will be used to figure out percentage of completed goals)
    let counter = 0;
    for (let subSubGoal of subClickedGoal) {
      if (subSubGoal.name === nameOfGoalClicked) {
        if (subSubGoal.checkState === true) subSubGoal.checkState = false;
        else subSubGoal.checkState = true;
      }
      if (subSubGoal.checkState === true) {
        counter++;
      }
    }

    // math to see what percentage of goals are checked off
    const calculatedPercentage =
      (counter * 100) / document.querySelectorAll("#check_note").length;

    // adds percentage bar element and adds to bar color based on completion
    if (
      !findClickedGoalElement(subGoalContainer).querySelector(".percentage_bar")
    ) {
      findClickedGoalElement(subGoalContainer).insertAdjacentHTML(
        "beforeend",
        '<div class="percentage_bar"></div>'
      );
    }
    findClickedGoalElement(subGoalContainer).querySelector(
      ".percentage_bar"
    ).style.width = `${calculatedPercentage}%`;

    // when all subsubgoals are checked off this logic checks off the parent goal automatically
    if (calculatedPercentage === 100) {
      mainClickedGoal.checkState = true;

      findClickedGoalElement(subGoalContainer)
        .querySelector("#check_note_main")
        .click();
    }

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
}

checkoffSubSubGoalsAndAddPercentage();

// CHECKS HOW MANY SUBGOALS ARE CHECKED OFF AND CHANGES THE STATE TO TRUE IF CLICKED, OR FALSE IF UNCLICKED, THEN ADD PERCENTAGE BAR AND CALCULATES PROGRESS.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

function checkoffSubGoalsAndAddPercentage() {
  subGoalContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    // makes sure the rest of the code doesnt execute if a check was not clicked
    if (clicked.tagName !== "INPUT") return;

    // gets the name of the goal where the user checked off
    const nameOfGoalClicked =
      clicked.parentElement.previousElementSibling.innerText;

    // finds the correct object based on main goal currently clicked
    const mainClickedGoal = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    // loops through the subsubgoals and finds a match to the element clicked, then changes the STATE of the subsubgoal from false to true (change of state will be used to figure out percentage of completed goals)
    let counter = 0;
    for (let subGoal of mainClickedGoal) {
      if (subGoal.name === nameOfGoalClicked) {
        if (subGoal.checkState === true) subGoal.checkState = false;
        else subGoal.checkState = true;
      }
      if (subGoal.checkState === true) {
        counter++;
      }
    }

    // math to see what percentage of goals are checked off
    const calculatedPercentage =
      (counter * 100) / document.querySelectorAll("#check_note_main").length;

    // adds percentage bar and adds to bar based on completion
    if (
      !findClickedGoalElement(macroGoalContainer).querySelector(
        ".percentage_bar_main"
      )
    ) {
      findClickedGoalElement(macroGoalContainer).insertAdjacentHTML(
        "beforeend",
        '<div class="percentage_bar_main"></div>'
      );
    }
    findClickedGoalElement(macroGoalContainer).querySelector(
      ".percentage_bar_main"
    ).style.width = `${calculatedPercentage}%`;

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
}

checkoffSubGoalsAndAddPercentage();

// TRASH SUBSUBGOALS.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................
function trashSubSubGoals() {
  subSubGoalContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    // makes sure the rest of the code doesnt execute if a check was not clicked
    if (clicked.tagName !== "I") return;

    // gets the name of the goal where the user checked off
    const nameOfGoalClicked =
      clicked.previousElementSibling.previousElementSibling.innerText;

    // finds the correct object based on main goal currently clicked
    const mainClickedGoal = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    // finds correct object based on subgoal currently clicked
    const subClickedGoal = locateSubGoalsObjectToLoop(
      subGoalContainer,
      mainClickedGoal
    );

    for (let subSubGoal of subClickedGoal) {
      if (subSubGoal.name === nameOfGoalClicked) {
        removeItemOnce(subClickedGoal, subSubGoal);
      }
    }

    clicked.parentElement.remove();

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
}

trashSubSubGoals();

// TRASH SubGOALS.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

function trashSubGoals(container, containerClass, individual) {
  container.addEventListener("click", function (e) {
    const clicked = e.target;

    // makes sure the rest of the code doesnt execute if a check was not clicked
    if (clicked.tagName !== "I") return;

    // gets the name of the goal where the user checked off
    const nameOfGoalClicked =
      clicked.previousElementSibling.previousElementSibling.innerText;

    // finds the correct object based on main goal currently clicked
    const mainClickedGoal = locateSubGoalsObjectToLoop(
      macroGoalContainer,
      mainGoals
    );

    for (let subGoal of mainClickedGoal) {
      if (subGoal.name === nameOfGoalClicked) {
        removeItemOnce(mainClickedGoal, subGoal);
      }
    }

    clicked.parentElement.remove();

    document.querySelector(containerClass).classList.add("hide");

    const subSubGolazos = document.querySelectorAll(individual);
    for (let goal of subSubGolazos) {
      goal.remove();
    }

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
}

trashSubGoals(
  subGoalContainer,
  ".subsubgoals_macro_container",
  ".individual_subsubgoal"
);

// TRASH GOALS.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

function trashGoals() {
  macroGoalContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    // makes sure the rest of the code doesnt execute if the trash icon was not clicked
    if (clicked.tagName !== "I") return;
    // makes sure the code runs only if the trash icon was clicked and not the plus icon
    if (clicked.parentElement.tagName === "BUTTON") return;

    // gets the name of the goal where the user checked off
    const nameOfGoalClicked =
      clicked.previousElementSibling.previousElementSibling.innerText;

    // loops through maingoals and removes the goal the user wishes to delete
    for (let goal of mainGoals) {
      if (nameOfGoalClicked === goal.name) {
        removeItemOnce(mainGoals, goal);
      }
    }
    // removes the goal the user wishes to delete from the DOM
    clicked.parentElement.remove();

    // removes all subgoals from the DOM, that way the one deleted won't appear again
    const subGolazos = document.querySelectorAll(".subgoal_box");
    for (let goal of subGolazos) {
      goal.remove();
    }

    // if the subsubgoals container is showing, it hides it
    document
      .querySelector(".subsubgoals_macro_container")
      .classList.add("hide");

    // removes all subSubgoals from the DOM, that way the one deleted won't appear again
    const subSubGolazos = document.querySelectorAll(".individual_subsubgoal");
    for (let goal of subSubGolazos) {
      goal.remove();
    }

    // sends mainGoals to database and returns data
    sendMainGoalsToDb();
  });
}

trashGoals();

// TEMP FUNCTION THAT CALLS THE POPULATE DATA FUNCTION FOR TESTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// document.querySelector("#log_out").addEventListener("mouseover", populateFetchData);

// TEMP FUNCTION THAT CLEARS EVERYTHINGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// document.querySelector(".logo").addEventListener("click", function () {
//   const subSubGolazos = document.querySelectorAll(".individual_subsubgoal");
//   for (let goal of subSubGolazos) {
//     goal.remove();
//   }
//
//   const subGolazos = document.querySelectorAll(".subgoal_box");
//   for (let goal of subGolazos) {
//     goal.remove();
//   }
//
//   const golazos = document.querySelectorAll(".individual_percentage_goal_box");
//   for (let goal of golazos) {
//     goal.remove();
//   }
// });

// FUNCTION THAT POPULATES DATA FROM DATABASE WHEN PAGE LOADS YES YES  YES  YES  YES  YES  YES  YES  YES  YES  YES  YES  YES
function populateFetchData() {
  mainGoals.forEach(function (goal) {
    document.querySelector(".percentage_goal_box").insertAdjacentHTML(
      "afterbegin",
      `<div class="individual_percentage_goal_box">
      <p>${goal.name}</p>
      <div class="add_subgoal_container hide">
          <form action="">
              <input type="text" name="new_goal" id="new_subgoal_input" placeholder="type in your new subgoal" required>
              <button class="add_subgoal_btn" type="button"><i class="fa-solid fa-plus"></i></button>
          </form>
      </div>
      <i class="fa-solid fa-trash-can"></i>
    </div>`
    );
  });
}

populateFetchData();
