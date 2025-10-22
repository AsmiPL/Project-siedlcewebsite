// --- Odliczanie do 25 października ---
const countdown = document.getElementById("countdown");
const targetDate = new Date("October 25, 2025 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.textContent = `${days}D ${hours}G ${minutes}M ${seconds}S`;
}, 1000);

// --- Panel admina ---
const logo = document.getElementById("logo");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const adminArea = document.getElementById("adminArea");
const adminPass = document.getElementById("adminPass");

let clickCount = 0;

logo.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 5) {
    adminPanel.classList.remove("hidden");
    clickCount = 0;
  }
});

loginBtn.addEventListener("click", () => {
  if (adminPass.value === "asmi123") {
    adminArea.classList.remove("hidden");
  } else {
    alert("Nieprawidłowe hasło!");
  }
});