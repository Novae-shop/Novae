// =====================================================
// 🌙 NOVAË DARK MODE GLOBAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  const themeToggle =
  document.getElementById("theme-toggle");

  // =========================================
  // CHARGER LE THÈME SAUVEGARDÉ
  // =========================================

  const savedTheme =
  localStorage.getItem("theme");

  if(savedTheme === "dark"){

    document.body.classList.add("dark");

    if(themeToggle){

      themeToggle.innerHTML = "☀️";
    }

  }else{

    document.body.classList.remove("dark");

    if(themeToggle){

      themeToggle.innerHTML = "🌙";
    }
  }

  // =========================================
  // SWITCH THEME
  // =========================================

  if(themeToggle){

    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      const isDark =
      document.body.classList.contains("dark");

      localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
      );

      themeToggle.innerHTML =
      isDark ? "☀️" : "🌙";

    });

  }

});