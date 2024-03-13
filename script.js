const deleteAllBtn = document.querySelector(".delete-div .fa-trash-can");
const products = document.querySelector("article.products");

const FreeShippingLimit = 3000;
const ShippingPrice = 25.99;
const TaxRate = 0.18;

deleteAllBtn.addEventListener("click", (e) => {
  products.textContent = "No Product";
  products.classList.add("no-product");
  document.querySelector(".delete-div").remove();
  // document.querySelector(".delete-div").style.display = "none";
  calculatePrice();
});

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.textContent++;
    calculatePrice(e.target);
  } else if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.textContent > 1) {
      e.target.nextElementSibling.textContent--;
      calculatePrice(e.target);
    }
  } else if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest(".product").remove();
    calculatePrice(e.target);
  }
});

const calculatePrice = (btn) => {
  const discountedPrice = btn
    .closest(".product-info")
    .querySelector("#discounted-price");

  const productPrice = btn
    .closest(".buttons-div")
    .querySelector("#product-price");

  const quantity = btn.parentNode.querySelector("#quantity");

  productPrice.textContent = (
    quantity.textContent * discountedPrice.textContent
  ).toFixed(2);

  calculateTotalPrice();
};

const calculateTotalPrice = () => {
  const prices = document.querySelectorAll("#product-price");
  const total = [...prices].reduce(
    (sum, price) => sum + Number(price.textContent),
    0
  );

  const shippingprice =
    total >= FreeShippingLimit || total === 0 ? 0.0 : ShippingPrice;
  const taxPrice = total * TaxRate;
  const sum = total + taxPrice + shippingprice;
  const selectedPrice = document.querySelector("#selected-price");
  selectedPrice.textContent = total.toFixed(2);

  document.getElementById("shipping").textContent = shippingprice.toFixed(2);
  document.getElementById("tax").textContent = taxPrice.toFixed(2);
  document.getElementById("total").textContent = sum.toFixed(2);
};

window.addEventListener("load", () => {
  calculateTotalPrice();
});
