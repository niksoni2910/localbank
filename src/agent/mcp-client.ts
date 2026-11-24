import { MCPClient } from '@mcp-use/client';
import { config } from './config.js';

const client = new MCPClient({ mcpServers: { 'local-bank': { url: config.mcpUrl, timeout: 15000 } } });
let connectionPromise: ReturnType<typeof client.connect> | undefined;

export function getBankMcpConnection() {
  if (!connectionPromise) {
    connectionPromise = client.connect('local-bank').catch(error => {
      connectionPromise = undefined;
      throw error;
    });
  }
  return connectionPromise;
}

export async function listBankMcpTools() {
  const connection = await getBankMcpConnection();
  try {
    return await connection.listTools();
  } catch (error) {
    connectionPromise = undefined; // reconnect on the next request (for example after an MCP restart)
    throw error;
  }
}

export async function callBankMcpTool(name: string, args: Record<string, unknown>) {
  const connection = await getBankMcpConnection();
  let result;
  try {
    result = await connection.callTool(name, args);
  } catch (error) {
    connectionPromise = undefined;
    throw error;
  }
  if (result.isError) {
    const detail = result.content?.map((part: any) => part.type === 'text' ? part.text : '').filter(Boolean).join('\n');
    throw new Error(detail || `MCP tool ${name} failed.`);
  }
  const content = result.structuredContent as any;
  return content?.data ?? content ?? {};
}

export async function probeMcp(): Promise<{ ok: boolean; tools?: number; error?: string }> {
  try {
    const tools = await listBankMcpTools();
    return { ok: true, tools: tools.length };
  } catch {
    return { ok: false, error: `MCP server is not reachable at ${config.mcpUrl}` };
  }
}

export function closeBankMcpClient() {
  connectionPromise = undefined;
  return client.close();
}
