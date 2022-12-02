import { menuArray } from "./data.js";

let c = 0;
let total = 0;
const mainContainerEl = document.getElementById("main-container");
const orderReviewEl = document.getElementById("order-review");

render();

document.addEventListener("click", function (e) {
  if (e.target.dataset.plusbtn) {
    const AddBtn = document.getElementById(e.target.id);

    selectedItem(e.target.dataset.plusbtn);
  }
});

function selectedItem(orderId) {
  const orderEl = document.getElementById(orderId);
  const orderTotalEL = document.getElementById("order-total");

  if (c > 0) {
    orderReviewEl.innerHTML += `
      <div class="order-review-data">
        <h3>${orderEl.getElementsByTagName("h2")[0].dataset.name}</h3>
        <span>remove</span>
        <h4>${orderEl.getElementsByTagName("h3")[0].dataset.price}</h4>
      </div>
    `;
    c++;
  } else {
    c++;
    orderReviewEl.innerHTML += `
      <h2>Your order</h2>
      <div class="order-review-data">
        <h3>${orderEl.getElementsByTagName("h2")[0].dataset.name}</h3>
        <span>remove</span>
        <h4>${orderEl.getElementsByTagName("h3")[0].dataset.price}</h4>
      </div>
    `;
  }
  orderReviewEl.style.borderBottom = "1px solid #393333";

  total += Number(orderEl.getElementsByTagName("h3")[0].dataset.price);

  orderTotalEL.innerHTML = `
    <h3>Total price:</h3>
    <h4>${total}</h4>
  `;
}

function render() {
  let ordersFeeds = "";

  menuArray.forEach(function (menuItem) {
    ordersFeeds += `
      <div class="order-item" id="${menuItem.id}">
        <span "${menuItem.emoji}">${menuItem.emoji}</span>
        <div class="order-details">
          <h2 data-name = ${menuItem.name}>${menuItem.name}</h2>
          <p>${menuItem.ingredients}</p>
          <h3 data-price = "${menuItem.price}">$${menuItem.price}</h3>
        </div>
        <button data-plusBtn = "${menuItem.id}"  id="btn-${menuItem.id}">+</button>
      </div>
    `;
  });

  mainContainerEl.innerHTML = ordersFeeds;
}
