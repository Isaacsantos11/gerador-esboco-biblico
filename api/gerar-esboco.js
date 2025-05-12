export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: `Crie um esboço bíblico para: ${prompt}` }],
      temperature: 0.7,
    }),
  });

  const data = await resposta.json();
  const resultado = data.choices[0].message.content;

  res.status(200).json({ resultado });
}
