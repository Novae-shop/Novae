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
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit1.jpeg"
    },
    {
      id: 2,
      name: "T-shirt Casablanca",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit2.jpeg"
    },
        {
      id: 3,
      name: "T-shirt Armani",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit3.jpeg"
    },
        {
      id: 4,
      name: "T-shirt Brubrry",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit4.jpeg"
    },
        {
      id: 5,
      name: "T-shirt Jordan",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit5.jpeg"
    },
        {
      id: 6,
      name: "T-shirt  Balenciaga",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit6.jpeg"
    },
        {
      id: 7,
      name: "T-shirt Puma",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit7.jpeg"
    },
        {
      id: 8,
      name: "Balenciaga B Flames Oversized Reverse T-Shirt",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit8.jpeg"
    },
        {
      id: 9,
      name: "T-shirt Welldone",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit9.jpeg"
    },
        {
      id: 10,
      name: "T-shirt Celine",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit10.jpeg"
    },
        {
      id: 11,
      name: "T-shirt alo",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit11.jpeg"
    },
        {
      id: 12,
      name: "2 pièces chemise à manches courtes et pantalon pour hommes Noir",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit12.jpeg"
    },
        {
      id: 13,
      name: "2 pièces chemise à manches courtes et pantalon pour hommes beige",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit13.jpeg"
    },
        {
      id: 14,
      name: "Combinaison T-shirt et Short pour hommes Noir Motif grec",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit14.jpeg"
    },
        {
      id: 15,
      name: "Combinaison T-shirt et Short pour hommes Blanc sur noir",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit15.jpeg"
    },
        {
      id: 16,
      name: "Combinaison T-shirt et Short pour hommes Blanc sur bleu",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit16.jpeg"
    },
        {
      id: 17,
      name: "Combinaison T-shirt et Short pour hommes Blanc sur vert",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit17.jpeg"
    },
    {
      id: 18,
      name: "Combinaison T-shirt et Short pour hommes",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit18.jpeg"
    },
    {
      id: 19,
      name: "Combinaison T-shirt manche longue et Short pour hommes",
      price: 9000,
      category: "clothes",
      image:"images/Vêtement/habit19.jpeg"
    },
    {
      id: 20,
      name: "T-shirt Chrome hearts sans manche pour hommes",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit20.jpeg"
    },
        {
      id: 21,
      name: "T-shirt Louis vuitton sans manche pour hommes",
      price: 4500,
      category: "clothes",
      image:"images/Vêtement/habit21.jpeg"
    },

    {
      id: 23,
      name: "Chemise Fleurie pour hommes Bleu",
      price: 5000,
      category: "clothes",
      image:"images/Vêtement/habit22.jpeg"
    },
    {
      id: 24,
      name: "Chemise de Bowling Tourbillon de Peinture – Lazy Oaf",
      price: 5000,
      category: "clothes",
      image:"images/Vêtement/habit23.jpeg"
    },
    {
      id: 25,
      name: "Chemise Fleurie pour hommes Rouge bordeaux",
      price: 5000,
      category: "clothes",
      image:"images/Vêtement/habit24.jpeg"
    },
    {
      id: 26,
      name: "Chemise en coton Bleue Hawaïenne Fleurie pour hommes",
      price: 5000,
      category: "clothes",
      image:"images/Vêtement/habit25.jpeg"
    },
    {
      id: 27,
      name: "une chemise à manches courtes avec un design color-block pour hommes",
      price: 5000,
      category: "clothes",
      image:"images/Vêtement/habit26.jpeg"
    },
    {
      id: 28,
      name: "sweat-shirts à manches longues avec un logo graphique stylisé sur le devant",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit27.jpeg"
    },
    {
      id: 29,
      name: "sweat-shirts à manches longues Supreme",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit28.jpeg"
    },
   {
      id: 30,
      name: "sweat-shirts à manches longues Casablanca",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit29.jpeg"
    },
   {
      id: 31,
      name: "Sweat-shirts à manches longues Chrome hearts",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit30.jpeg"
    },
    {
      id: 32,
      name: "Sweat-shirts à manches longues Chrome hearts",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit31.jpeg"
    },
    
    {
      id: 33,
      name: "Alviero Martini - Ensemble de shorts en coton beige et blanc pour hommes",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit32.jpeg"
    },
    {
      id: 34,
      name: "Alviero Martini - Ensemble de shorts en coton vert et blanc pour hommes",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit33.jpeg"
    },
    {
      id: 35,
      name: "chemise à manches courtes avec col cubain et motif texturé couleur jaune moutarde",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit34.jpeg"
    },
    {
      id: 36,
      name: "chemise à manches courtes avec col cubain et motif texturé couleur bleu",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit35.jpeg"
    },
    {
      id: 37,
      name: "chemise à manches courtes avec col cubain et motif texturé couleur noir",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit36.jpeg"
    },
    {
      id: 38,
      name: "chemise à manches courtes avec col cubain et motif texturé couleur rouge bordeaux",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit37.jpeg"
    },
    {
      id: 39,
      name: "chemise à manches courtes avec col cubain et motif texturé couleur beige",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit38.jpeg"
    },
    {
      id: 40,
      name: "maillots Corteiz Allstarz",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit39.jpeg"
    },
    {
      id: 41,
      name: "T-shirt oversize à manches courtes",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit40.jpeg"
    },
    {
      id: 42,
      name: "T-shirt oversize à manches courtes Top self",
      price: 8000,
      category: "clothes",
      image:"images/Vêtement/habit41.jpeg"
    },
    {
      id: 43,
      name: "2 pièces chemise à sans manches et pantalon pour hommes beige",
      price: 12000,
      category: "clothes",
      image:"images/Vêtement/habit42.jpeg"
    },
    {
      id: 44,
      name: " Jogging Design Rayures courbées sur les côtés",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit43.jpeg"
    },
    {
      id: 45,
      name: "Jogging Disign Chrome hearts",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit44.jpeg"
    },
    {
      id: 46,
      name: "Jogging Disign RickFaker",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit45.jpeg"
    },
    {
      id: 47,
      name: "Pantalons Needles Noir",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/pat1.jpeg"
    },
    {
      id: 48,
      name: "Pantalons Needles Gris",
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/pat2.jpeg"
    },
    {
      id: 49,
      name: "Short Jean pour hommes", 
      price: 7000,
      category: "clothes",
      image:"images/Vêtement/habit46.jpeg"
    },
    {
      id: 50,
      name: "Maillot NFL Nike Rouge",
      price: 6000,
      category: "clothes",
      image:"images/Vêtement/habit47.jpeg"
    },
    {
      id: 51,
      name: " Maillot NFL Nike Jaune",
      price: 6000,
      category: "clothes",
      image:"images/Vêtement/habit48.jpeg"
    },
    {
      id: 52,
      name: "Ensemble survêtement (hoodie + pantalon) Broken Planet bleu clair",
      price: 13000,
      category: "clothes",
      image:"images/Vêtement/habit49.jpeg"
    },
    {
      id: 53,
      name: "Ensemble survêtement (hoodie + pantalon) Broken Planet Noir",
      price: 13000,
      category: "clothes",
      image:"images/Vêtement/habit50.jpeg"
    },

{
  id: 54,
  name: "IPhone 12ProMax 256Gb",
  price: 200000,
  category: "phones",
  image: "images/phones/iphone1.webp"
},
{
  id: 55,
  name: "IPhone XR 64Gb",
  price: 100000,
  category: "phones",
  image: "images/phones/iphone12.jpg"
},
{
  id: 56,
  name: "IPhone XR 256Gb",
  price: 120000,
  category: "phones",
  image: "images/phones/iphone14.jpg"
},
{
  id: 57,
  name: "IPhone 11 64Gb",
  price: 130000,
  category: "phones",
  image: "images/phones/iphone10.png"
},
{
  id: 58,
  name: "IPhone 11 128Gb ",
  price: 140000,
  category: "phones",
  image: "images/phones/iphone10.png"
},
{
  id: 59,
  name: "IPhone 12 64Gb",
  price: 130000,
  category: "phones",
  image: "images/phones/iphone9.jpg"
},
{
  id: 60,
  name: "IPhone 13 256Gb",
  price: 190000,
  category: "phones",
  image: "images/phones/iphone8.jpg"
},
{
  id: 61,
  name: "IPhone 13 128Gb",
  price: 200000,
  category: "phones",
  image: "images/phones/iphone7.jpg"
},
{
  id: 62,
  name: "IPhone 13Pro 128Gb",
  price: 240000,
  category: "phones",
  image: "images/phones/iphone6.jpg"
},
{
  id: 63,
  name: "IPhone 13Pro 256Gb",
  price: 250000,
  category: "phones",
  image: "images/phones/iphone15.jpg"
},
{
  id: 64,
  name: "IPhone 14 128Gb ",
  price: 220000,
  category: "phones",
  image: "images/phones/iphone5.jpg"
},
{
  id: 65,
  name: "IPhone 14 128Gb ",
  price: 220000,
  category: "phones",
  image: "images/phones/iphones5.jpg"
},
{
  id: 66,
  name: "IPhone 14Pro 128Gb",
  price: 270000,
  category: "phones",
  image: "images/phones/iphone4.jpg"
},
{
  id: 67,
  name: "IPhone 14Pro 256Gb",
  price: 290000,
  category: "phones",
  image: "images/phones/iphones4.jpg"
},
{
  id: 68,
  name: "IPhone 14ProMax 128Gb",
  price: 300000,
  category: "phones",
  image: "images/phones/iphone3.jpg"
},
{
  id: 69,
  name: "IPhone 15ProMax 128Gb",
  price: 450000,
  category: "phones",
  image: "images/phones/iphone13.jpg"
},
{
  id: 70,
  name: "Iphone 16 128Gb",
  price: 390000,
  category: "phones",
  image: "images/phones/iphone2.jpg"
},

{
  id: 71,
  name: " Pixel 6 128Gb",
  price: 100000,
  category: "phones",
  image: "images/phones/pixel2.jpeg"
},
{
  id: 72,
  name: "Pixel 7 128Gb",
  price: 120000,
  category: "phones",
  image: "images/phones/pixel1.jpg"
},
{
  id: 73,
  name: " Motorola G 04 128Gb",
  price: 60000,
  category: "phones",
  image: "images/phones/moto1.jpg"
},
{
  id: 74,
  name: "Motorola G-5G 2025 64Gb",
  price: 60000,
  category: "phones",
  image: "images/phones/moto2.jpg"
},
{
  id: 75,
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