// 🔐 GESTION AUTH GLOBAL
const authBtn = document.getElementById("auth-btn");

if (authBtn) {
  const token = localStorage.getItem("token");

  if (token) {
    authBtn.textContent = "Déconnexion";

    authBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      location.reload();
    });
  } else {
    authBtn.textContent = "Connexion";

    authBtn.addEventListener("click", () => {
      window.location.href = "auth.html";
    });
  }
}

// 🛒 COMPTEUR PANIER GLOBAL
const cartCount = document.getElementById("cart-count");

if (cartCount) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, p) => sum + (p.quantity || 1), 0);
  cartCount.textContent = total;
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
