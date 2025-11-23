// Example Next.js API route for forwarding requests to the Vercel AI SDK or Gemini-3.
// This file is a template: copy to your Next.js project and set VERCEL_AI_KEY in server env.
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, model } = req.body || {};
  if (!process.env.VERCEL_AI_KEY) return res.status(500).json({ error: 'Missing VERCEL_AI_KEY' });
  try {
    // Example using fetch to the Vercel AI serverless endpoint; adapt to the official SDK if desired.
    const response = await fetch('https://vercel.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VERCEL_AI_KEY}`,
      },
      body: JSON.stringify({ model: model || 'gemini-3', input: prompt }),
    });
    if (!response.ok) {
      const txt = await response.text();
      return res.status(500).json({ error: txt });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
