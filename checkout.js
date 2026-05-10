document.addEventListener("DOMContentLoaded", () => {

  // 🛒 PANIER
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const errorBox = document.getElementById("error-box");

  // 🚨 sécurité
  if (!container || !totalEl) {
    console.error("Éléments checkout introuvables");
    return;
  }

  // 🧾 AFFICHAGE PRODUITS
  function displayCheckout() {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = "<p>Panier vide</p>";
      totalEl.textContent = "Total: 0 FCFA";
      return;
    }

    let total = 0;

    cart.forEach(item => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      total += price * quantity;

      container.innerHTML += `
        <div class="checkout-item">
          <img src="${item.image}" alt="">
          <div>
            <strong>${item.name}</strong><br>
            ${price} x ${quantity}
          </div>
        </div>
      `;
    });

    totalEl.textContent = "Total: " + total + " FCFA";
  }

  displayCheckout();

  // ❌ ERREUR UI
  function showError(msg) {
    if (!errorBox) return;
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }

  function clearError() {
    if (!errorBox) return;
    errorBox.style.display = "none";
  }

  // ✅ VALIDATION
  function validateForm() {
    const inputs = document.querySelectorAll("#order-form input");

    if (inputs.length < 4) {
      console.error("Formulaire incomplet");
      return false;
    }

    const nom = inputs[0].value.trim();
    const ville = inputs[1].value.trim();
    const adresse = inputs[2].value.trim();
    const telephone = inputs[3].value.trim();

    clearError();

    if (!nom || !ville || !adresse || !telephone) {
      showError("❗ Veuillez remplir tous les champs");
      return false;
    }

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(telephone)) {
      showError("❗ Numéro invalide (8 à 15 chiffres)");
      return false;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nom)) {
      showError("❗ Nom invalide (lettres uniquement)");
      return false;
    }

    return true;
  }

  // 🧠 MESSAGE
  function generateMessage() {
    const inputs = document.querySelectorAll("#order-form input");

    const nom = inputs[0].value;
    const ville = inputs[1].value;
    const adresse = inputs[2].value;
    const telephone = inputs[3].value;

    let message = "🛒 Nouvelle commande Novaë\n\n";
    message += `Nom: ${nom}\nVille: ${ville}\nAdresse: ${adresse}\nTéléphone: ${telephone}\n\n`;

    let total = 0;

    cart.forEach(item => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      const prixTotal = price * quantity;

      total += prixTotal;

      message += `- ${item.name} x${quantity} = ${prixTotal} FCFA\n`;
    });

    message += `\nTotal: ${total} FCFA`;

    return message;
  }

  // 📱 WHATSAPP
  window.sendWhatsApp = async function () {
    if (!validateForm()) return;

    await saveOrderToBackend();

    const message = generateMessage();
    const phone = "22871460429";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // 📧 EMAIL
  window.sendEmail = async function () {
    if (!validateForm()) return;

    await saveOrderToBackend();

    const message = generateMessage();
    const email = "bricemedannou55@gmail.com";
    const subject = "Nouvelle commande Novaë";

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  // 💾 BACKEND
  async function saveOrderToBackend() {
    try {
      const inputs = document.querySelectorAll("#order-form input");

      const order = {
        client: {
          nom: inputs[0].value,
          ville: inputs[1].value,
          adresse: inputs[2].value,
          telephone: inputs[3].value
        },
        products: cart,
        total: cart.reduce((sum, item) => {
          return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
        }, 0),
        date: new Date()
      };

      await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });

    } catch (err) {
      console.error("Erreur backend :", err);
    }
  }

});