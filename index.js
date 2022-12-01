import { menuArray } from "./data.js";

const mainContainerEl = document.getElementById("main-container");
const AddBtn = document.getElementById("Add-btn");

// AddBtn.addEventListener("click", function () {

// });

function render() {
  let ordersFeeds = "";

  menuArray.forEach(function (menuItem) {
    ordersFeeds += `
      <div class="order-item" id="${menuItem.id}">
        <span>${menuItem.emoji}</span>
        <div class="order-details">
          <h2>${menuItem.name}</h2>
          <p>${menuItem.ingredients}</p>
          <h3>$${menuItem.name}</h3>
        </div>
        <button>+</button>
      </div>
    `;
  });

  mainContainerEl.innerHTML = ordersFeeds;
}

render();
