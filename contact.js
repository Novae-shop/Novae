// =====================================================
// 📧 INITIALISATION EMAILJS
// =====================================================

emailjs.init("2Bfzz4IESOhUclN42");


// =====================================================
// 📩 FORMULAIRE CONTACT
// =====================================================

const form =
document.getElementById("contact-form");

const successBox =
document.getElementById("contact-success");

form.addEventListener("submit", function(e){

  e.preventDefault();

  // DONNÉES

  const params = {

    name:
    document.getElementById("name").value,

    email:
    document.getElementById("email").value,

    message:
    document.getElementById("message").value
  };

  // ENVOI

  emailjs.send(
    "service_7eh8c5o",
    "template_f1vx8t9",
    params
  )

  .then(() => {

    successBox.style.display =
    "block";

    successBox.innerHTML =
    "✅ Message envoyé avec succès";

    successBox.style.color =
    "limegreen";

    form.reset();

  })

  .catch((error) => {

    console.log(error);

    successBox.style.display =
    "block";

    successBox.innerHTML =
    "❌ Erreur lors de l'envoi";

    successBox.style.color =
    "red";
  });

});


// =====================================================
// 💬 WHATSAPP
// =====================================================

const whatsappBtn =
document.getElementById("whatsapp-btn");

if(whatsappBtn){

  whatsappBtn.addEventListener("click", () => {

    window.open(
      "https://wa.me/22871460429",
      "_blank"
    );

  });

}