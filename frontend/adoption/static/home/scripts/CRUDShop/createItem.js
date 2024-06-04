// Add Item
document
  .getElementById("add-item-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch("http://localhost:4000/api/v1/items/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const messageElement = document.getElementById("item-message");
        if (data.success) {
          messageElement.textContent = "Item added successfully!";
          messageElement.style.color = "green";
          this.reset();
        } else {
          messageElement.textContent = `Error: ${data.message}`;
          messageElement.style.color = "red";
        }
      })
      .catch((error) => {
        const messageElement = document.getElementById("item-message");
        messageElement.textContent = `Error: ${
          error.message || "An unexpected error occurred"
        }`;
        messageElement.style.color = "red";
      });
  });
