// Add this to your frontend script (e.g., in `allPets.js`)

document.querySelectorAll(".card-action-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.closest(".product-card").dataset.productId;
    const userId = "currentUserId"; // Replace with the actual user ID
    const quantity = 1; // Or get the quantity from an input field

    fetch("/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Item added to cart:", data);
        // Update the UI or give feedback to the user
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  });
});
