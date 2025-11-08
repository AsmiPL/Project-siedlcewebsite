// script.js
document.addEventListener("DOMContentLoaded", () => {
  // === COUNTDOWN ===
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date("Dec 1, 2025 15:00:00").getTime();

  setInterval(() => {
    const now = Date.now();
    const d = Math.max(0, targetDate - now);
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((d % (1000 * 60)) / 1000);
    countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  // === SECRET ADMIN OPEN ===
  let clickCount = 0;
  countdownEl.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 5) {
      clickCount = 0;
      showLoginModal();
    }
  });

  function showLoginModal() {
    const overlay = document.getElementById("adminOverlay");
    overlay.innerHTML = `
      <div class="admin-modal" style="background:rgba(0,0,0,0.86);position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:99999;">
        <div style="max-width:360px;width:94%;background:#111;padding:20px;border-radius:12px;">
          <h3 style="color:#fff;text-align:center;margin-bottom:10px;">Admin Login</h3>
          <input id="loginUser" placeholder="Username" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;background:#222;color:#fff;border:1px solid #333;">
          <input id="loginPass" placeholder="Password" type="password" style="width:100%;padding:10px;border-radius:8px;margin-bottom:12px;background:#222;color:#fff;border:1px solid #333;">
          <div style="display:flex;gap:10px;justify-content:center;">
            <button id="loginCancel" style="padding:8px 14px;border-radius:8px;background:#555;color:#fff;border:none;cursor:pointer;">Anuluj</button>
            <button id="loginSend" style="padding:8px 14px;border-radius:8px;background:#00ffff;color:#000;border:none;font-weight:700;cursor:pointer;">Zaloguj</button>
          </div>
        </div>
      </div>
    `;
    overlay.classList.remove("hidden");

    document.getElementById("loginCancel").addEventListener("click", () => {
      overlay.classList.add("hidden");
      overlay.innerHTML = "";
    });

    document.getElementById("loginSend").addEventListener("click", async () => {
      const username = document.getElementById("loginUser").value.trim();
      const password = document.getElementById("loginPass").value;
      if (!username || !password) { alert("Wypełnij pola"); return; }

      try {
        const res = await fetch("/api/login", {
          method:

