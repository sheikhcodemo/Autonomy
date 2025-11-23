import React from 'react';

// Minimal mock of CopilotKit APIs used in README/examples.
// In a real app, import these from the published package.

export type UseCopilotActionDef<TArgs = any> = {
  name: string;
  description?: string;
  parameters?: any[];
  render?: (props: { status: 'idle' | 'executing' | 'done'; args: TArgs }) => React.ReactNode;
  renderAndWaitForResponse?: (props: { args: TArgs; status: string; respond: (res: any) => void }) => React.ReactNode;
  handler?: (args: TArgs) => any | Promise<any>;
};

export function useCopilotAction<TArgs>(def: UseCopilotActionDef<TArgs>) {
  const [status, setStatus] = React.useState<'idle' | 'executing' | 'done'>('idle');
  const execute = async (args: TArgs) => {
    setStatus('executing');
    try {
      const res = def.handler ? await def.handler(args) : undefined;
      setStatus('done');
      return res;
    } finally {
      setTimeout(() => setStatus('idle'), 500);
    }
  };
  return { status, execute, def };
}

export function CopilotPopup(props: { instructions?: string; labels?: { title?: string; initial?: string }; children?: React.ReactNode }) {
  return (
    <div className="popup">
      <strong>{props.labels?.title || 'Copilot'}</strong>
      <div style={{ marginTop: 8 }}>{props.instructions}</div>
      <div style={{ marginTop: 8 }}>{props.children}</div>
    </div>
  );
}

export function copilotKitCustomizeConfig(config: any, opts: any) {
  return { ...config, __emit: opts?.emitIntermediateState };
}

export function useCoAgent(_: { name: string; initialState?: any }) {
  const [agentState, setAgentState] = React.useState<any>(_.initialState || {});
  return { agentState, setAgentState };
}

export function useCopilotChat() {
  const [messages, setMessages] = React.useState<any[]>([]);
  return { messages, setMessages, appendMessage: (m: any) => setMessages((s) => [...s, m]) };
}
