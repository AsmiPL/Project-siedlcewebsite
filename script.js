// Płynne zmiany tła
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

// Countdown
function updateCountdown(){
  const launch = new Date("Oct 25, 2025 18:00:00").getTime();
  const now = new Date().getTime();
  const diff = launch - now;
  const c = document.getElementById("countdown");
  if(diff <= 0){ c.innerText = "Premiera już dostępna!"; return; }
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((diff%(1000*60*60))/(1000*60));
  const s = Math.floor((diff%(1000*60))/1000);
  c.innerText = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown,1000);

// Scroll animation
const items = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', ()=>{
  const trigger = window.innerHeight * 0.85;
  items.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger) el.classList.add('visible');
  });
});