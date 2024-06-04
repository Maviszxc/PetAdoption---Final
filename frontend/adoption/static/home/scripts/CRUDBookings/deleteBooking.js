document
  .getElementById("delete-booking-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const bookingId = document.getElementById("delete-booking-id").value.trim();
    if (!bookingId) {
      return;
    }

    fetch(`http://localhost:4000/api/v1/book/delete/${bookingId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const messageElement = document.getElementById(
          "delete-booking-message"
        );
        messageElement.textContent = "Booking deleted successfully!";
        messageElement.style.color = "green";
      })
      .catch((error) => {
        const messageElement = document.getElementById(
          "delete-booking-message"
        );
        messageElement.textContent = `Error: ${
          error.message || "An unexpected error occurred"
        }`;
        messageElement.style.color = "red";
      });
  });
