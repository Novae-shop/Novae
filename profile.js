const API = "https://TON-BACKEND.onrender.com/api";

// 🔐 récupérer token
const token = localStorage.getItem("token");

// 🚫 si pas connecté
if (!token) {
  alert("Tu dois te connecter !");
  window.location.href = "auth.html";
}

// 📡 récupérer infos user
fetch(`${API}/auth/me`, {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => res.json())
  .then(data => {
    document.getElementById("user-name").textContent = data.name;
    document.getElementById("user-email").textContent = data.email;
  })
  .catch(() => {
    alert("Erreur utilisateur");
  });

// 🚪 logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

container.innerHTML += `
  <div class="order-card">
    <p><strong>Date :</strong> ${new Date(order.date).toLocaleDateString()}</p>
    <ul>${productsHTML}</ul>
    <p><strong>Total :</strong> ${order.total} FCFA</p>

    <button onclick="generatePDF(${JSON.stringify(order).replace(/"/g, '&quot;')})">
      📄 Télécharger facture
    </button>
  </div>
`;
async function generatePDF(order) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logo = await loadImageAsBase64("images/Novea-logo.png");

  let y = 20;

  // 🖼️ LOGO IMAGE
  doc.addImage(logo, "PNG", 10, 10, 40, 20);

  // 🧾 NUMERO FACTURE
  const invoiceNumber = "INV-" + Date.now();

  // 📄 TITRE
  doc.setFontSize(18);
  doc.text("FACTURE", 150, 20);

  y = 40;

  // INFOS
  doc.setFontSize(11);
  doc.text("Numéro : " + invoiceNumber, 10, y);
  doc.text("Date : " + new Date(order.date).toLocaleDateString(), 140, y);

  y += 10;

  // CLIENT
  doc.text("Client : " + (order.client?.nom || "Utilisateur"), 10, y);
  y += 6;
  doc.text("Adresse : " + (order.client?.adresse || "-"), 10, y);

  y += 10;

  // TABLE HEADER
  doc.setFillColor(0, 0, 0);
  doc.setTextColor(255, 255, 255);
  doc.rect(10, y, 190, 8, "F");

  doc.text("Produit", 12, y + 5);
  doc.text("Qté", 120, y + 5);
  doc.text("Prix", 150, y + 5);

  y += 10;
  doc.setTextColor(0, 0, 0);

  // PRODUITS
  order.products.forEach(p => {
    doc.text(p.name, 12, y);
    doc.text(String(p.quantity), 120, y);
    doc.text((p.price || 0) + " FCFA", 150, y);
    y += 8;
  });

  y += 10;

  // TOTAL
  doc.setFontSize(14);
  doc.text("Total : " + order.total + " FCFA", 140, y);

  y += 20;

  doc.setFontSize(10);
  doc.text("Merci pour votre achat ❤️", 60, y);

  doc.save(`facture-${invoiceNumber}.pdf`);
}
function loadImageAsBase64(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);

      resolve(canvas.toDataURL("Novea-logo/png"));
    };

    img.src = url;
  });
}