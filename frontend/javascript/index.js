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
let slideTimer; // para auto-play
showSlides(slideIndex);
startAutoSlide();

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide();
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }    
  if (n < 1) { slideIndex = slides.length }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";

  // 🔹 CAMBIO PARA EL FONDO BLUR
  const activeImg = slides[slideIndex-1].querySelector("img").src;
  document.querySelector(".slideshow-section").style.setProperty('--bg-img', `url(${activeImg})`);
  document.querySelector(".slideshow-section::before"); // opcional, depende de cómo uses CSS
}

// Auto-play
function startAutoSlide() {
  slideTimer = setInterval(() => { plusSlides(1); }, 4000);
}
function stopAutoSlide() { clearInterval(slideTimer); }
function resetAutoSlide() { stopAutoSlide(); startAutoSlide(); }

// Pausar al hacer hover
const carousel = document.querySelector(".slideshow-container");
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);
