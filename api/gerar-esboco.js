// api/gerar-esboco.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { mensagem } = req.body;

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: mensagem }],
        max_tokens: 500,
      }),
    });

    const dados = await resposta.json();
    const textoGerado = dados.choices[0]?.message?.content;

    res.status(200).json({ esboco: textoGerado });
  } catch (erro) {
    console.error('Erro ao gerar esboço:', erro);
    res.status(500).json({ erro: 'Erro ao gerar esboço' });
  }
}
