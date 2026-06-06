// Wolf Constructions dashboard - live data proxy
// Reuses the existing ContentHub backend (which holds the Publer session/token)
// so this repo needs no secrets. Override the upstream with HUB_API env var if needed.
export default async function handler(req, res) {
  const HUB = process.env.HUB_API || 'https://contenthub-dashboard.vercel.app/api/instagram';
  const CLIENT = process.env.CLIENT_ID || 'wolf-constructions';
  try {
    const r = await fetch(`${HUB}?client=${encodeURIComponent(CLIENT)}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!r.ok) {
      res.status(502).json({ error: `Upstream ${r.status}` });
      return;
    }
    const json = await r.json();
    const client = (json.clients && json.clients[0]) || json;
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ generatedAt: json.generatedAt || new Date().toISOString(), client });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
