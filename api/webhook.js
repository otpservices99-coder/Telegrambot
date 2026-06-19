export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("Bot is running!");
  const message = req.body?.message;
  if (!message) return res.status(200).send("ok");
  const chatId = message.chat.id;
  const text = message.text || "Hello!";
  await fetch(`https://api.telegram.org/bot8357190104:AAG699Wc_NdJbp6Ie7caG97KQZY4s-C6_OE/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: `You said: ${text}` }),
  });
  res.status(200).send("ok");
}
