import { planFromLLMText, executePlan, registerAction } from './codeAct';
import vercelAdapter from './vercelAdapter';

export type SuperAgentOptions = {
  model?: string;
  apiKey?: string;
  actions?: Record<string, any>;
};

export function createSuperAgent(opts: SuperAgentOptions = {}) {
  const model = opts.model || 'gemini-3';

  // Register any provided actions
  if (opts.actions) {
    Object.entries(opts.actions).forEach(([name, fn]) => registerAction(name, fn));
  }

  async function runFromPrompt(prompt: string) {
    const gen = await vercelAdapter.vercelGenerateText(prompt, { model, apiKey: opts.apiKey });
    const text = (gen && (gen.text || gen.output || (gen.choices && gen.choices[0] && gen.choices[0].text))) || String(gen);
    const plan = planFromLLMText(text as string);
    return executePlan(plan as any[]);
  }

  return { runFromPrompt, registerAction };
}

export default { createSuperAgent };
