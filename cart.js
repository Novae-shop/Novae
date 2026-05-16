// =====================================================
// 🛒 NOVAË GLOBAL CART SYSTEM
// =====================================================

// =====================================================
// 📦 PANIER LOCAL STORAGE
// =====================================================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

// =====================================================
// 🛒 ELEMENTS UI
// =====================================================

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

const cartCount =
document.getElementById("cart-count");

const checkoutBtn =
document.getElementById("checkout-btn");

// =====================================================
// 💾 SAUVEGARDE
// =====================================================

function saveCart(){

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();
}

// =====================================================
// 🔢 NOMBRE PRODUITS
// =====================================================

function updateCartCount(){

  if(!cartCount) return;

  const totalQty =
  cart.reduce(
    (total,item) =>
    total + (item.quantity || 1),
    0
  );

  cartCount.textContent = totalQty;
}

// =====================================================
// ➕ AJOUTER AU PANIER
// =====================================================

function addToCart(product){

  const existingProduct =
  cart.find(
    item => item.id === product.id
  );

  if(existingProduct){

    existingProduct.quantity += 1;

  }else{

    cart.push({

      ...product,

      quantity:1
    });
  }

  saveCart();

  renderCart();
}

// =====================================================
// ➖ DIMINUER QUANTITÉ
// =====================================================

function decreaseQty(index){

  if(cart[index].quantity > 1){

    cart[index].quantity--;

  }else{

    cart.splice(index,1);
  }

  saveCart();

  renderCart();
}

// =====================================================
// ➕ AUGMENTER QUANTITÉ
// =====================================================

function increaseQty(index){

  cart[index].quantity++;

  saveCart();

  renderCart();
}

// =====================================================
// ❌ SUPPRIMER PRODUIT
// =====================================================

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  renderCart();
}

// =====================================================
// 💰 TOTAL
// =====================================================

function getTotal(){

  return cart.reduce(
    (total,item) =>
    total + ((item.price || 0) * (item.quantity || 1)),
    0
  );
}

// =====================================================
// 🛍️ AFFICHER PANIER
// =====================================================

function renderCart(){

  if(
    !cartItemsContainer ||
    !cartTotal
  ) return;

  cartItemsContainer.innerHTML = "";

  if(cart.length === 0){

    cartItemsContainer.innerHTML = `

      <div class="empty-cart">

        <h3>🛒 Panier vide</h3>

        <p>
          Ajoutez des produits
        </p>

      </div>
    `;

    cartTotal.textContent =
    "Total : 0 FCFA";

    return;
  }

  cart.forEach((item,index) => {

    cartItemsContainer.innerHTML += `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >

        <div class="cart-info">

          <strong>
            ${item.name}
          </strong>

          <p>
            ${item.price.toLocaleString()} FCFA
          </p>

          <div class="qty-controls">

            <button
              onclick="decreaseQty(${index})"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="increaseQty(${index})"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${index})"
        >
          ✖
        </button>

      </div>
    `;
  });

  cartTotal.textContent =

    "Total : " +

    getTotal().toLocaleString()

    + " FCFA";
}

// =====================================================
// 🛒 OUVRIR PANIER
// =====================================================

if(cartBtn){

  cartBtn.addEventListener("click", () => {

    if(cartSidebar){

      cartSidebar.classList.add("active");
    }

    if(overlay){

      overlay.classList.add("active");
    }

    renderCart();
  });
}

// =====================================================
// ❌ FERMER PANIER
// =====================================================

function closeCartUI(){

  if(cartSidebar){

    cartSidebar.classList.remove("active");
  }

  if(overlay){

    overlay.classList.remove("active");
  }
}

if(closeCart){

  closeCart.addEventListener(
    "click",
    closeCartUI
  );
}

if(overlay){

  overlay.addEventListener(
    "click",
    closeCartUI
  );
}

// =====================================================
// 💳 CHECKOUT
// =====================================================

if(checkoutBtn){

  checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

      alert("Votre panier est vide");

      return;
    }

    window.location.href =
    "checkout.html";
  });
}

// =====================================================
// 🌍 GLOBAL
// =====================================================

window.addToCart = addToCart;

window.increaseQty = increaseQty;

window.decreaseQty = decreaseQty;

window.removeItem = removeItem;

// =====================================================
// 🚀 INITIALISATION
// =====================================================

updateCartCount();

renderCart();