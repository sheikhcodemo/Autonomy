import React from 'react';
import { CopilotPopup, useCopilotAction } from '../lib/copilotKit';
import vercelAdapter from '../lib/vercelAdapter';
import { registerAction, executePlan, planFromLLMText } from '../lib/codeAct';

export default function VercelAgentExample() {
  const [prompt, setPrompt] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);
  const [useMock, setUseMock] = React.useState(true);

  React.useEffect(() => {
    // register demo actions
    registerAction('reply', async ({ args }: any) => {
      const text = Array.isArray(args) ? args.join(' ') : args?.text || args;
      setMessages((m) => [...m, `reply: ${text}`]);
      return { text };
    });
    registerAction('log', async ({ args }: any) => {
      setMessages((m) => [...m, `log: ${args}`]);
      return { ok: true };
    });
  }, []);

  const aiAction = useCopilotAction({
    name: 'vercel.generate_text',
    description: 'Generate text using a Gemini3 model via Vercel AI or a mock',
    handler: async ({ prompt: p }: any) => {
      const res = await vercelAdapter.vercelGenerateText(p, { useMock });
      setMessages((m) => [...m, `AI: ${res.text || res.output || JSON.stringify(res)}`]);
      return res;
    },
  });

  const runPlanFromLLM = async () => {
    const llmText = (await vercelAdapter.vercelGenerateText(`Plan actions for: ${prompt}`, { useMock })).text;
    setMessages((m) => [...m, `Plan generation: ${llmText}`]);
    const plan = planFromLLMText(llmText);
    const results = await executePlan(plan, { prompt });
    setMessages((m) => [...m, `Plan results: ${JSON.stringify(results)}`]);
  };

  return (
    <CopilotPopup instructions="Demo: Vercel AI SDK + CodeAct minimal orchestrator">
      <div style={{ display: 'flex', gap: 8, flexDirection: 'column', width: 500 }}>
        <textarea
          aria-label="prompt"
          placeholder="Enter a prompt for the agent"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => aiAction.execute({ prompt })}>Run (AI)</button>
          <button onClick={runPlanFromLLM}>Plan + Execute</button>
          <label style={{ marginLeft: 'auto' }}>
            <input type="checkbox" checked={useMock} onChange={(e) => setUseMock(e.target.checked)} /> Mock
          </label>
        </div>
        <div style={{ borderTop: '1px solid #eee', paddingTop: 8 }}>
          <strong>Messages:</strong>
          <ul>
            {messages.map((m, idx) => (
              <li key={idx} style={{ fontSize: 13 }}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CopilotPopup>
  );
}
