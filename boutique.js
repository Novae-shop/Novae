document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================== */
  /* 🛒 PANIER */
  /* ===================================================== */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (!count) return;

    const totalQty = cart.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 1);
    }, 0);

    count.textContent = totalQty;
  }

  function getTotal() {

    return cart.reduce((total, item) => {

      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;

      return total + (price * qty);

    }, 0);
  }

  function refreshCartUI() {

    saveCart();

    updateCartCount();

    renderCart();
  }

  function addToCart(product) {

    const existing = cart.find(p => p.id === product.id);

    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });
    }

    refreshCartUI();

    console.log("✅ Produit ajouté :", product.name);
  }

  function increaseQty(index) {

    cart[index].quantity++;

    refreshCartUI();
  }

  function decreaseQty(index) {

    if (cart[index].quantity > 1) {

      cart[index].quantity--;

    } else {

      cart.splice(index, 1);
    }

    refreshCartUI();
  }

  function removeItem(index) {

    cart.splice(index, 1);

    refreshCartUI();
  }

  /* ===================================================== */
  /* 📦 PRODUITS */
  /* ===================================================== */

  // 📦 PRODUITS
  const products = [
    // {
    //   id: 1,
    //   name: "Nike Air Max",
    //   price: 45000,
    //   category: "shoes",
    //   image: 
    // },
    // {
    //   id: 2,
    //   name: "Jordan Retro",
    //   price: 65000,
    //   category: "shoes",
    //   image: 
    // },
    {
      id: 1,
      name: "T-shirt Adidas",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit1.jpeg"
    },
    {
      id: 2,
      name: "T-shirt Casablanca",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit2.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Armani",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit3.jpeg"
    },
        {
      id: 4,
      name: "T-shirt Brubrry",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit4.jpeg"
    },
        {
      id: 5,
      name: "T-shirt Jordan",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit5.jpeg"
    },
        {
      id: 6,
      name: "T-shirt  Balenciaga",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit6.jpeg"
    },
        {
      id: 7,
      name: "T-shirt Puma",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit7.jpeg"
    },
        {
      id: 8,
      name: "   T-shirt B",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit8.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Welldone",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit9.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Celine",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit10.jpeg"
    },
        {
      id: 3,
      name: "T-shirt alo",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit11.jpeg"
    },
        {
      id: 3,
      name: "Habit complet disign Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit12.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit13.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit14.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit15.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit16.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit17.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit18.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit19.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit20.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit21.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit1.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit22.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit23.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit24.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit25.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit26.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit27.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit28.jpeg"
    },
   {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit29.jpeg"
    },
   {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit30.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit31.jpeg"
    },
    
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit32.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit34.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit33.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit35.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit36.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit37.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit38.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit39.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit40.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit41.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit42.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit43.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit44.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit45.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/pat1.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/pat2.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit46.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit47.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit48.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit49.jpeg"
    },
    {
      id: 3,
      name: "T-shirt Noir",
      price: 10000,
      category: "clothes",
      image:"images/Vêtement/habit50.jpeg"
    },
{
  id: 4,
  name: "IPhone 12ProMax 256Gb",
  price: 200000,
  category: "phones",
  image: "images/phones/iphone1.webp"
},
{
  id: 5,
  name: "IPhone XR 64Gb",
  price: 100000,
  category: "phones",
  image: "images/phones/iphone12.jpg"
},
{
  id: 6,
  name: "IPhone XR 256Gb",
  price: 120000,
  category: "phones",
  image: "images/phones/iphone14.jpg"
},
{
  id: 7,
  name: "IPhone 11 64Gb",
  price: 130000,
  category: "phones",
  image: "images/phones/iphone11.png"
},
{
  id: 13,
  name: "IPhone 11 128Gb ",
  price: 140000,
  category: "phones",
  image: "images/phones/iphone10.png"
},
{
  id: 14,
  name: "IPhone 12 64Gb",
  price: 130000,
  category: "phones",
  image: "images/phones/iphone9.jpg"
},
{
  id: 15,
  name: "IPhone 13 256Gb",
  price: 190000,
  category: "phones",
  image: "images/phones/iphone8.jpg"
},
{
  id: 16,
  name: "IPhone 13 128Gb",
  price: 200000,
  category: "phones",
  image: "images/phones/iphone7.jpg"
},
{
  id: 17,
  name: "IPhone 13Pro 128Gb",
  price: 240000,
  category: "phones",
  image: "images/phones/iphone6.jpg"
},
{
  id: 17,
  name: "IPhone 13Pro 256Gb",
  price: 250000,
  category: "phones",
  image: "images/phones/iphone15.jpg"
},
{
  id: 18,
  name: "IPhone 14 128Gb ",
  price: 220000,
  category: "phones",
  image: "images/phones/iphone5.jpg"
},
{
  id: 18,
  name: "IPhone 14 128Gb ",
  price: 220000,
  category: "phones",
  image: "images/phones/iphones5.jpg"
},
{
  id: 19,
  name: "IPhone 14Pro 128Gb",
  price: 270000,
  category: "phones",
  image: "images/phones/iphone4.jpg"
},
{
  id: 20,
  name: "IPhone 14Pro 256Gb",
  price: 290000,
  category: "phones",
  image: "images/phones/iphones4.jpg"
},
{
  id: 21,
  name: "IPhone 14ProMax 128Gb",
  price: 300000,
  category: "phones",
  image: "images/phones/iphone3.jpg"
},
{
  id: 22,
  name: "IPhone 15ProMax 128Gb",
  price: 450000,
  category: "phones",
  image: "images/phones/iphone13.jpg"
},
{
  id: 23,
  name: "Iphone 16 128Gb",
  price: 390000,
  category: "phones",
  image: "images/phones/iphone2.jpg"
},

{
  id: 25,
  name: " Pixel 6 128Gb",
  price: 100000,
  category: "phones",
  image: "images/phones/pixel2.jpeg"
},
{
  id: 26,
  name: "Pixel 7 128Gb",
  price: 120000,
  category: "phones",
  image: "images/phones/pixel1.jpg"
},
{
  id: 27,
  name: " Motorola G 04 128Gb",
  price: 60000,
  category: "phones",
  image: "images/phones/moto1.jpg"
},
{
  id: 28,
  name: "Motorola G-5G 2025 64Gb",
  price: 60000,
  category: "phones",
  image: "images/phones/moto2.jpg"
},
{
  id: 29,
  name: "Motorola G-5G 2025 128Gb",
  price: 70000,
  category: "phones",
  image: "images/phones/moto3.jpg"
},
  ];

  /* ===================================================== */
  /* 🔍 ELEMENTS */
  /* ===================================================== */

  const productList = document.getElementById("product-list");

  const searchInput =
  document.getElementById("searchInput");

  const categoryFilter =
  document.getElementById("categoryFilter");

  const sortFilter =
  document.getElementById("sortFilter");

  /* ===================================================== */
  /* 🛍️ AFFICHAGE PRODUITS */
  /* ===================================================== */

  function displayProducts(list) {

    if (!productList) return;

    productList.innerHTML = "";

    if (list.length === 0) {

      productList.innerHTML =
      "<p>Aucun produit trouvé</p>";

      return;
    }

    list.forEach(product => {

      const card = document.createElement("div");

      card.classList.add("product-card");

      card.innerHTML = `
      
        <img
          src="${product.image}"
          alt="${product.name}"
          onerror="this.src='images/fallback.jpg'"
        >

        <button class="add-to-cart">
          Ajouter
        </button>

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <strong>
            ${product.price.toLocaleString()} FCFA
          </strong>

        </div>
      `;

      /* ========================================= */
      /* 🔗 PAGE PRODUIT */
      /* ========================================= */

      card.addEventListener("click", () => {

        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(product)
        );

        window.location.href = "product.html";
      });

      /* ========================================= */
      /* 🛒 BOUTON AJOUT */
      /* ========================================= */

      const addBtn =
      card.querySelector(".add-to-cart");

      addBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        addToCart(product);
      });

      productList.appendChild(card);
    });
  }

  /* ===================================================== */
  /* 🔍 FILTRES */
  /* ===================================================== */

  function applyFilters() {

    let result = [...products];

    /* 🔎 RECHERCHE */

    if (searchInput) {

      const search =
      searchInput.value.toLowerCase();

      result = result.filter(product => {

        return product.name
        .toLowerCase()
        .includes(search);
      });
    }

    /* 📂 CATEGORIE */

    if (
      categoryFilter &&
      categoryFilter.value !== "all"
    ) {

      result = result.filter(product => {

        return product.category ===
        categoryFilter.value;
      });
    }

    /* 💰 TRI */

    if (sortFilter) {

      if (sortFilter.value === "price-asc") {

        result.sort((a, b) => a.price - b.price);
      }

      if (sortFilter.value === "price-desc") {

        result.sort((a, b) => b.price - a.price);
      }
    }

    displayProducts(result);
  }

  /* ===================================================== */
  /* 🛒 UI PANIER */
  /* ===================================================== */

  const cartBtn =
  document.getElementById("cart-btn");

  const cartSidebar =
  document.getElementById("cart-sidebar");

  const overlay =
  document.getElementById("overlay");

  const closeCart =
  document.getElementById("close-cart");

  const cartItemsContainer =
  document.getElementById("cart-items");

  const cartTotal =
  document.getElementById("cart-total");

  /* ========================================= */
  /* 🛒 OUVRIR PANIER */
  /* ========================================= */

  if (cartBtn) {

    cartBtn.addEventListener("click", () => {

      cartSidebar.classList.add("active");

      overlay.classList.add("active");

      renderCart();
    });
  }

  /* ========================================= */
  /* ❌ FERMER PANIER */
  /* ========================================= */

  if (closeCart) {

    closeCart.addEventListener(
      "click",
      closeCartUI
    );
  }

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeCartUI
    );
  }

  function closeCartUI() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");
  }

  /* ===================================================== */
  /* 🛍️ AFFICHER PANIER */
  /* ===================================================== */

  function renderCart() {

    if (!cartItemsContainer || !cartTotal) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

      cartItemsContainer.innerHTML =
      "<p>Panier vide</p>";

      cartTotal.textContent =
      "Total : 0 FCFA";

      return;
    }

    cart.forEach((item, index) => {

      cartItemsContainer.innerHTML += `

        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div>

            <strong>${item.name}</strong>

            <p>
              ${item.price.toLocaleString()} FCFA
            </p>

            <div class="qty-controls">

              <button
                onclick="decreaseQty(${index})"
              >
                ➖
              </button>

              <span>${item.quantity}</span>

              <button
                onclick="increaseQty(${index})"
              >
                ➕
              </button>

            </div>

          </div>

          <button
            class="remove-btn"
            onclick="removeItem(${index})"
          >
            ❌
          </button>

        </div>
      `;
    });

    cartTotal.textContent =
    "Total : " +
    getTotal().toLocaleString() +
    " FCFA";
  }

  /* ===================================================== */
  /* 🔥 GLOBAL FUNCTIONS */
  /* ===================================================== */

  window.increaseQty = increaseQty;

  window.decreaseQty = decreaseQty;

  window.removeItem = removeItem;

  /* ===================================================== */
  /* 📦 CHECKOUT */
  /* ===================================================== */

  const checkoutBtn =
  document.getElementById("checkout-btn");

  if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

      if (cart.length === 0) {

        alert("❌ Panier vide");

        return;
      }

      window.location.href =
      "checkout.html";
    });
  }

  /* ===================================================== */
  /* 🎯 EVENTS */
  /* ===================================================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      applyFilters
    );
  }

  if (categoryFilter) {

    categoryFilter.addEventListener(
      "change",
      applyFilters
    );
  }

  if (sortFilter) {

    sortFilter.addEventListener(
      "change",
      applyFilters
    );
  }

  /* ===================================================== */
  /* 🚀 INIT */
  /* ===================================================== */

  displayProducts(products);

  updateCartCount();

  renderCart();

});