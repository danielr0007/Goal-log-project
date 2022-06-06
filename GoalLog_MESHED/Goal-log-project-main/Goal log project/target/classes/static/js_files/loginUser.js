
/*
* This function extracts email and password information from the login form, then calls the loginAPI to see
* if that info matches with a record in the database, if so, then we call the API again to fetch that user's
* information that way we can use it to fill out their profile pages. If no records match, then an alert saying
* "login unsuccessful" appears.
* */

 function loginUser() {
    event.preventDefault();//prevents form to submit onclick(that way the page doesn't refresh automatically)

    //stores user email and pass in an object
    let userData = {};
    userData.email = document.getElementById("login_email").value;
    userData.password = document.getElementById("login_password").value;

    //calls the login api to verify if user is in database to login by sending email and password
    const rawResponse =  fetch('/loginUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)//the object containing email and pass converted to JSON in the request body
    })
        .then(res => res.json())//this extracts the response body from the promise sent back by api
        .then(data => {
            //then we use that data to see if its true or false
            if (data[0] != "0" ) {
                alert("login successful");//**if true,then the api gets called again to fetch that user's information
                localStorage.token = data[0];
                localStorage.userID = data[1];
                console.log("This is the array gotten from the login api:");
                console.log(data);

                window.location = "profile_page.html";

            }else if (data[0] == "0"){
                console.log("this is the null data from login api:")
                console.log(data);
                alert("login failed, try again.")//**if the response data was null, then nothing happens
                document.getElementById("login_password").value = "";
            }
        })
}
