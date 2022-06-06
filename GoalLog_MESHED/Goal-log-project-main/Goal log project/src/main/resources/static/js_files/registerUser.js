



    async function registerUser() {
        event.preventDefault();

        let userData = {};
        userData.firstName = document.getElementById("first_name").value;
        userData.lastName = document.getElementById("last_name").value;
        userData.email = document.getElementById("email").value;
        userData.password = document.getElementById("password").value;
        userData.goal = document.getElementById("goal_text").value;

        //console.log(userData)   testing purposes

        let password2 = document.getElementById("confirm_password").value;

        if (password2 !== userData.password) {
            alert("passwords don't match, enter again.");
            document.getElementById("password").value = "";
            document.getElementById("confirm_password").value = "";
            return;
        }

        const rawResponse = await fetch('/registerUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        //const content = await rawResponse.json();
        // console.log(content);
        alert("user registered!")
        //window.location = 'index.html';



}


