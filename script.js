// script.js
document.addEventListener("DOMContentLoaded", () => {
  // === COUNTDOWN ===
  const countdownEl = document.getElementById("countdown");
  const targetDate = new Date("Dec 5, 2025 15:00:00").getTime(); // 🔥 Nowa data premiery

  setInterval(() => {
    const now = Date.now();
    const d = Math.max(0, targetDate - now);
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((d % (1000 * 60)) / 1000);
    countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  // === SECRET ADMIN OPEN (5 CLICKS) ===
  let clickCount = 0;
  countdownEl.addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 5) {
      clickCount = 0;
      showLoginModal();
    }
  });

  // === LOGIN MODAL ===
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
          overlay.classList.add("hidden");
          overlay.innerHTML = "";
          showAdminSection();
        } else {
          alert("Błędne dane logowania");
        }
      } catch (err) {
        console.error(err);
        alert("Błąd połączenia z serwerem");
      }
    });
  }

  // === ADMIN SECTION ===
  const adminSection = document.getElementById("adminSection");
  const bansListEl = document.getElementById("bansList");
  const addBanBtn = document.getElementById("addBanBtn");
  const banUserEl = document.getElementById("banUser");
  const banReasonEl = document.getElementById("banReason");
  const banExpiryEl = document.getElementById("banExpiry");

  // przełączanie kart
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tabName = btn.dataset.tab;
      document.querySelectorAll(".tab").forEach(t => t.style.display = (t.id === tabName ? "block" : "none"));
    });
  });

  // pokazanie sekcji admina po zalogowaniu
  async function showAdminSection() {
    adminSection.classList.remove("hidden");
    adminSection.scrollIntoView({ behavior: "smooth" });
    await loadBans();
  }

  // === BAN SYSTEM ===
  async function loadBans() {
    try {
      const res = await fetch("/api/bans");
      if (!res.ok) { bansListEl.innerText = "Błąd ładowania banów"; return; }
      const bans = await res.json();
      renderBans(bans);
    } catch (err) {
      console.error(err);
      bansListEl.innerText = "Błąd połączenia z serwerem";
    }
  }

  function renderBans(bans) {
    if (!bans || bans.length === 0) {
      bansListEl.innerHTML = '<div class="empty-box">Brak banów</div>';
      return;
    }
    bansListEl.innerHTML = "";
    bans.forEach(b => {
      const expiry = b.expiresAt ? new Date(b.expiresAt).toLocaleString() : "Brak";
      const item = document.createElement("div");
      item.className = "ban-item";
      item.innerHTML = `
        <div class="ban-info">
          <strong>${escapeHtml(b.user)}</strong>
          <span>${escapeHtml(b.reason)}</span>
          <small>Wygasa: ${escapeHtml(expiry)}</small>
          <small style="opacity:0.7">ID: ${b.id}</small>
        </div>
        <div class="ban-actions">
          <button data-id="${b.id}">Usuń</button>
        </div>
      `;
      item.querySelector("button").addEventListener("click", () => removeBan(b.id));
      bansListEl.appendChild(item);
    });
  }

  // dodawanie bana
  addBanBtn.addEventListener("click", async () => {
    const user = banUserEl.value.trim();
    const reason = banReasonEl.value.trim();
    const expiry = banExpiryEl.value ? new Date(banExpiryEl.value).toISOString() : null;
    if (!user || !reason) { alert("Wypełnij nick i powód"); return; }

    try {
      const res = await fetch("/api/bans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, reason, expiresAt: expiry })
      });
      if (res.ok) {
        banUserEl.value = "";
        banReasonEl.value = "";
        banExpiryEl.value = "";
        await loadBans();
      } else {
        alert("Błąd dodawania bana");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem");
    }
  });

  // usuwanie bana
  async function removeBan(id) {
    if (!confirm("Na pewno usunąć bana?")) return;
    try {
      const res = await fetch(`/api/bans?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) await loadBans();
      else alert("Błąd usuwania");
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia");
    }
  }

  // zabezpieczenie przed XSS
  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
});
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
