// ELEMENTS USED..............................
const initialGoalInput = document.querySelector("#new_goal_input");
const macroGoalContainer = document.querySelector(".percentage_goal_box");
const subGoalContainer = document.querySelector(".subgoal_box_container");
const addMainGoalBtn = document.querySelector("#add_main_goal_btn");
const individualPercentageBox = document.querySelector(
  ".individual_percentage_goal_box"
);
const macroSubGoalContainer = document.querySelector(".subgoal_box_container");
const macroSubsubGoalContainerHidden = document.querySelector(
  ".subsubgoals_macro_container"
);
const subSubGoalContainer = document.querySelector(".subsubgoals_container");
const subSubGoalInput = document.querySelector(".subsubgoal_input");
const subSubGoalBtn = document.querySelector(".subsubgoal_btn");

// holds all main goals and its sub-goals
const mainGoals = [];

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
            <button class="add_subgoal_btn" type="submit"><i class="fa-solid fa-plus"></i></button>
        </form>
    </div>
</div>`
  );
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
    const boxclicked = e.target.closest(".individual_percentage_goal_box");
    if (!boxclicked) return;

    // shows input (removes hide class) box so user can enter new subgoal
    boxclicked.children[1].classList.remove("hide");

    // finds the text of the box clicked to be used to add data to right object
    const boxClickedTextContent = boxclicked.children[0].textContent;

    // locates the right object in the mainGoals array to get the subgoals from
    let locatedsubGoals;
    mainGoals.forEach(function (goal, i) {
      if (goal.name === boxClickedTextContent) {
        // console.log(goal.name);
        // console.log(i);
        // console.log(mainGoals[i]);
        // console.log(mainGoals[i].subgoals);
        locatedsubGoals = mainGoals[i].subgoals;
      }
    });

    // shows the appropriate subgoals in the DOM in the subgoals section
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
    const parentHoldingTextGoal = clicked.closest(
      ".individual_percentage_goal_box"
    ).innerText;
    // locates sibling holding text entered by user to add to subgoals array
    const userSubgoalInputValue = clicked.previousElementSibling;
    // loops to find matching goal
    const objectHoldingCorrectSubgoals = mainGoals.find(function (goal) {
      return goal.name === parentHoldingTextGoal;
    });
    // adds the subgoal to the subgoal section of the right goal object and ends the function if the user inputed an empty string
    if (userSubgoalInputValue.value === "") return;
    objectHoldingCorrectSubgoals.subgoals.push({
      name: userSubgoalInputValue.value,
      subgoals: [],
    });

    // clears input
    userSubgoalInputValue.value = "";
  });
};

// TOP FUNCTION
addSubGoal();

//.. SHOW AND ADD SUB-SUB-GOALS FUNCTIONALITY.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................
function showAndAddSubsubGoal() {
  // selects clicked on subgoal box using event delegation
  macroSubGoalContainer.addEventListener("click", function (e) {
    // contains the main goals active tab object. To be used to loop and find the nested subsubgoals
    let objectHoldingCorrectSubgoals = findClickedMainGoal();

    // targets the subgoal div so you cant select anything else
    const boxClicked = e.target.closest(".subgoal_box");
    if (!boxClicked) return;

    // shows hidden container holding subsubgoals
    macroSubsubGoalContainerHidden.classList.remove("hide");

    // finds the text of the box clicked to be used to add data to right object
    const boxClickedTextContent = boxClicked.children[0].innerText;
    console.log(boxClickedTextContent);
    // locates the right object in the mainGoals array to get the subgoals from
    let locatedsubGoals;
    objectHoldingCorrectSubgoals.subgoals.forEach(function (goal, i) {
      if (goal.name === boxClickedTextContent) {
        console.log(goal);
        console.log(i);
        console.log(goal.name);
        console.log(goal.subgoals);
        locatedsubGoals = goal.subgoals;
      }

      // shows the appropriate subgoals in the DOM in the subgoals section
      subSubGoalContainer.innerHTML = "";
      locatedsubGoals.forEach(function (goal) {
        subSubGoalContainer.insertAdjacentHTML(
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
    console.log(mainGoals);
    console.log(objectHoldingCorrectSubgoals);
    // ///////////////////////////////////
    // /////////////////////////////////////

    // /////////////////////////////////////
    /////////////////////////////////////
    // //////////////////////////////////

    // function used to find the current open goal holding the clicked subgoal. Found seeing which one had no hide class on it
    function findClickedMainGoal() {
      // selects all the main goal containers
      const goalsInContainer = document.querySelectorAll(
        ".add_subgoal_container"
      );

      // finds which of the main goal containers does not contain the hide class and is therefore active currently
      let matchingGoal;
      for (let goal of goalsInContainer) {
        if (!goal.classList.contains("hide")) {
          matchingGoal = goal;
        }
      }

      // matches the active main goal container name with the name appropriate main goal object
      const foundMatch = mainGoals.find(function (goal) {
        return goal.name === matchingGoal.previousElementSibling.textContent;
      });
      return foundMatch;
    }
  });
}

// TOP FUNCTION
showAndAddSubsubGoal();

// ADDS SUBSUBGOAL TO SUBSUBGOAL SECTION.......................
// .................................................................
// .................................................................
// .................................................................
// .................................................................

// const addSubSubGoal = function () {
//   subSubGoalBtn.addEventListener("click", function () {

//     // loops to find matching goal
//     const objectHoldingCorrectSubgoals = mainGoals.find(function (goal) {
//       return goal.name === parentHoldingTextGoal;
//     });
//     // adds the subgoal to the subgoal section of the right goal object and ends the function if the user inputed an empty string
//     if (userSubgoalInputValue.value === "") return;
//     objectHoldingCorrectSubgoals.subgoals.push({
//       name: userSubgoalInputValue.value,
//       subgoals: [],
//     });

//     // clears input
//     userSubgoalInputValue.value = "";
//   });
// };

// // TOP FUNCTION
// addSubGoal();
