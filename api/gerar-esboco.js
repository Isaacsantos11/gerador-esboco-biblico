import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { mensagem } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um pastor especialista em pregação cristã. Crie esboços bíblicos bem estruturados."
        },
        {
          role: "user",
          content: mensagem
        }
      ]
    });

    const resposta = completion.choices[0].message.content;
    res.status(200).json({ resposta });
  } catch (error) {
    console.error("Erro ao gerar esboço:", error);
    res.status(500).json({ error: "Erro ao gerar esboço" });
  }
}
