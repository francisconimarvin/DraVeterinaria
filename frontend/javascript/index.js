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

// CARRUSEL
let slideIndex = 1;
let slideTimer; // para guardar el intervalo automático
showSlides(slideIndex);
startAutoSlide(); // iniciar auto-play

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide(); // reinicia el temporizador al cambiar manualmente
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }    
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// --- Funciones para auto play ---
function startAutoSlide() {
  slideTimer = setInterval(() => {
    plusSlides(1);
  }, 4000); // cada 4 segundos
}

function stopAutoSlide() {
  clearInterval(slideTimer);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// --- Pausar al hacer hover ---
const carousel = document.querySelector(".slideshow-container");
carousel.addEventListener("mouseenter", stopAutoSlide); // pausa con hover
carousel.addEventListener("mouseleave", startAutoSlide); // reanuda al salir
