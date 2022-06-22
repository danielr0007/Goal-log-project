/*if(localStorage.getItem("token") == null){

    alert("you need to log in");
    window.location.href = "index.html";

}else{*/

if (localStorage.userPicture != undefined) {
  document.getElementById("profileImage").src =
    "data:image/jpeg;base64," + localStorage.getItem("userPicture");
  document.getElementById("profileImage2").src =
    "data:image/jpeg;base64," + localStorage.getItem("userPicture");
}



let uploadButton = document.getElementById("uploadpic");
//pic upload...change
//when file is loaded the file gets sent to db via fetch function and returns user obj with file included
uploadButton.addEventListener("change", async function () {
  if (localStorage.getItem("token") == null) {
    alert("You need to log back in.");
    window.location.href = "index.html";
  }

  userId = JSON.parse(localStorage.getItem("userID"));

  let formData = new FormData();
  formData.append("file", uploadButton.files[0]);
  formData.append("id", userId);

  console.log("file,selected, ready for upload:");
  console.log(uploadButton.files[0]);

  const rawResponse = await fetch("/uploadPic", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: localStorage.token,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("this is the picture data from upload pic api: ");
      console.log(data);
      if (data.status == 400) {
        console.log("the status is 400 . you need to log out");
        //window.location.href = 'index.html'
      } else {
        document.getElementById("profileImage").src =
          "data:image/jpeg;base64," + data.picture;
        document.getElementById("profileImage2").src =
          "data:image/jpeg;base64," + data.picture;
        localStorage.userPicture = data.picture;
      }
    });
});

//when user clicks logout, token gets eliminated from localstorage and redirects to index.html
document.getElementById("log_out").addEventListener("click", function () {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  window.location.href = "index.html";
  console.log('working')
});

//}
