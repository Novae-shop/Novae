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

    saveCart();

    updateCartCount();

    alert("✅ Produit ajouté au panier");
  }

  /* ===================================================== */
  /* 📦 RECUPERATION PRODUIT */
  /* ===================================================== */

  const product =
  JSON.parse(localStorage.getItem("selectedProduct"));

  /* ===================================================== */
  /* ❌ SECURITE */
  /* ===================================================== */

  if (!product) {

    document.body.innerHTML = `

      <div
        style="
          padding:100px;
          text-align:center;
          font-family:Arial;
        "
      >

        <h1>❌ Produit introuvable</h1>

        <br>

        <a
          href="boutique.html"
          style="
            color:#f15a24;
            font-size:20px;
          "
        >
          Retour boutique
        </a>

      </div>
    `;

    return;
  }

  /* ===================================================== */
  /* 🔍 ELEMENTS */
  /* ===================================================== */

  const productName =
  document.getElementById("product-name");

  const productCategory =
  document.getElementById("product-category");

  const productPrice =
  document.getElementById("product-price");

  const mainImage =
  document.getElementById("main-image");

  const addToCartBtn =
  document.getElementById("add-to-cart-btn");

  const productDesc =
  document.getElementById("product-desc");

  /* ===================================================== */
  /* 🖼️ AFFICHAGE PRODUIT */
  /* ===================================================== */

  if (productName) {

    productName.textContent =
    product.name;
  }

  if (productCategory) {

    productCategory.textContent =
    product.category;
  }

  if (productPrice) {

    productPrice.textContent =
    product.price.toLocaleString() +
    " FCFA";
  }

if (mainImage && product.image) {

  mainImage.src = product.image;

  mainImage.alt = product.name;

  mainImage.onerror = function () {

    console.log("❌ Image introuvable :", product.image);

    this.src = "images/fallback.jpg";
  };
}

  /* ===================================================== */
  /* 📝 DESCRIPTION AUTO */
  /* ===================================================== */

  let description =
  "Produit premium Novaë avec finition haut de gamme et livraison rapide 🚀";

  if (product.category === "phones") {

    description =
    "Smartphone premium avec excellente autonomie, performances rapides et design élégant.";
  }

  if (product.category === "shoes") {

    description =
    "Chaussures ultra confortables avec design moderne et qualité premium.";
  }

  if (product.category === "clothes") {

    description =
    "Vêtement tendance conçu avec des matériaux de haute qualité.";
  }

  if (productDesc) {

    productDesc.textContent =
    description;
  }

  /* ===================================================== */
  /* 🛒 AJOUT PANIER */
  /* ===================================================== */

  if (addToCartBtn) {

    addToCartBtn.addEventListener("click", () => {

      addToCart(product);
    });
  }

  /* ===================================================== */
  /* 🔥 IMAGE ZOOM HOVER */
  /* ===================================================== */

  if (mainImage) {

    mainImage.addEventListener("mousemove", () => {

      mainImage.style.transform =
      "scale(1.05)";
    });

    mainImage.addEventListener("mouseleave", () => {

      mainImage.style.transform =
      "scale(1)";
    });
  }

  /* ===================================================== */
  /* 🚀 INIT */
  /* ===================================================== */

  updateCartCount();

  

});