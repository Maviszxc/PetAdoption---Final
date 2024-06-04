document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Send a POST request to your backend with username and password
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        const errorMessage = document.getElementById("error-message");
        if (data.success) {
          // Redirect to adminDashboard if login successful
          window.location.href = "adminDashboard";
        } else {
          // Display error message if login failed
          errorMessage.textContent = data.message;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("error-message").textContent =
          "Server error. Please try again later.";
      });
  });
});
