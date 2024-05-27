document.addEventListener("DOMContentLoaded", function () {
  const hintForm = document.querySelector("form");
  hintForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const hint = document.querySelector('input[type="text"]').value;
    const newPassword = document.querySelectorAll('input[type="password"]')[0]
      .value;
    const verifyPassword = document.querySelectorAll(
      'input[type="password"]'
    )[1].value;

    if (newPassword !== verifyPassword) {
      const errorMessage = document.createElement("p");
      errorMessage.style.color = "red";
      errorMessage.textContent = "Passwords do not match";
      hintForm.appendChild(errorMessage);
      return;
    }

    // Send a POST request to your backend with hint and new password
    fetch("http://localhost:4000/api/v1/login/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hint, newPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          const successMessage = document.createElement("p");
          successMessage.style.color = "green";
          successMessage.textContent = "Password changed successfully";
          hintForm.appendChild(successMessage);
        } else {
          const errorMessage = document.createElement("p");
          errorMessage.style.color = "red";
          errorMessage.textContent = "Incorrect hint";
          hintForm.appendChild(errorMessage);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
