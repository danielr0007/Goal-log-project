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
let mainGoals = [];
//..................................................................
//...................................................................

let userObject1 = JSON.parse(localStorage.getItem("userID"));//CONVERTS THE TEXT TO JSON FORMAT


let userData1 = {};

userData1.id = userObject1;

const rawResponse2 =  fetch('/getUser', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    },
    body: JSON.stringify(userData1)//the object containing email and pass converted to JSON in the request body
})
    .then(response => response.json())//extract the response body
    .then(data => {
        console.log("User object response from getUser API:")
        console.log(data)
        if(data != null){



            console.log(JSON.parse(data.goalObject))
            mainGoals = JSON.parse(data.goalObject)

        }

    })

// .................................................................
// .................................................................




func()
async function func(goals){




        let userData = {}

        userData.id = localStorage.userID;
        userData.goalObject = JSON.stringify(goals);

        const rawResponse = await fetch('/postGoalObject', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res=> res.json()).then(data => {

            console.log(data.email);



            const goalDescription = "dick"

            console.log(goalDescription)

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








        })






}


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

    sendToDataBase(mainGoals)
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
          <input type="checkbox" name="check_note" id="check_note_main" ${
                    goal.checkState === true ? "checked" : "unchecked"
                }>
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
            checkState: false,
        });

        // clears input
        userSubgoalInputValue.value = "";

        const addSubGContainer = document.querySelectorAll(
            ".add_subgoal_container"
        );
        for (let goal of addSubGContainer) {
            goal.classList.add("hide");
        }

        sendToDataBase(mainGoals)
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
        <p>${goal.name}</p>
        <input type="checkbox" name="check_note" id="check_note" ${
                    goal.checkState === true ? "checked" : "unchecked"
                }>
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
        document
            .querySelector(".subsubgoals_macro_container")
            .classList.add("hide");

        sendToDataBase(mainGoals)
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

        sendToDataBase(mainGoals)
    });
}

checkoffSubGoalsAndAddPercentage();
