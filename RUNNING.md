# Run the example app

This repository contains a minimal Vite/React example app that showcases `CopilotPopup` and `useCopilotAction` patterns using a local mock of the CopilotKit APIs.

Install deps and run the dev server:

```bash
npm ci
npm run dev
```

Run tests with:

```bash
npm test
```

Vercel AI / Gemini-3 Integration (Optional)
1. Create a serverless route that forwards requests to the Vercel AI SDK using a server-side key (see `examples/nextjs/api/vercelGenerate.ts` for a template).
2. Set `VITE_VERCEL_AI_MODEL` to `gemini-3` or your preferred model.
3. Toggle `Mock` in the example UI off and call the proxy from your client to make LLM requests without exposing keys.

