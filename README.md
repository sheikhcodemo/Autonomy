# Autonomy Generate Code from natural language descriptions and specs
Adapt with Modes: Code, Architect, Ask, Debug, and Custom Modes
Refactor & Debug existing code
Write & Update documentation
Answer Questions about your codebase
Automate repetitive tasks
Utilize MCP Servers

 adapts to how you work:
   npx copilotkit@latest init

   Install: Run a simple CLI command
Configure: Add CopilotKit provider to your app
Customize: Use headless UI or the customizable pre-built components
Deploy: You're done!Minutes to integrate - Get started quickly with our CLI
Framework agnostic - Works with React, Next.js, AGUI and more
Production-ready UI - Use customizable components or build with headless UI
Built-in security - Prompt injection protection
Open source - Full transparency and community-driven🧑‍💻 Real life use cases
Deploy deeply-integrated AI assistants & agents that work alongside your users inside your applications.

Headless UI
🖥️ Code Samples
Drop in these building blocks and tailor them to your needs.

Build with Headless APIs and Pre-Built Components
// Headless UI with full control
const { visibleMessages, appendMessage, setMessages, ... } = useCopilotChat();

// Pre-built components with deep customization options (CSS + pass custom sub-components)
<CopilotPopup 
  instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."} 
  labels={{ title: "Popup Assistant", initial: "Need any help?" }} 
/>
// Frontend actions + generative UI, with full streaming support
useCopilotAction({
  name: "appendToSpreadsheet",
  description: "Append rows to the current spreadsheet",
  parameters: [
    { name: "rows", type: "object[]", attributes: [{ name: "cells", type: "object[]", attributes: [{ name: "value", type: "string" }] }] }
  ],
  render: ({ status, args }) => <Spreadsheet data={canonicalSpreadsheetData(args.rows)} />,
  handler: ({ rows }) => setSpreadsheet({ ...spreadsheet, rows: [...spreadsheet.rows, ...canonicalSpreadsheetData(rows)] }),
});
Integrate In-App CoAgents with LangGraph
// Share state between app and agent
const { agentState } = useCoAgent({ 
  name: "basic_agent", 
  initialState: { input: "NYC" } 
});

// agentic generative UI
useCoAgentStateRender({
  name: "basic_agent",
  render: ({ state }) => <WeatherDisplay {...state.final_response} />,
});

// Human in the Loop (Approval)
useCopilotAction({
  name: "email_tool",
  parameters: [
    {
      name: "email_draft",
      type: "string",
      description: "The email content",
      required: true,
    },
  ],
  renderAndWaitForResponse: ({ args, status, respond }) => {
    return (
      <EmailConfirmation
        emailContent={args.email_draft || ""}
        isExecuting={status === "executing"}
        onCancel={() => respond?.({ approved: false })}
        onSend={() =>
          respond?.({
            approved: true,
            metadata: { sentAt: new Date().toISOString() },
          })
        }
      />
    );
  },
});
// intermediate agent state streaming (supports both LangGraph.js + LangGraph python)
const modifiedConfig = copilotKitCustomizeConfig(config, {
  emitIntermediateState: [{ 
    stateKey: "outline", 
    tool: "set_outline", 
    toolArgument: "outline" 
  }],
});
const response = await ChatOpenAI({ model: "gpt-4o" }).invoke(messages, modifiedConfig);

Code Mode: everyday coding, edits, and file ops
Architect Mode: plan systems, specs, and migrations
Ask Mode: fast answers, explanations, and docs
Debug Mode: trace issues, add logs, isolate root causes
Custom Modes: build specialized modes for your team or workflow.

Vercel AI SDK + Gemini-3 Example (Quickstart)
This repo now includes a minimal example that shows how the CopilotKit patterns integrate with the Vercel AI SDK (Gemini-3) and a CodeAct-style orchestrator for agentic planning.

- **Files added**: `src/components/VercelAgentExample.tsx`, `src/lib/vercelAdapter.ts`, `src/lib/codeAct.ts`
- **Local dev**: By default the example uses a **mock** LLM for development. You can toggle `Mock` in the UI or provide a server-side proxy to the Vercel AI SDK.

Quick steps to try locally:
1. Set environment variables locally if you have a Vercel/Gemini key (use a server proxy to keep secrets server-side):
```
export VITE_VERCEL_AI_MODEL=gemini-3
export VITE_USE_VERCEL_PROXY=1
```
2. Start the app:
```
npm ci
npm run dev
```
3. Open the demo and toggle `Mock` off to call an API proxy you provide at `/api/vercel/generate`.

Deployment notes:
- For production use with Vercel AI, create a serverless function (`/api/vercel/generate`) that forwards requests to the Vercel AI SDK or directly calls the Gemini-3 endpoint using a server-side key.
- Keep API keys server-side and use a small proxy or Next.js route to avoid exposing secrets to clients.

CodeAct (Minimal Orchestrator) Example
The `src/lib/codeAct.ts` file contains a small, composable orchestrator for demonstration. It supports:
- Action registration with `registerAction(name, handler)`
- Running a plan via `executePlan(plan)`
- Parsing simple LLM output with `planFromLLMText(text)` which supports JSON arrays or line-delimited plans
# Gemini Computer

Modern with security. Experience the power of Google DeepMind's most capable AI models designed for safety, performance, and scale.

## Overview

Gemini Computer is a modern, secure interface for interacting with Google DeepMind's Gemini AI models. Built with safety, performance, and scalability in mind.

## Features

- 🔒 **Secure** - Environment-based API key management
- 🚀 **Modern** - Rich CLI interface and FastAPI REST API
- 🛡️ **Safe** - Built-in safety settings for responsible AI usage
- 💬 **Interactive** - Real-time chat interface with conversation history
- ⚡ **Performant** - Optimized configuration for speed and quality
- 🔌 **API-First** - RESTful FastAPI endpoints with OpenAPI documentation
- 🌐 **Compatible** - Cross-platform support with compatibility checking
- 👨‍💻 **Developer-Friendly** - Comprehensive DX tools and documentation

## Structure

```
Gemini Computer/
├── source/
│   ├── __init__.py          # Package initialization
│   ├── main.py              # CLI entry point
│   ├── api.py               # FastAPI REST API
│   ├── config.py            # Configuration management
│   ├── gemini_client.py     # Gemini AI client
│   ├── schemas.py           # Pydantic request/response models
│   ├── compatibility.py     # Compatibility checking
│   └── utils.py             # Utility functions
├── run.py                   # CLI runner script
├── run_api.py               # API server runner
├── .env.example             # Example environment configuration
├── requirements.txt         # Python dependencies
├── DESIGN.md                # Design and methodology documentation
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure your API key:**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your API key
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

### Running

**CLI Mode:**
```bash
# Option 1: Use runner script (recommended)
python run.py

# Option 2: Run as a module
python -m source.main
```

**API Mode (FastAPI):**
```bash
# Start the REST API server
python run_api.py

# Server starts at http://localhost:8000
# API Documentation: http://localhost:8000/docs
```

## Usage

### CLI Mode

Once running in CLI mode, you can:

- **Chat** - Type messages and have conversations with Gemini AI
- **Commands:**
  - `/help` - Show help information
  - `/clear` - Clear chat history
  - `/models` - List available Gemini models
  - `/exit` or `/quit` - Exit the application

### API Mode

Start the server with `python run_api.py` and access:

- **API Documentation:** http://localhost:8000/docs (Swagger UI)
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI Spec:** http://localhost:8000/openapi.json
- **Health Check:** http://localhost:8000/health

**Export OpenAPI Schema:**
```bash
python export_openapi.py
# Or specify output file:
python export_openapi.py openapi.json
```

**Available Endpoints:**

**AI Endpoints:**
- `POST /api/v1/chat` - Chat with conversation context
- `POST /api/v1/generate` - Generate text without context
- `GET /api/v1/models` - List available models

**User Endpoints:**
- `GET /v1/users` - Get all users (with pagination and filtering)
- `GET /v1/users/{userId}` - Get a specific user
- `POST /v1/users` - Create a new user
- `PUT /v1/users/{userId}` - Update a user
- `DELETE /v1/users/{userId}` - Delete a user

**System Endpoints:**
- `GET /health` - Health check
- `GET /compatibility` - System compatibility check
- `GET /openapi.json` - OpenAPI specification

**OpenAPI Features:**
- ✅ Full OpenAPI 3.0 specification
- ✅ Server URLs configuration (local & production)
- ✅ Enhanced metadata for all endpoints
- ✅ Comprehensive request/response schemas
- ✅ Security schemes definition
- ✅ SDK-ready for code generation tools

### Example

```
You: What is artificial intelligence?
Gemini: [Detailed response about AI]

You: How does Gemini work?
Gemini: [Explanation of Gemini's architecture]
```

## Configuration

Edit `.env` file to customize:

- `GEMINI_API_KEY` - Your API key (required)
- `GEMINI_MODEL` - Model name (default: `gemini-pro`)
- `GEMINI_TEMPERATURE` - Creativity level 0-1 (default: `0.9`)
- `GEMINI_MAX_TOKENS` - Max response length (default: `2048`)

## Safety & Security

- API keys are stored securely in environment variables
- Built-in safety filters to prevent harmful content
- No data is stored locally beyond session history

## License

[Add your license here]

## Credits

Powered by [Google DeepMind Gemini](https://deepmind.google/technologies/gemini/)


This enables a simple super-agent pattern where an LLM outlines the plan and a set of registered actions execute steps in sequence.

Super Agent (CodeAct + Gemini-3) demo
A lightweight "super agent" composes `codeAct` and the Vercel/Gemini adapter to run LLM-derived plans and execute registered actions.

- **Files added**: `src/lib/superAgent.ts`, `src/components/SuperAgentExample.tsx`
- **Usage**: By default the demo uses the local mock adapter. To call Gemini-3 in production, deploy a serverless proxy at `/api/vercel/generate` and set `VERCEL_AI_KEY` in server-side env.

Quick local try:
1. (Optional) set a Vercel AI key in a server-side proxy when available:
```bash
export VERCEL_AI_KEY=your_server_side_key
```
2. Run the app:
```bash
npm ci
npm run dev
```
3. Open the demo UI and try the `Super Agent` component located at `src/components/SuperAgentExample.tsx`.

The `SuperAgentExample` demonstrates: sending a natural language prompt, getting back a simple plan from the LLM (mock or Gemini), parsing it with `planFromLLMText`, and executing registered actions via `codeAct`.

Security and Autonomy Guidelines
- Keep private keys in server-side env vars and proxy all model calls; never call the LLM directly from the client in production.
- Use `copilotKitCustomizeConfig({ emitIntermediateState: ... })` when you want to stream intermediate agent state for debugging and observability.
- For human-in-the-loop approvals, use `renderAndWaitForResponse` patterns from `useCopilotAction`.
P Development Environment
Tags:

latest - tag which is meant to be used by the community for building GIMP.
There are also date timestamped tags tracking the image history in case debugging needs to occur.
For running and developing GIMP using this docker image refer to Getting Started section⁠ of the project README.

docker pull gimp/gimp:latest
Tag summary
latest
Recent tags
Content type

Image

Digest


Size

590.9 MB

Last updated

over 6 years ago

docker pull gimp/gimp
Want to add real Gemini-3 integration? Add a serverless function like `/api/vercel/generate` and either use the official Vercel AI SDK or the provider SDK you prefer. Example proxies are left intentionally minimal to avoid shipping any keys in this repository.
