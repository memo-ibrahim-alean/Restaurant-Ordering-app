import { menuArray } from "./data.js";
import { v4 as uuid } from "https://jspm.dev/uuid";

let c = 0;
let total = 0;
const mainContainerEl = document.getElementById("main-container");
const orderReviewEl = document.getElementById("order-review");
let ordersArr = [];
let reviewString = "";

render();

document.addEventListener("click", function (e) {
  if (e.target.dataset.plusbtn) {
    const AddBtn = document.getElementById(e.target.id);
    selectedItem(e.target.dataset.plusbtn);
  }

  if (e.target.dataset.remove) {
    const removeOrderId = e.target.dataset.remove;
    const removeEL = document.getElementById(`${e.target.dataset.remove}`);
    let objIndex = ordersArr.findIndex((obj) => obj.newId === removeOrderId);
    // only splice array when item is found
    if (objIndex > -1) {
      ordersArr.splice(objIndex, 1); // 2nd parameter means remove one item only
      renderAfterRemove(removeEL);
    }
  }
});

function renderAfterRemove(removeEL) {
  const removedPrice = Number(removeEL.getElementsByTagName("h4")[0].innerHTML);
  total -= removedPrice;
  renderOrderArr();
}

function selectedItem(orderId) {
  orderReviewEl.innerHTML = "";
  let orderEl = document.getElementById(orderId);
  let orderObj = {
    name: orderEl.getElementsByTagName("h2")[0].dataset.name,
    price: orderEl.getElementsByTagName("h3")[0].dataset.price,
    newId: uuid(),
  };

  ordersArr.push(orderObj);
  total += Number(orderEl.getElementsByTagName("h3")[0].dataset.price);
  renderOrderArr();
}

function renderTotal() {
  const orderTotalEL = document.getElementById("order-total");
  if (total === 0) {
    orderTotalEL.innerHTML = "";
    orderReviewEl.style.borderBottom = "";
  } else {
    orderReviewEl.style.borderBottom = "1px solid #393333";
    orderTotalEL.innerHTML = `
  <h3>Total price:</h3>
  <h4>${total}</h4>
  `;
  }
}

function renderOrderArr() {
  reviewString = "";

  ordersArr.forEach(function (order) {
    reviewString += `<div class="order-review-data"  id="${order.newId}">
        <h3>${order.name}</h3>
        <span data-remove ="${order.newId}" >remove</span>
        <h4>${order.price}</h4>
      </div>`;
  });

  orderReviewEl.innerHTML = reviewString;

  renderTotal();
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
