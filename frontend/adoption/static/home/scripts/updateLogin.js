document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("update-login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const loginId = document.getElementById("update-login-id").value.trim();
      const username = document.getElementById("update-username").value.trim();
      const password = document.getElementById("update-password").value.trim();

      const updatedLogin = {
        username,
        password,
      };

      fetch(
        `http://localhost:4000/api/v1/login/update/664dd210703b3ff8ac98c3bb`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLogin),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message || "Failed to update credentials");
            });
          }
          return response.json();
        })
        .then((data) => {
          const messageElement = document.getElementById("update-message");
          messageElement.textContent = `Updated successfully: ${JSON.stringify(
            data
          )}`;
          messageElement.style.color = "green";
          updateLoginDetailsInDOM(data);
        })
        .catch((error) => {
          const messageElement = document.getElementById("update-message");
          messageElement.textContent = `Error: ${error.message}`;
          messageElement.style.color = "red";
        });
    });
});

function updateLoginDetailsInDOM(updatedLogin) {
  const loginElement = document.getElementById(`login-${updatedLogin._id}`);
  if (loginElement) {
    loginElement.querySelector(
      ".login-username"
    ).textContent = `Username: ${updatedLogin.username}`;
  }
}
