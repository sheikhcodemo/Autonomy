import React from 'react';
import { CopilotPopup, useCopilotAction } from '../lib/copilotKit';

export default function CopilotDemo() {
  const action = useCopilotAction<{ rows: { value: string }[] }>({
    name: 'appendToSpreadsheet',
    description: 'Append rows to the current spreadsheet',
    handler: ({ rows }) => {
      return rows.map((r) => ({ value: `${r.value} (appended)` }));
    },
  });

  return (
    <CopilotPopup instructions={'You are assisting the user as best as you can.'} labels={{ title: 'Popup Assistant' }}>
      <div>
        <button
          onClick={async () => {
            const res = await action.execute({ rows: [{ value: 'Row 1' }] });
            alert(`Action done, returned ${JSON.stringify(res)}`);
          }}
        >
          Execute Append Action
        </button>
        <div style={{ marginTop: 8 }}>Status: {action.status}</div>
      </div>
    </CopilotPopup>
  );
}
