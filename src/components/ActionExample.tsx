import React from 'react';
import { useCopilotAction } from '../lib/copilotKit';

export default function ActionExample() {
  const action = useCopilotAction<{ text: string }>({
    name: 'echo',
    handler: ({ text }) => `${text} (echoed)`,
  });
  return (
    <div>
      <button onClick={() => void action.execute({ text: 'Hello' })}>Echo</button>
      <div>Status: {action.status}</div>
    </div>
  );
}
