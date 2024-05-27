document
  .getElementById("delete-pet-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const petId = document.getElementById("delete-pet-id").value.trim();
    if (!petId) {
      return;
    }
    deletePet(petId);
  });

function deletePet(petId) {
  fetch(`http://localhost:4000/api/v1/pets/delete/${petId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pet deleted successfully:", data);
      const messageElement = document.getElementById("delete-message");
      messageElement.textContent = "Pet deleted successfully.";
      messageElement.style.color = "green"; // Set the message color to green
    })
    .catch((error) => {
      console.error("Error deleting pet:", error);
      const messageElement = document.getElementById("delete-message");
      messageElement.textContent = "Error deleting pet. Please try again.";
      messageElement.style.color = "red"; // Set the message color to red
    });
}
