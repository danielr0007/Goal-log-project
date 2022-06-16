


const object = [
    {
        name: "goal1",
        checkState: true,
        subgoals: [
            {
                name: "goal15",
                subgoals: [
                    {
                        name: "goal16",
                        checkState: true
                    },
                    {
                        name: "goal16",
                        checkState: false
                    }
                ]
            },
            {
                name: "goal25",
                subgoals: []
            }
        ]
    },
    {
        name: "goal2",
        checkState: false,
        subgoals: []
    }
]










document.getElementById("buttonTest").addEventListener("click", async function (){


    let userData = {}

    userData.id = 15;
    userData.goalObject = JSON.stringify(object);

    const rawResponse = await fetch('/postGoalObject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res=> res.json()).then(data => console.log(data))


})





