import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
  }

  const { mensagem } = req.body;

  if (!mensagem) {
    return res.status(400).json({ erro: 'Mensagem é obrigatória.' });
  }

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

    const textoGerado = dados.choices?.[0]?.message?.content;

    if (!textoGerado) {
      return res.status(500).json({ erro: 'Erro ao processar resposta da IA.' });
    }

    res.status(200).json({ esboco: textoGerado });

  } catch (erro) {
    console.error('Erro ao gerar esboço:', erro);
    res.status(500).json({ erro: 'Erro interno ao gerar esboço.' });
  }
}
