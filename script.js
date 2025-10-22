// Tło zmieniające się płynnie
const bg = document.getElementById('bg');
const photos = ['Fota1.png','Fota2.png','Fota3.png','Fota4.png'];
let index = 0;
setInterval(()=>{
  index = (index+1)%photos.length;
  const newImg = photos[index];
  bg.style.opacity = 0;
  setTimeout(()=>{bg.style.backgroundImage=`url('${newImg}')`;bg.style.opacity=1;},1000);
},10000);

// Odliczanie do 25 października
function updateCountdown(){
  const launch=new Date("Oct 25, 2025 00:00:00").getTime();
  const now=new Date().getTime();
  const diff=launch-now;
  const c=document.getElementById("countdown");
  if(diff<=0){c.innerText="Premiera już dostępna!";return;}
  const d=Math.floor(diff/(1000*60*60*24));
  const h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m=Math.floor((diff%(1000*60*60))/(1000*60));
  const s=Math.floor((diff%(1000*60))/1000);
  if(c)c.innerText=`${d}D ${h}G ${m}M ${s}S`;
}
updateCountdown();
setInterval(updateCountdown,1000);

// Fade przy scroll
const items=document.querySelectorAll('.fade-in');
window.addEventListener('scroll',()=>{
  const trigger=window.innerHeight*0.85;
  items.forEach(el=>{if(el.getBoundingClientRect().top<trigger)el.classList.add('visible');});
});

// Muzyka w tle po kliknięciu
window.addEventListener('click',()=>{
  const audio=document.getElementById('bgMusic');
  audio.volume=0.3;
  audio.play().catch(()=>{});
},{once:true});

// Panel admina po 6 kliknięciach w licznik
let clickCount=0;
const countdownEl=document.getElementById('countdown');
const adminOverlay=document.getElementById('adminOverlay');
const adminBox=document.getElementById('adminBox');

if(countdownEl){
  countdownEl.addEventListener('click',()=>{
    clickCount++;
    if(clickCount>=6){
      adminOverlay.classList.remove('hidden');
      adminBox.innerHTML=`
        <h2 style="color:#00ffff;">Panel Admina</h2>
        <input type="password" id="adminPass" placeholder="Wpisz hasło..." style="padding:10px;border-radius:10px;border:1px solid #00ffff;background:#222;color:#fff;margin-bottom:10px;">
        <button id="adminBtn">Zaloguj</button>
      `;
      const adminBtn=document.getElementById('adminBtn');
      const adminPass=document.getElementById('adminPass');
      adminBtn.addEventListener('click',()=>{
        if(adminPass.value==='1234567asmi'){
          adminBox.innerHTML=`
            <h2 style="color:#00ffff;">Panel Admina</h2>
            <textarea id="ogloszeniaInput" placeholder="Dodaj ogłoszenie..."></textarea>
            <button id="saveOgloszenia">Zapisz ogłoszenie</button>
          `;
          const saveBtn=document.getElementById('saveOgloszenia');
          saveBtn.addEventListener('click',()=>{
            const val=document.getElementById('ogloszeniaInput').value;
            localStorage.setItem('ogloszenia',val);
            alert('Ogłoszenie zapisane!');
            const ogBox=document.querySelector('.ogloszenia-box');
            if(ogBox)ogBox.innerText=val;
          });
        }else alert('Błędne hasło!');
      });
    }
  });
}

// Wczytanie ogłoszeń z localStorage
const ogBox=document.querySelector('.ogloszenia-box');
if(ogBox){
  const stored=localStorage.getItem('ogloszenia');
  if(stored) ogBox.innerText=stored;
}

// Discord widget
const discordWidget=document.getElementById('discordWidget');
if(discordWidget){
  fetch('https://discord.com/api/guilds/1333095837084946463/widget.json')
  .then(res=>res.json())
  .then(data=>{
    let html=`<p style="font-weight:700;">Serwer: ${data.name}</p>`;
    html+=`<p>Dołącz: <a href="${data.instant_invite}" target="_blank">${data.instant_invite}</a></p>`;
    html+=`<p>Online: ${data.members.length}</p><div style="display:flex;gap:5px;flex-wrap:wrap;">`;
    data.members.forEach(m=>{
      html+=`<img src="${m.avatar_url}" title="${m.username}" style="width:40px;height:40px;border-radius:50%;">`;
    });
    html+='</div>';
    discordWidget.innerHTML=html;
  }).catch(()=>{discordWidget.innerText='Nie udało się pobrać danych Discord.';});
}