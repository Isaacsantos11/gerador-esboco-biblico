const fetch = require('node-fetch');

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;  // A chave API do OpenAI, configurada no Vercel

  if (req.method === 'POST') {
    try {
      const prompt = req.body.prompt;  // O prompt enviado para a API do OpenAI
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Você pode alterar o modelo conforme necessário
          prompt: prompt,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      res.status(200).json({ result: data.choices[0].text });  // Retorna o texto gerado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar o esboço' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
