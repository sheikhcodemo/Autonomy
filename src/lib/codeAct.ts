// Minimal CodeAct-like orchestrator for demo purposes.
// It runs a sequence of named actions using a registry.

export type ActionHandler = (args?: any) => Promise<any> | any;

const actions: Record<string, ActionHandler> = {};

export function registerAction(name: string, handler: ActionHandler) {
  actions[name] = handler;
}

export async function executePlan(plan: { action: string; args?: any }[], context?: any) {
  const results: any[] = [];
  for (const step of plan) {
    const handler = actions[step.action];
    if (!handler) throw new Error(`Action not found: ${step.action}`);
    const res = await handler({ ...(step.args || {}), context });
    results.push({ step, res });
  }
  return results;
}

// Try to parse a plan from LLM text output — expects a JSON array or line-delimited format.
export function planFromLLMText(text: string) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.map((p) => (typeof p === 'string' ? { action: p } : p));
  } catch (err) {
    // Not JSON — try parse simple delimited lines
  }
  const lines = text
    .split(/\n|\r/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const parts = l.split(/\s+/);
      return { action: parts[0], args: parts.slice(1) };
    });
  return lines;
}

export default { registerAction, executePlan, planFromLLMText };
