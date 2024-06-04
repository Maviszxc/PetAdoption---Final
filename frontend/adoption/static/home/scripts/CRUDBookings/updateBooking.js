document
  .getElementById("update-booking-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const bookingId = document.getElementById("update-booking-id").value.trim();
    const formData = new FormData(this);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/book/update/${bookingId}`,
        {
          method: "PUT",
          body: JSON.stringify(formObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update booking");
      }
      const data = await response.json();
      document.getElementById("update-booking-message").textContent =
        "Booking updated successfully!";
      document.getElementById("update-booking-message").style.color = "green";
      this.reset();
    } catch (error) {
      document.getElementById(
        "update-booking-message"
      ).textContent = `Error: ${error.message}`;
      document.getElementById("update-booking-message").style.color = "red";
    }
  });
