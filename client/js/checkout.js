const CHECKOUT_URL = "http://localhost:4000/api/carts"; /* http://backend:4000/api/carts => docker   */

const $cartCount = document.getElementById("cart-counter");
const $cartTableBody = document
  .getElementById("cart-table")
  .querySelector("tbody");

const $checkoutButton = document.getElementById("checkout");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let userId = JSON.parse(localStorage.getItem("userID"))

const updateCartCount = () => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  $cartCount.textContent = totalItems;
};

const renderCarts = () => {
  $cartTableBody.innerHTML = "";
  if (cart.length === 0) {
    $cartTableBody.innerHTML = `<tr><td colspan="6" class="no-result">No hay ningun producto agregado</td></tr>`;
    return;
  }

  const rowsHTML = cart
    .map((item) => {
      return `
        <tr>
            <td><img src="${item.img}" class="product-img" alt="imagen"/></td>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$ ${item.price * item.quantity.toFixed(2)}</td>
            <td data-id="${item.productId}" class="delete">Eliminar <img src="./assets/icons/trash.svg" width="25" alt="delete"/></td>
        </tr>`;
    })
    .join("");
  $cartTableBody.innerHTML = rowsHTML;

  deleteElements();
};

const checkout = async () => {
  if (cart.length === 0) {
    alert("El carrito esta vacío");
    return;
  }

  try {
    const response = await fetch(CHECKOUT_URL + "/add", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ items: cart, userId: userId }),
    });
    if (response.ok) {
      localStorage.removeItem("cart");
      cart = [];
      renderCarts();
      updateCartCount();
      alert("Compra realizada");
    } else {
      alert("No se pudo realizar la compra");
    }
  } catch (error) {
    alert("Error para realizar la compra, error del servidor");
  }
};

const deleteCartItem = (productId) => {
  cart = cart.filter((c) => c.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCarts();
  updateCartCount();
};

const deleteElements = () => {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      deleteCartItem(productId);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
   renderCarts();
  updateCartCount();
  $checkoutButton.addEventListener("click", checkout);
});
