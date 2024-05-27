document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("add-pet-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);

      fetch("http://localhost:4000/api/v1/pets/create", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const messageElement = document.getElementById("message");

          if (data.success) {
            messageElement.textContent = "Pet added successfully!";
            messageElement.style.color = "green";
          } else {
            messageElement.textContent = `Error: ${data.message}`;
            messageElement.style.color = "red";
          }
        })
        .catch((error) => {
          const messageElement = document.getElementById("message");
          console.error("Error:", error); // Log the full error object
          messageElement.textContent = `Error: ${
            error.message || "An unexpected error occurred"
          }`;
          messageElement.style.color = "red";
        });
    });
});
