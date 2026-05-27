export default async function handler(req, res) {
  const { message } = req.query;
  const TELEGRAM_BOT_TOKEN = '8357190104:AAGRU7LylcJDfGyYGAQHhni7e8PyAC8PKkU';
  const chat_id = '8259952691';

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
