// ----------------------------
// PŁYNNE ZMIANY TŁA
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
// LICZNIK DO PREMIERY
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
// EFEKT FADE-IN PRZY SCROLL
// ----------------------------
const items = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', ()=>{
  const trigger = window.innerHeight * 0.85;
  items.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger) el.classList.add('visible');
  });
});

// ----------------------------
// MUZYKA TŁA PO KLIKNIĘCIU
// ----------------------------
window.addEventListener('click', ()=>{
  const audio = document.getElementById('bgMusic');
  if(audio) {
    audio.volume = 0.3;
    audio.play().catch(()=>{});
  }
},{once:true});

// ----------------------------
// PANEL ADMINA PO 6 KLIKNIĘCIACH COUNTDOWNU
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
// WIDGET DISCORD
// ----------------------------
async function loadDiscordWidget(){
  const widgetBox = document.getElementById('discordWidget');
  if(!widgetBox) return;
  try{
    const response = await fetch('https://discord.com/api/guilds/1333095837084946463/widget.json');
    const data = await response.json();
    widgetBox.innerHTML = '';
    if(data.members && data.members.length > 0){
      data.members.forEach(member => {
        const div = document.createElement('div');
        div.textContent = `${member.username}#${member.discriminator}`;
        widgetBox.appendChild(div);
      });
    } else {
      widgetBox.textContent = 'Brak członków online';
    }
  }catch(e){
    widgetBox.textContent = 'Nie udało się załadować Discorda';
  }
}
loadDiscordWidget();