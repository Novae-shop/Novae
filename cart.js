// 🔄 Charger panier
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🧹 Nettoyage (IMPORTANT)
cart = cart.map(item => ({
  ...item,
  price: Number(item.price) || 0,
  quantity: Number(item.quantity) || 1
}));

// 💾 Sauvegarder
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🛒 Ajouter produit
function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      price: Number(product.price) || 0,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
}

// ❌ Supprimer
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

// 💰 TOTAL (anti NaN)
function getTotal() {
  return cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);
}

// 🔢 Compteur sécurisé
function updateCartCount() {
  const count = document.getElementById("cart-count");

  if (!count) return;

  const totalQty = cart.reduce((sum, p) => {
    return sum + (Number(p.quantity) || 1);
  }, 0);

  count.textContent = totalQty;
}

// 🚀 INIT
updateCartCount();