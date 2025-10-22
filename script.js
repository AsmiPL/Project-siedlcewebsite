// ===========================
// Project Gmina Siedlce — script.js
// ===========================

// ---------------- Countdown ----------------
const countdownElement = document.getElementById("countdown");
const targetDate = new Date("2025-10-25T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdownElement.innerHTML = "<span class='ready'>Premiera już dostępna!</span>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
    <div class="count-box"><span>${days}</span><p>Dni</p></div>
    <div class="count-box"><span>${hours}</span><p>Godzin</p></div>
    <div class="count-box"><span>${minutes}</span><p>Minut</p></div>
    <div class="count-box"><span>${seconds}</span><p>Sekund</p></div>
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---------------- Background Fade ----------------
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

const backgrounds = ["Fota1.png", "Fota2.png", "Fota3.png", "Fota4.png"];
let currentIndex = 0;

function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  const nextImage = `url(${backgrounds[currentIndex]})`;

  bg2.style.backgroundImage = nextImage;
  bg2.style.opacity = 1;

  setTimeout(() => {
    bg1.style.backgroundImage = nextImage;
    bg2.style.opacity = 0;
  }, 2000);
}

setInterval(changeBackground, 8000);