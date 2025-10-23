// /api/bans.js
let bans = []; // w pamięci (tymczasowo)

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // --- GET: pobiera listę banów ---
    case "GET":
      res.status(200).json(bans);
      break;

    // --- POST: dodaje nowego bana ---
    case "POST":
      try {
        const { user, reason, expiresAt } = req.body;
        if (!user || !reason) {
          return res.status(400).json({ error: "Brak wymaganych danych" });
        }
        const newBan = {
          id: Date.now().toString(),
          user,
          reason,
          expiresAt: expiresAt || null,
        };
        bans.push(newBan);
        res.status(200).json(newBan);
      } catch (err) {
        res.status(500).json({ error: "Błąd serwera" });
      }
      break;

    // --- DELETE: usuwa bana ---
    case "DELETE":
      const id = req.query.id;
      bans = bans.filter((b) => b.id !== id);
      res.status(200).json({ success: true });
      break;

    default:
      res.status(405).json({ message: "Metoda niedozwolona" });
  }
}
