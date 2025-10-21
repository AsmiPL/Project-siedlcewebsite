// BACKGROUND ANIMATION
const bg1=document.getElementById('bg1');
const bg2=document.getElementById('bg2');
const images=['Fota1.png','Fota2.png','Fota3.png','Fota4.png'];
let i=0,showingFirst=true;
bg1.style.backgroundImage=`url('${images[0]}')`;
setInterval(()=>{
  i=(i+1)%images.length;
  if(showingFirst){
    bg2.style.backgroundImage=`url('${images[i]}')`;
    bg2.style.opacity=1;
    setTimeout(()=>{bg1.style.opacity=0;},500);
  }else{
    bg1.style.backgroundImage=`url('${images[i]}')`;
    bg1.style.opacity=1;
    setTimeout(()=>{bg2.style.opacity=0;},500);
  }
  showingFirst=!showingFirst;
},6000);

// COUNTDOWN
function countdown(){
  const endDate=new Date('Nov 10,2025 00:00:00').getTime();
  const now=new Date().getTime();
  const diff=endDate-now;
  if(diff<0){document.getElementById("countdown").innerHTML="Premiera już dostępna!";return;}
  const days=Math.floor(diff/(1000*60*60*24));
  const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes=Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds=Math.floor((diff%(1000*60))/1000);
  document.getElementById("countdown").innerHTML=`${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(countdown,1000);

// ADMIN PANEL
let clickCount=0;
document.getElementById('langBtn').addEventListener('click',()=>{
  clickCount++;
  if(clickCount>=6){
    const pass=prompt("Wpisz hasło administratora:");
    if(pass==="1234567"){openPanel();}
    clickCount=0;
  }
});
function openPanel(){document.getElementById('adminPanel').style.display='block';}
function closePanel(){document.getElementById('adminPanel').style.display='none';}

// OGŁOSZENIA I BANY
function addAnnouncement(){
  const text=document.getElementById('newAnn').value.trim();
  if(!text) return;
  let list=JSON.parse(localStorage.getItem('announcements')||"[]");
  list.push({text:text,date:new Date().toLocaleString()});
  localStorage.setItem('announcements',JSON.stringify(list));
  showAnnouncements();
  document.getElementById('newAnn').value='';
}
function showAnnouncements(){
  let list=JSON.parse(localStorage.getItem('announcements')||"[]");
  const box=document.getElementById('annList');
  if(list.length===0){box.innerHTML="Brak ogłoszeń";return;}
  box.innerHTML=list.map(a=>`<div class="discord-embed"><h4>Ogłoszenie: ${a.date}</h4><p>${a.text}</p></div>`).join('');
}
showAnnouncements();

function addBan(){
  const text=document.getElementById('newBan').value.trim();
  if(!text) return;
  let list=JSON.parse(localStorage.getItem('bans')||"[]");
  list.push({text:text,date:new Date().toLocaleString()});
  localStorage.setItem('bans',JSON.stringify(list));
  showBans();
  document.getElementById('newBan').value='';
}
function showBans(){
  let list=JSON.parse(localStorage.getItem('bans')||"[]");
  const box=document.getElementById('banList');
  if(list.length===0){box.innerHTML="Brak banów";return;}
  box.innerHTML=list.map(a=>`<div><b>${a.date}</b><br>${a.text}</div><hr>`).join('');
}
showBans();

// FETCH OGŁOSZEŃ Z BACKENDU
async function loadDiscordAnnouncements(){
  try {
    const res=await fetch('http://localhost:3000/announcements'); // Twój backend
    const data=await res.json();
    if(data.length===0){document.getElementById('annList').innerHTML="Brak ogłoszeń";return;}
    document.getElementById('annList').innerHTML=data.map(a=>`<div class="discord-embed"><h4>Ogłoszenie: ${a.date}</h4><p>${a.text}</p></div>`).join('');
  } catch(e){
    console.error(e);
  }
}
loadDiscordAnnouncements();
setInterval(loadDiscordAnnouncements,60000);