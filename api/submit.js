hereexport default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const data = req.body;

  // Build message from whatever fields were sent
  let text = "📩 New Submission\n";
  for (const key in data) {
    text += `${key}: ${data[key]}\n`;
  }

  await fetch(`https://api.telegram.org/bot8357190104:AAG699Wc_NdJbp6Ie7caG97KQZY4s-C6_OE/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: "8259952691", text }),
  });

  res.status(200).json({ success: true });
}
