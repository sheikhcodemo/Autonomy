import { describe, it, expect } from 'vitest';
import vercelAdapter from '../lib/vercelAdapter';
import { registerAction, executePlan, planFromLLMText } from '../lib/codeAct';

describe('vercelAdapter (mock)', () => {
  it('returns a mock output when useMock is true', async () => {
    const res = await vercelAdapter.vercelGenerateText('hello world', { useMock: true });
    expect(res).toHaveProperty('text');
    expect(res.text).toContain('MOCK_RESPONSE');
    expect(res.prompt).toBe('hello world');
  });
});

describe('codeAct plan parsing + execution', () => {
  it('parses JSON plan from LLM', () => {
    const planText = JSON.stringify([{ action: 'reply', args: 'hello' }, { action: 'log', args: 'ok' }]);
    const plan = planFromLLMText(planText);
    expect(Array.isArray(plan)).toBeTruthy();
    expect(plan[0].action).toBe('reply');
  });

  it('parses line delimited plan', () => {
    const planText = 'reply Hello\nlog done';
    const plan = planFromLLMText(planText);
    expect(plan.length).toBe(2);
    expect(plan[1].action).toBe('log');
  });

  it('registers and executes actions', async () => {
    registerAction('reply', async ({ args }: any) => ({ text: `echo:${args}` }));
    registerAction('log', async ({ args }: any) => ({ ok: args === 'done' }));
    const plan = [{ action: 'reply', args: 'hi' }, { action: 'log', args: 'done' }];
    const result = await executePlan(plan);
    expect(result[0].res.text).toBe('echo:hi');
    expect(result[1].res.ok).toBeTruthy();
  });
});
