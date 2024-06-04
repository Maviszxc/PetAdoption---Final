document.addEventListener("DOMContentLoaded", () => {
        const cartContainer = document.getElementById("cart-container");
        const cartItems = document.getElementById("cart-items");
        const itemList = document.getElementById("item-list");
        const userForm = document.getElementById("user-form");

        let cart = [];

        // Fetch items from the server
        fetch("/api/v1/items")
          .then(response => response.json())
          .then(data => {
            data.forEach(item => {
              const itemDiv = document.createElement("div");
              itemDiv.className = "shop-item";
              itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.item}">
                <h3>${item.item}</h3>
                <p>${item.description}</p>
                <p>$${item.cost}</p>
                <button class="add-to-cart" data-id="${item._id}">Add to Cart</button>
              `;
              itemList.appendChild(itemDiv);
            });

            document.querySelectorAll(".add-to-cart").forEach(button => {
              button.addEventListener("click", (e) => {
                const itemId = e.target.getAttribute("data-id");
                const item = data.find(i => i._id === itemId);
                cart.push(item);
                updateCart();
              });
            });
          });

        // Update cart display
        function updateCart() {
          cartItems.innerHTML = "";
          cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.item}">
              <h3>${item.item}</h3>
              <p>$${item.cost}</p>
            `;
            cartItems.appendChild(cartItem);
          });
        }

        // Handle form submission
        userForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(userForm);
          const userInfo = {};
          formData.forEach((value, key) => (userInfo[key] = value));

          fetch("/api/v1/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: userInfo, cart }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert("Order placed successfully!");
                cart = [];
                updateCart();
                userForm.reset();
              } else {
                alert("Failed to place order.");
              }
            })
            .catch(error => console.error("Error:", error));
        });
      });