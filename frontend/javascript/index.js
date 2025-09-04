const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
	navigation.classList.toggle('is-open');
	hamburger.classList.toggle('is-open');
})

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSuscripcion");
  const emailInput = document.getElementById("emailSuscripcion");
  const mensaje = document.getElementById("mensajeSuscripcion");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (emailInput.checkValidity()) {
      // Aquí iría la lógica para enviar el correo al servidor o API
      mensaje.textContent = "¡Gracias por suscribirte!";
      mensaje.style.color = "#4CAF50";
      emailInput.value = "";
    } else {
      mensaje.textContent = "Por favor ingresa un correo válido.";
      mensaje.style.color = "#ff4b4b";
    }
  });
});
