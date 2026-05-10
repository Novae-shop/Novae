// 📩 FORMULAIRE
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("contact-success");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  successMsg.textContent = "✅ Message envoyé avec succès !";

  form.reset();
});

// 💬 WHATSAPP
document.getElementById("whatsapp-btn").addEventListener("click", () => {

  const message = "Bonjour Novaë, j'ai une question concernant vos produits.";

  const url = `https://wa.me/22871460429?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});