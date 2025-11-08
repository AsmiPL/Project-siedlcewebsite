document.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date("Dec 5, 2025 15:00:00").getTime();

  // === COUNTDOWN ===
  setInterval(() => {
    const now = Date.now();
    const d = Math.max(0, targetDate - now);
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((d % (1000 * 60)) / 1000);
    countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  // === DISCORD JSON API ===
  fetch("https://discord.com/api/guilds/1333095837084946463/widget.json")
    .then(res => res.json())
    .then(data => {
      const discordWidget = document.getElementById("discordWidget");
      discordWidget.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Online: ${data.presence_count}</p>
        <ul style="margin-top:10px;list-style:none;padding:0;">
          ${data.members.slice(0,5).map(m => `<li>• ${m.username}</li>`).join('')}
        </ul>
        <p style="opacity:0.8;">(Pokazano 5 z ${data.members.length} członków online)</p>
      `;
    })
    .catch(() => {
      document.getElementById("discordWidget").innerText = "Nie udało się załadować danych z Discorda.";
    });
});

