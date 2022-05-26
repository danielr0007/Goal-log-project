


async function loginUser() {
    event.preventDefault();

    let userData = {};
    userData.email = document.getElementById("login_email").value;
    userData.password = document.getElementById("login_password").value;
    console.log(userData.email)
    console.log(userData.password)

    //console.log(userData)   testing purposes

    const rawResponse = await fetch('/loginUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    let content = await rawResponse.text();
    console.log(content);

    if(content == 'true') {
        alert("login successful");
        window.location = 'index.html';
    }else {
        alert("login failed, try again.")
        document.getElementById("login_email").value = "";
        document.getElementById("login_password").value = "";
    }


}