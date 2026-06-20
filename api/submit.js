export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    let data = req.body;

    // Vercel sometimes gives body as a string — parse it if needed
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No data received" });
    }

    let text = "📩 New Submission\n";
    for (const key in data) {
      text += `${key}: ${data[key]}\n`;
    }

    const tgResponse = await fetch(
      `https://api.telegram.org/bot8357190104:AAG699Wc_NdJbp6Ie7caG97KQZY4s-C6_OE/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "8259952691", text }),
      }
    );

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      return res.status(500).json({ error: "Telegram API failed", details: tgData });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server crashed", message: err.message });
  }
}
