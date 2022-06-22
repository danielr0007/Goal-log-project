document
  .getElementById("recover_password_button")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    let formData = {};
    formData.firstName = document.getElementById("first_name").value;
    formData.lasttName = document.getElementById("last_name").value;
    formData.email = document.getElementById("email").value;

    console.log(formData);

    const rawResponse = await fetch("/recoverPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(
        (data) =>
          (document.getElementById("recoveredPassword").innerText =
            "Your password is: " + data)
      );
  });
