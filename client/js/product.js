import { onCarts } from "./cart.js";

const API_URL = "http://localhost:4000/api/products"; /* http://backend:4000/api/products => docker */

/* DOM iD */
const $container = document.getElementById("product-container");
const $cartsCount = document.getElementById("cart-counter");

const getProduct = async () => {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];

  const updateCartCount = () => {
    const totalItems = carts.reduce((acc, item) => acc + item.quantity, 0);
    $cartsCount.textContent = totalItems;
    console.log('pasmos')
  };

  try {
    const response = await fetch(API_URL);
    const {data} = await response.json();
    const productsHTML = data.map(product => {
        return `
          <div class="product-card">
            <img src="${product.img}" class="product-image" alt="product">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button id="${product._id}" class="add-to-cart">Agregar al carrito</button>
          </div>`;
      }).join("");

      $container.innerHTML = productsHTML;
      updateCartCount()
      onCarts();
  } catch (error) {}
};

getProduct()