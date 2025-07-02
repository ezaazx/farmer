export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ', // ← your OpenAI API key here
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ error: 'OpenAI API failed', details: data }),
        { status: 500 }
      );
    }

    const text = data.choices?.[0]?.message?.content || 'No solution found.';

    return new Response(JSON.stringify({ solutions: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API route error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
