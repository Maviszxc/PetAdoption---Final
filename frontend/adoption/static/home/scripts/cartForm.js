document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const contactNumber = document.getElementById("contactNumber").value;

  fetch("/api/v1/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, contactNumber }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User created:", data);
      localStorage.setItem("userId", data._id);
      document.querySelector(".form-container").style.display = "none";
      document.getElementById("shop-content").style.display = "block";
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
});

document.querySelectorAll(".card-action-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.closest(".product-card").dataset.productId;
    const userId = localStorage.getItem("userId");
    const quantity = 1;

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
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  });
});
