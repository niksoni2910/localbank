# Banking chat agent

The chat agent is an HTTP service backed by Cloudflare Workers AI by default (Gemma 4 26B A4B Instruct). Set `LLM_PROVIDER=ollama` to use a local Ollama model instead. It uses `@mcp-use/client` to discover and call tools exposed by the separate MCP server.

## Files

- `../api.ts` exposes the chat and health HTTP routes.
- `chat.ts` builds model requests, handles MCP tool calls, and produces chat responses.
- `llm.ts` adapts the shared chat/tool format to Workers AI or Ollama and probes model availability.
- `tools.ts` maps model tool calls to MCP tool names and adapts tool results for the UI.
- `mcp-client.ts` owns the `@mcp-use/client` connection to the MCP endpoint.
- `conversation.ts` contains the system prompt and request intent helpers.
- `../banking.ts` contains synthetic demo data and shared calculations.

## Separate MCP service

`../mcp/index.ts` exposes banking functions through MCP and owns the tool definitions and views. The agent and MCP server are separate processes and code areas; MCP is their explicit runtime boundary. The MCP server imports the shared domain functions from `../banking.ts`.
