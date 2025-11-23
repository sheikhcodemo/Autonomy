import React from 'react';
import { createSuperAgent } from '../lib/superAgent';
import { CopilotPopup, useCopilotAction } from '../lib/copilotKit';

const defaultActions = {
  echo: async ({ text }: any) => ({ text }),
  summarize: async ({ text }: any) => ({ summary: String(text).slice(0, 140) + (String(text).length > 140 ? '...' : '') }),
};

export function SuperAgentExample(props: { apiKey?: string }) {
  const agent = React.useMemo(() => createSuperAgent({ apiKey: props.apiKey, actions: defaultActions }), [props.apiKey]);
  const [prompt, setPrompt] = React.useState('Create a 2-step plan: summarize this text then echo the summary');
  const [log, setLog] = React.useState<any[]>([]);

  const action = useCopilotAction({
    name: 'super-agent-run',
    handler: async (args: any) => {
      setLog((l) => [...l, { type: 'prompt', prompt: args.prompt }]);
      const res = await agent.runFromPrompt(args.prompt);
      setLog((l) => [...l, { type: 'result', res }]);
      return res;
    },
  });

  return (
    <div>
      <CopilotPopup instructions="Super Agent demo: runs an LLM plan via CodeAct + Vercel/Gemini3" labels={{ title: 'Super Agent' }}>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: '100%', minHeight: 80 }} />
        <div style={{ marginTop: 8 }}>
          <button onClick={() => action.execute({ prompt })}>Run</button>
        </div>
        <div style={{ marginTop: 12 }}>
          {log.map((it, i) => (
            <pre key={i} style={{ background: '#f7f7f7', padding: 8 }}>{JSON.stringify(it, null, 2)}</pre>
          ))}
        </div>
      </CopilotPopup>
    </div>
  );
}

export default SuperAgentExample;
