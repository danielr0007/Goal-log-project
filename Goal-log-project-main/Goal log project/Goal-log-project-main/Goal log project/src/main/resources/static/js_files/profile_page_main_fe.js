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

// this helper function finds the active/clickon goal in a container and returns it's name//////////////////////////////////////////////////////
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

// STORAGE, HOLDS ALL GOALS IN A HIERARCHY, MAIN GOALS > SUBGOALS > SUBSUBGOALS
// .................................................................
// .................................................................
// .................................................................
// .................................................................
const mainGoals = [];
// .................................................................
// .................................................................

// ADD NEW MAIN GOAL FUNCTIONALITY..................................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

// this function creates a new object and places the **MAIN** goal that the user put in
const createAndPlaceNewGoalObject = function () {
  if (initialGoalInput.value === "") return;
  const goalDescription = initialGoalInput.value;
  mainGoals.push({ name: goalDescription, subgoals: [] });
  macroGoalContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="individual_percentage_goal_box">
    <p>${goalDescription}</p>
    <div class="add_subgoal_container hide">
        <form action="">
            <input type="text" name="new_goal" id="new_subgoal_input" placeholder="type in your new subgoal" required>
            <button class="add_subgoal_btn" type="button"><i class="fa-solid fa-plus"></i></button>
        </form>
    </div>
</div>`
  );

  // clears input
  initialGoalInput.value = "";
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
        // console.log(goal.name);
        // console.log(i);
        // console.log(mainGoals[i]);
        // console.log(mainGoals[i].subgoals);
        locatedsubGoals = mainGoals[i].subgoals;
      }
    });

    // shows the appropriate found subgoals in the DOM in the subgoals section
    subGoalContainer.innerHTML = "";
    locatedsubGoals.forEach(function (goal) {
      subGoalContainer.insertAdjacentHTML(
        "afterbegin",
        ` <div class="subgoal_box">
        <h4>${goal.name}</h4>
        <div class="completed_autocheck_container">
            <i class="fa-solid fa-check"></i>
        </div>
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
    });

    // clears input
    userSubgoalInputValue.value = "";

    const addSubGContainer = document.querySelectorAll(
      ".add_subgoal_container"
    );
    for (let goal of addSubGContainer) {
      goal.classList.add("hide");
    }
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
        <p>${goal}</p>
        <input type="checkbox" name="check_note" id="check_note">
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
    subGoalSubSubgoalsArray.push(subSubGoalInput.value);

    // clears input
    subSubGoalInput.value = "";
    document
      .querySelector(".subsubgoals_macro_container")
      .classList.add("hide");
  });
};

addSubSubGoal();

// macroGoalContainer.dataset.active = "active";

// console.log(macroGoalContainer.outerHTML);
// console.log(macroGoalContainer.dataset);
// console.log(macroGoalContainer.hasAttribute("data-active"));

// CHECKS HOW MANY GOALS ARE CHECKED OFF IN SUB SUB GOAL SECTION AND RETURNS A PERCENTAGE.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................
function checkCheckedSubSubGoals() {
  const mainGoalSubgoalsArray = locateSubGoalsObjectToLoop(
    macroGoalContainer,
    mainGoals
  );

  const subSubGoalsArray = locateSubGoalsObjectToLoop(
    subGoalContainer,
    mainGoalSubgoalsArray
  );
}

const subSubGoalChecks = document.querySelectorAll("#check_note_subsubgoals");

// subSubGoalChecks.addEventListener("click", function () {
//   console.log(subSubGoalChecks.hasAttribute("checked"));
//   console.log(subSubGoalChecks.checked);
// });