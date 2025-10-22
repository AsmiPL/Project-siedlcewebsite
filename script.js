// === USTAWIENIE DATY KOŃCOWEJ ===
const countdownDate = new Date("October 25, 2025 00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

// === FUNKCJA AKTUALIZUJĄCA ODLICZANIE ===
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    countdownElement.innerHTML = "🎉 Wydarzenie rozpoczęte!";
    countdownElement.classList.add("ended");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
    <div class="count-box">${days}<span>D</span></div>
    <div class="count-box">${hours}<span>G</span></div>
    <div class="count-box">${minutes}<span>M</span></div>
    <div class="count-box">${seconds}<span>S</span></div>
  `;
}

// === ODPALENIE ODLICZANIA CO SEKUNDĘ ===
setInterval(updateCountdown, 1000);
updateCountdown();