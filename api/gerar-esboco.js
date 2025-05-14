const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  try {
    const { tema } = req.body;

    if (!tema) {
      return res.status(400).json({ erro: "Tema é obrigatório" });
    }

    const prompt = `Crie um esboço bíblico com o tema: ${tema}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const resposta = completion.choices[0].message.content;

    res.status(200).json({ esboco: resposta });
  } catch (erro) {
    console.error("Erro ao gerar esboço:", erro);
    res.status(500).json({ erro: "Erro ao gerar esboço" });
  }
};
