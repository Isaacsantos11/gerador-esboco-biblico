const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido. Use POST." });
  }

  try {
    const { tema } = req.body;

    if (!tema) {
      return res.status(400).json({ error: "Tema é obrigatório." });
    }

    const prompt = `Crie um esboço bíblico com o tema: ${tema}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const resposta = completion.choices[0].message.content;

    res.status(200).json({ esboco: resposta });
  } catch (error) {
    console.error("Erro ao gerar esboço:", error);
    res.status(500).json({ error: "Erro ao gerar esboço." });
  }
};
