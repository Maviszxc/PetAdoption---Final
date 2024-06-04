document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("add-booking-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const date = formData.get("date");
      const time = formData.get("time");

      // Combine date and time into a single ISO date string
      const dateTime = new Date(`${date}T${time}`);
      if (isNaN(dateTime.getTime())) {
        document.getElementById("booking-message").textContent =
          "Error: Invalid time value";
        document.getElementById("booking-message").style.color = "red";
        return;
      }

      // Create a plain object to convert it to JSON
      const bookingData = {
        fname: formData.get("fname"),
        email: formData.get("email"),
        dateTime: dateTime.toISOString(), // Use ISO format for dateTime
        message: formData.get("message"),
      };

      fetch("http://localhost:4000/api/v1/book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          const messageElement = document.getElementById("booking-message");
          if (data.success) {
            messageElement.textContent = "Booking added successfully!";
            messageElement.style.color = "green";
            this.reset();
          } else {
            messageElement.textContent = `Error: ${data.message}`;
            messageElement.style.color = "red";
          }
        })
        .catch((error) => {
          const messageElement = document.getElementById("booking-message");
          messageElement.textContent = `Error: ${
            error.message || "An unexpected error occurred"
          }`;
          messageElement.style.color = "red";
        });
    });
});
