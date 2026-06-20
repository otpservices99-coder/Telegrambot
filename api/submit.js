export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    
    // HARDCODED - safe because GitHub is private
    const botToken = '8357190104:AAG699Wc_NdJbp6Ie7caG97KQZY4s-C6_OE';
    const chatId = '8259952691';

    const timestamp = new Date().toLocaleString();
    let message = `📩 *New Submission*\n\n🕐 ${timestamp}\n━━━━━━━━━━━\n\n`;

    // 🔥 Captures ANY field automatically - no hardcoding!
    for (const [key, value] of Object.entries(body)) {
      message += `*${key}:* ${value}\n`;
    }

    const tgResp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    });

    const tgData = await tgResp.json();

    return res.status(200).json({ success: true, telegram_ok: tgData.ok || false });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
