
/*if(localStorage.getItem("token") == null){

    alert("you need to log in");
    window.location.href = "index.html";

}else{*/



document.getElementById("profileImage").src = "data:image/jpeg;base64," + localStorage.getItem("userPicture");




//on ready load user profile info with session storage saved user object at login
let userObject = JSON.parse(localStorage.getItem("userID"));//CONVERTS THE TEXT TO JSON FORMAT


let userData = {};

userData.id = userObject;



//calls api when page loads to get user data and load it to profile as soon as page load
    const rawResponse =  fetch('/getUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(userData)//the object containing email and pass converted to JSON in the request body
    })
        .then(response => response.json())//extract the response body
        .then(data => {
            console.log("User object response from getUser API:")
            console.log(data)
            if(data != null){
                document.getElementById("profileImage").src = "data:image/jpeg;base64," + data.picture;
                document.getElementById("username1").innerText = data.firstName + " " + data.lastName;
                document.getElementById("usergoal1").innerText = "Goal: " + data.goal;


               // localStorage.setItem("userOBJ",JSON.stringify(data) )
            }

        })




let uploadButton = document.getElementById("uploadpic");
//pic upload...change
//when file is loaded the file gets sent to db via fetch function and returns user obj with file included
uploadButton.addEventListener("change", async function () {

    if(localStorage.getItem("token") == null){
        alert("You need to log back in.");
        window.location.href = "index.html";
    }

    userId = JSON.parse(localStorage.getItem("userID"));

    let formData = new FormData();
    formData.append("file", uploadButton.files[0])
    formData.append("id",userId)

    console.log("file,selected, ready for upload:")
    console.log(uploadButton.files[0])

    const rawResponse = await fetch('/uploadPic', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.token
        },
        body: formData
    }).then(res=>res.json())
        .then(data=>{
            console.log("this is the picture data from upload pic api: ")
            console.log(data)
            if(data.status == 400){
                console.log("the status is 400 . you need to log out")
                //window.location.href = 'index.html'

            }else{
                document.getElementById("profileImage").src = "data:image/jpeg;base64,"+ data.picture;
                localStorage.userPicture = data.picture;
            }

        })

})

    //when user clicks logout, token gets eliminated from localstorage and redirects to index.html
document.getElementById("log_out").addEventListener("click",function (){

        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        window.location.href="index.html";

})

//}

