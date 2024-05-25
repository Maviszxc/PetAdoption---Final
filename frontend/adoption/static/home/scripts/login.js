document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Send a POST request to your backend with username and password
    fetch("http://localhost:4000/api/v1/login/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Check if login was successful
        if (data.success) {
          // Redirect to adminDashboard if login successful
          window.location.href = "/templates/home/adminDashboard.html";
        } else {
          // Display error message if login failed
          alert("Username or password is incorrect");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
