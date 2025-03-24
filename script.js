document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  menuToggle.addEventListener("click", function () {
    mobileNav.style.display =
      mobileNav.style.display === "block" ? "none" : "block";
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".mobile-links a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.style.display = "none";
    });
  });
});

// ✅ Load Cart on Page Load
updateCartUI();

// ✅ Add to Cart Functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    if (!productCard) {
      console.error("🚨 No '.product-card' found!");
      return;
    }

    const productName = productCard.querySelector("h3")?.innerText;
    const productPrice = productCard.querySelector(".product-price")?.innerText;
    const productImage = productCard.querySelector("img")?.src;

    if (!productName || !productPrice || !productImage) {
      console.error("🚨 Missing product details!");
      return;
    }

    console.log(`✅ Adding to Cart: ${productName}, ${productPrice}`);
    addToCart(productName, productPrice, productImage);
  });
});

// ✅ Remove from Cart Event
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart")) {
    let productName = event.target.getAttribute("data-name");
    removeFromCart(productName);
  }
});

// ✅ Clear Cart Button
const clearCartButton = document.querySelector("button[onclick='clearCart()']");
if (clearCartButton) {
  clearCartButton.addEventListener("click", clearCart);
}

// ✅ Function to Add Item to Cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find((item) => item.name === name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ ${name} added to cart!`);
  updateCartUI();
}

// ✅ Function to Remove Item from Cart
function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// ✅ Function to Clear Cart
function clearCart() {
  localStorage.removeItem("cart");
  updateCartUI();
}

// ✅ Function to Update Cart UI
function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalItems = document.getElementById("total-items");
  let totalPrice = document.getElementById("total-price");

  if (!cartContainer || !totalItems || !totalPrice) {
    console.error("🚨 Cart UI elements not found!");
    return;
  }

  cartContainer.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-gray-500 text-center'>🛒 Your cart is empty!</p>";
    totalItems.innerText = "0";
    totalPrice.innerText = "0.00";
    return;
  }

  let totalQuantity = 0;
  let totalCost = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
    totalCost += parseFloat(item.price.replace("$", "")) * item.quantity;

    let cartItem = document.createElement("div");
    cartItem.classList.add(
      "cart-card",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "p-4",
      "flex",
      "items-center",
      "gap-4",
      "border"
    );

    cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg shadow">
          <div class="flex-1">
              <p class="font-bold text-lg">${item.name}</p>
              <p class="text-gray-600">${item.price}</p>
              <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
          </div>

          <button class="remove-from-cart bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition" data-name="${item.name}">
              ❌ Remove
          </button>
      `;

    cartContainer.appendChild(cartItem);
  });

  totalItems.innerText = totalQuantity;
  totalPrice.innerText = totalCost.toFixed(2);
}
