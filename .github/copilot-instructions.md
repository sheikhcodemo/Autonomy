## Copilot Instructions for Autonomy

This repo contains the Autonomy CopilotKit examples and documentation. The project is a frontend-focused, framework-agnostic AI toolkit; examples in the repo use React hooks and pre-built components. This file gives actionable guidance to AI coding agents working on this codebase.

- **Big Picture:**
  - The library is a UI + SDK for embedding AI copilots: headless APIs for logic + pre-built components for UI (see `README.md` examples).
  - Primary integration patterns are React hooks and components: `useCopilotChat`, `useCopilotAction`, `useCoAgent`, `useCoAgentStateRender`, and `CopilotPopup`.
  - Agents can stream intermediate state via `copilotKitCustomizeConfig({ emitIntermediateState: [...] })` and integrate with LangGraph/ChatOpenAI for LLM-backed behavior.

- **Typical Developer Workflows:**
  - Bootstrapping: use `npx copilotkit@latest init` to scaffold an integration into an app.
  - Add or update actions: follow `useCopilotAction` patterns shown in `README.md` — define `name`, `parameters`, `handler`, and `render`/`renderAndWaitForResponse` when human approval is required.
  - Add UI: prefer `CopilotPopup` and pre-built components unless app requires headless usage.
  - Stream & Debug: use `copilotKitCustomizeConfig` + `emitIntermediateState` for streaming internal agent state; `Debug Mode` is intended for trace and log enhancements.

- **Conventions & Patterns (from examples):**
  - Use headless hooks (`useCopilotChat`, `useCoAgent`, etc.) for business logic and state; use pre-built components only for UI.
  - Keep `handler` logic in actions pure and side-effect-limited; render UI with `render` to decouple UI from logic.
  - For workflows that need human approval, use `renderAndWaitForResponse` and `respond` to return metadata (`{ approved: true }`).
  - Use `emitIntermediateState` to expose intermediate agent state keys (e.g., `outline`) for streaming updates.

- **Integration Points & Dependencies**
  - Agent backends and streaming: `ChatOpenAI` for LLM invocation and `LangGraph` integrations for streaming and state sharing.
  - MCP Servers are mentioned as a runtime communication layer — preserve references to that integration and do not break the contract.
  - No package manifests exist in this minimal repo; investigate `package.json` and `tsconfig` in downstream projects before making dependency or build changes.

- **Testing / Debugging Tips**
  - There are no tests in this small repo snapshot; prefer to add small, focused unit tests for actions and state handlers using the host app's testing stack.
  - For debugging streaming/state issues, use `emitIntermediateState` and add verbose logs in `handler` implementations.

- **Change Guidance for AI Agents**
  - Target one change per PR with focused scope (add an action, tweak a component, or improve streaming). Keep handlers isolated.
  - When adding features, follow the examples in `README.md` — replicate `useCopilotAction` patterns and preferred render decoupling.
  - Do not modify security-related configuration (prompt-injection protection) unless explicitly requested and explained in the PR description.

  - **Local Example App**
    - A minimal example app is included to demonstrate usage without requiring external SDKs.
    - Key files: `src/lib/copilotKit.tsx` (local mocks), `src/components/CopilotDemo.tsx`, `src/components/ActionExample.tsx`, and `src/App.tsx`.
    - Test harness: `vitest` (see `vitest.config.ts`) and tests in `src/__tests__/App.test.tsx`.
    - Run locally: `npm ci`, `npm run dev` (Vite dev server), `npm test` (run vitest).


If items are missing or unclear in this document, tell me which part of the repo you'd like to focus on (e.g., add example apps, add tests, or scaffold `package.json` for a full app) and I’ll iterate.
