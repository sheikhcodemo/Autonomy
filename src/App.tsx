import React from 'react';
import CopilotDemo from './components/CopilotDemo';
import VercelAgentExample from './components/VercelAgentExample';

export default function App() {
  return (
    <div className="container">
      <h1>Autonomy - Example App</h1>
      <p>Minimal example showing CopilotPopup + useCopilotAction patterns.</p>
      <div className="action-list">
        <CopilotDemo />
        <VercelAgentExample />
      </div>
    </div>
  );
}
