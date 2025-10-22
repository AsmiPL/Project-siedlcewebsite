// ----------------------------
const bg = document.getElementById('bg');
const photos = ['Fota1.png','Fota2.png','Fota3.png','Fota4.png'];
let index = 0;

setInterval(() => {
  index = (index + 1) % photos.length;
  const newImg = photos[index];
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url('${newImg}')`;
    bg.style.opacity = 1;
  }, 1000);
}, 10000);

// ----------------------------
function updateCountdown() {
  const launch = new Date("Oct 25, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const diff = launch - now;
  const c = document.getElementById("countdown");
  if(!c) return;
  if(diff <= 0){ c.innerText = "Premiera już dostępna!"; return; }
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m = Math.floor((diff%(1000*60*60))/(1000*60));
  const s = Math.floor((diff%(1000*60))/1000);
  c.innerText = `${d}D ${h}G ${m}M ${s}S`;
}
updateCountdown();
setInterval(updateCountdown,1000);

// ----------------------------
const items = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', ()=>{
  const trigger = window.innerHeight * 0.85;
  items.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger) el.classList.add('visible');
  });
});

// ----------------------------
window.addEventListener('click', ()=>{
  const audio = document.getElementById('bgMusic');
  if(audio) {
    audio.volume = 0.3;
    audio.play().catch(()=>{});
  }
},{once:true});

// ----------------------------
let clickCount = 0;
const countdownEl = document.getElementById('countdown');
if(countdownEl){
  countdownEl.addEventListener('click', ()=>{
    clickCount++;
    if(clickCount === 6){
      const overlay = document.getElementById('adminOverlay');
      const adminBox = document.getElementById('adminBox');
      overlay.classList.remove('hidden');
      adminBox.innerHTML = `
        <input type="password" id="adminPass" placeholder="Wpisz hasło...">
        <button id="adminBtn">Zaloguj</button>
      `;
      const btn = document.getElementById('adminBtn');
      btn.addEventListener('click', ()=>{
        const pass = document.getElementById('adminPass').value;
        if(pass === '1234567asmi'){
          alert('Panel admina otwarty!');
        } else {
          alert('Błędne hasło!');
        }
      });
    }
  });
}

// ----------------------------
// Nic nie trzeba robić w JS, iframe jest w HTML:
// <iframe
//   src="https://discord.com/widget?id=105791989395000832&theme=dark"
//   width="100%" height="450" allowtransparency="true" frameborder="0"
//   sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
// </iframe>