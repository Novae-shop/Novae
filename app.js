document.addEventListener("DOMContentLoaded", () => {

    // =========================
  // 📦 PRODUITS
  // =========================

  const products = [
    {
      id: 1,
      name: "Chaussures Nike",
      price: 25000,
      category: "Chaussures",
      image: "images/Chaussures/chaussure1.jpeg"
    }
  ];

  // =========================
  // 📍 DOM
  // =========================

  const productList = document.getElementById("product-list");
  const categories = document.querySelectorAll(".category");

  const cartBtn = document.getElementById("cart-btn");
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");
  const closeCart = document.getElementById("close-cart");
  const checkoutBtn = document.getElementById("checkout-btn");

  // =========================
  // 🛒 PANIER
  // =========================

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // =========================
  // 💾 SAVE
  // =========================

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // =========================
  // 🔢 COUNT
  // =========================

  function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (!count) return;

    count.textContent = cart.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 1);
    }, 0);
  }

  // =========================
  // 🛒 ADD
  // =========================

  function addToCart(product) {

    const existing = cart.find(
      p => p.id === product.id
    );

    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    saveCart();

    updateCartCount();

    renderCart();
  }

  // =========================
  // 🛍️ PRODUITS
  // =========================

  function displayProducts(productsToShow) {

    // ✅ sécurité
    if (!productList) return;

    productList.innerHTML = "";

    productsToShow.forEach(product => {

      const card = document.createElement("div");

      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">

        <div class="add-to-cart">
          Ajouter
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <strong>${product.price} FCFA</strong>
        </div>
      `;

      const addBtn = card.querySelector(".add-to-cart");

      addBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        addToCart(product);

      });

      productList.appendChild(card);

    });

};

// 🚀 INIT

  if (productList) {
    displayProducts(products);
  }

  updateCartCount();

  const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


});