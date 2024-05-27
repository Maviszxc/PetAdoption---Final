document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded, fetching items...");

  fetch("http://localhost:4000/api/v1/items")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Response received:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      const itemList = document.getElementById("item-list");

      // Clear any existing content in the item-list
      itemList.innerHTML = "";

      // Check if data is not empty
      if (data.length === 0) {
        itemList.innerHTML = "<p>No item found.</p>";
        return;
      }

      data.forEach((item) => {
        const shopItem = document.createElement("div");
        shopItem.classList.add("shop-item");
        shopItem.innerHTML = `
          <h3>${item.item}</h3>
          <p>Description: ${item.description}</p>
          <p>Type: ${item.type}</p>
          <p>Cost: ${item.cost}</p>
          <p>Quantity: ${item.quantity}</p>
          <img src="${item.image}" alt="${item.image}" />
        `;
        itemList.appendChild(shopItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      const itemList = document.getElementById("item-list");
      itemList.innerHTML = `<p>Error fetching items: ${error.message}</p>`;
    });
});
