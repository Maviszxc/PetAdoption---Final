 // Update Item
 document.getElementById("update-item-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const itemId = document.getElementById("update-item-id").value.trim();
    const formData = new FormData(this);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    fetch(`/api/v1/items/update/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || "Failed to update item");
        });
      }
      return response.json();
    })
    .then(data => {
      const messageElement = document.getElementById("update-item-message");
      messageElement.textContent = "Item updated successfully!";
      messageElement.style.color = "green";
      this.reset();
    })
    .catch(error => {
      const messageElement = document.getElementById("update-item-message");
      messageElement.textContent = `Error: ${error.message || "An unexpected error occurred"}`;
      messageElement.style.color = "red";
    });
  });