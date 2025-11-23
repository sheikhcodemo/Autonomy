// Adapter / wrapper for Vercel AI SDK (Gemini3) with a mock fallback
// In production, replace `mock` with actual SDK calls or a serverless proxy.
type VercelAdapterOptions = {
  model?: string;
  apiKey?: string;
  useMock?: boolean;
};

export async function vercelGenerateText(prompt: string, opts: VercelAdapterOptions = {}) {
  const model = opts.model || process.env.VITE_VERCEL_AI_MODEL || 'gemini-3';
  const useMock = opts.useMock === true || !opts.apiKey;

  if (useMock) {
    // Local deterministic mock for dev + tests
    await new Promise((r) => setTimeout(r, 250));
    return {
      model,
      prompt,
      text: `MOCK_RESPONSE from ${model}: ${prompt.slice(0, 80)}${prompt.length > 80 ? '...' : ''}`,
    };
  }

  // Real call to Vercel AI SDK or Gemini—this requires deploying an API key
  // For security, call the Vercel/Cloud function with an API key from server-side.
  const res = await fetch('/api/vercel/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model }),
  });
  if (!res.ok) throw new Error('Vercel AI proxy error');
  return res.json();
}

export default { vercelGenerateText };
