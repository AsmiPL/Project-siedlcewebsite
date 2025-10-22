// ===========================
// Project Gmina Siedlce — script.js
// ===========================

// ----- TŁO -----
const bg = document.getElementById('bg');
const photos = ['Fota1.png','Fota2.png','Fota3.png','Fota4.png'];
let index = 0;
bg.style.backgroundImage = `url('${photos[index]}')`;

setInterval(() => {
  index = (index + 1) % photos.length;
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url('${photos[index]}')`;
    bg.style.opacity = 1;
  }, 1000);
}, 7000);

// ----- ODLICZANIE -----
function updateCountdown(){
  const target = new Date("2025-10-25T00:00:00").getTime();
  const now = new Date().getTime();
  const diff = target - now;
  const container = document.getElementById("countdown");

  if(diff <= 0){
    container.innerHTML = "<span class='ready'>Premiera już dostępna!</span>";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  container.innerHTML = `
    <div class="time-box"><span>${days}</span><p>Dni</p></div>
    <div class="time-box"><span>${hours}</span><p>Godzin</p></div>
    <div class="time-box"><span>${minutes}</span><p>Minut</p></div>
    <div class="time-box"><span>${seconds}</span><p>Sekund</p></div>
  `;
}

setInterval(updateCountdown,1000);
updateCountdown();

// ----- ANIMACJA SCROLLU -----
const items = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', ()=>{
  const trigger = window.innerHeight * 0.85;
  items.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger) el.classList.add('visible');
  });
});