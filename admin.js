// 🔐 FETCH AVEC AUTO REFRESH TOKEN
async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  options.headers = {
    ...options.headers,
    "Authorization": accessToken
  };

  let res = await fetch(url, options);

  if (res.status === 401) {

    const refreshToken = localStorage.getItem("refreshToken");

    const refreshRes = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: refreshToken })
    });

    if (!refreshRes.ok) {
      alert("Session expirée 🔐");
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    const data = await refreshRes.json();

    localStorage.setItem("accessToken", data.accessToken);

    options.headers["Authorization"] = data.accessToken;

    return fetch(url, options);
  }

  return res;
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

// 📦 DATA
let orders = [];
let filteredOrders = [];

async function loadOrders() {
  const token = localStorage.getItem("token");

  const res = await fetchWithAuth("http://localhost:3000/api/orders", {
    headers: {
      "Authorization": token
    }
  });

  // 🔥 SI TOKEN EXPIRÉ
  if (res.status === 401 || res.status === 400) {
    alert("Session expirée 🔐 reconnecte-toi");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  const data = await res.json();

  orders = data;
  filteredOrders = data;

  refreshUI();
}


// 🗑️ SUPPRIMER COMMANDE
async function deleteOrder(id) {
  const token = localStorage.getItem("token");

  const res = await fetchWithAuth(`http://localhost:3000/api/orders/${id}`, {
  method: "DELETE",
    headers: {
      "Authorization": token
    }
  });

  if (res.status === 401 || res.status === 400) {
    alert("Session expirée 🔐");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  loadOrders();
}


// 🧾 AFFICHAGE COMMANDES
function renderOrders(data = orders) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>Aucune commande</p>";
    return;
  }

  data.slice().reverse().forEach((order) => {
    let productsHTML = "";

    order.products.forEach(p => {
      productsHTML += `<li>${p.name} x${p.quantity}</li>`;
    });

    container.innerHTML += `
      <div class="order-card">

        <div class="order-header">
          <h3>${order.client.nom}</h3>
          <span class="order-date">${order.date}</span>
        </div>

        <p><strong>📍 Ville:</strong> ${order.client.ville}</p>
        <p><strong>🏠 Adresse:</strong> ${order.client.adresse}</p>
        <p><strong>📞 Téléphone:</strong> ${order.client.telephone}</p>

        <ul>${productsHTML}</ul>

        <div class="order-footer">
          💰 ${order.total} FCFA
        </div>

        <button class="delete-btn" onclick="deleteOrder('${order._id}')">
          ❌ Supprimer
        </button>

      </div>
    `;
  });
}


// 📊 STATS
function updateStats(data = orders) {
  let totalSales = 0;
  let totalOrders = data.length;
  let totalProducts = 0;

  data.forEach(order => {
    totalSales += order.total;

    order.products.forEach(p => {
      totalProducts += p.quantity;
    });
  });

  document.getElementById("total-sales").textContent = totalSales + " FCFA";
  document.getElementById("total-orders").textContent = totalOrders;
  document.getElementById("total-products").textContent = totalProducts;
}


// 📊 GRAPHIQUE (FIX IMPORTANT 🔥)
let chartInstance = null;

function renderChart(data = orders) {
  const salesByDate = {};

  data.forEach(order => {
    const date = new Date(order.date).toLocaleDateString();

    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }

    salesByDate[date] += order.total;
  });

  const labels = Object.keys(salesByDate);
  const values = Object.values(salesByDate);

  const ctx = document.getElementById("salesChart").getContext("2d");

  // 🔥 TRÈS IMPORTANT : détruire ancien graphique
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Ventes (FCFA)",
        data: values
      }]
    }
  });
}


// 🔥 TOP PRODUITS
function renderTopProducts(data = orders) {
  const stats = {};

  data.forEach(order => {
    order.products.forEach(p => {
      if (!stats[p.name]) stats[p.name] = 0;
      stats[p.name] += p.quantity;
    });
  });

  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);

  const container = document.getElementById("top-products");
  container.innerHTML = "";

  if (sorted.length === 0) {
    container.innerHTML = "<p>Aucune donnée</p>";
    return;
  }

  sorted.forEach(([name, qty], index) => {
    container.innerHTML += `
      <div class="top-card">
        <span>#${index + 1}</span>
        <span>${name}</span>
        <span>${qty} vendus</span>
      </div>
    `;
  });
}


// 📅 FILTRE PAR DATE
function filterByDate() {
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;

  if (!start || !end) {
    alert("Choisissez les deux dates ❗");
    return;
  }

  filteredOrders = orders.filter(order => {
    const d = new Date(order.date);
    return d >= new Date(start) && d <= new Date(end);
  });

  refreshUI();
}


// 🔄 RESET FILTRE
function resetFilter() {
  filteredOrders = [...orders];
  refreshUI();
}


// 🔄 REFRESH GLOBAL (TRÈS IMPORTANT 🔥)
function refreshUI() {
  renderOrders(filteredOrders);
  updateStats(filteredOrders);
  renderChart(filteredOrders);
  renderTopProducts(filteredOrders);
}


// 🚀 INIT
loadOrders();