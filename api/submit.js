export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};

    // ✅ CAPTURE EVERYTHING — all fields, dynamically
    const timestamp = new Date().toLocaleString();
    
    // Build a pretty message with ALL fields received
    let message = `📩 *New Submission Received*\n\n`;
    message += `🕐 *Time:* ${timestamp}\n`;
    message += `━━━━━━━━━━━━━━━\n\n`;

    // Loop through every field dynamically
    let fieldCount = 0;
    for (const [key, value] of Object.entries(body)) {
      fieldCount++;
      message += `*${key}:* ${value}\n`;
    }

    if (fieldCount === 0) {
      message += `*No fields received*\n`;
    }

    // Send to Telegram
    const botToken = process.env.BOT_TOKEN || process.env.TELEGRAM_TOKEN;
    if (!botToken) {
      return res.status(500).json({ error: 'Bot token not configured in env' });
    }

    const chatId = process.env.CHAT_ID;
    if (!chatId) {
      return res.status(500).json({ error: 'CHAT_ID not configured in env' });
    }

    const tgResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const tgData = await tgResp.json();

    return res.status(200).json({
      success: true,
      fields_received: fieldCount,
      telegram_ok: tgData.ok || false
    });

  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
