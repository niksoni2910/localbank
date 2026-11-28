import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { config } from './agent/config.js';
import { closeBankMcpClient } from './agent/mcp-client.js';
import { apiFetch, fetchCurrentEmployee, printHealth, readApiSseChat } from './cli/api-client.js';
import { performLogin, performLogout, printWhoAmI, rlOutput } from './cli/auth.js';
import { AI_DIVIDER, dim, promptArrow, USER_DIVIDER } from './cli/format.js';
import { renderWidget } from './cli/render.js';
import { resumeSessionFlow } from './cli/sessions.js';

export { renderWidget };

async function askOnce(sessionId: string | undefined, prompt: string): Promise<string | undefined> {
  let streamedAnyText = false;
  let renderedWidgets = false;
  let clearedThinking = false;
  const clearThinking = () => {
    if (output.isTTY && !clearedThinking) {
      clearedThinking = true;
      process.stdout.write('\r\x1b[K');
    }
  };
  console.log(dim(AI_DIVIDER));
  if (output.isTTY) process.stdout.write(dim('Thinking...'));

  const res = await apiFetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({ ...(sessionId ? { sessionId } : {}), surface: 'cli', message: prompt }),
  });
  if (res.status === 401) {
    clearThinking();
    throw new Error('Authentication required or expired. Run /login to sign in.');
  }

  const response = await readApiSseChat(
    res,
    widgets => {
      if (renderedWidgets) return;
      clearThinking();
      renderedWidgets = true;
      for (const widget of widgets) renderWidget(widget);
    },
    text => {
      clearThinking();
      if (!streamedAnyText) {
        if (renderedWidgets) process.stdout.write('\n');
        streamedAnyText = true;
      }
      process.stdout.write(text);
    },
  );

  if (!renderedWidgets && response.widgets.length) {
    clearThinking();
    renderedWidgets = true;
    for (const widget of response.widgets) renderWidget(widget);
  }
  if (!streamedAnyText) {
    clearThinking();
    if (renderedWidgets) process.stdout.write('\n');
    process.stdout.write(response.answer);
  }
  process.stdout.write('\n');
  return response.sessionId ?? sessionId;
}

function parseCliArgs(rawArgs: string[]) {
  let resumeArg: string | undefined;
  let forceLogin = false;
  const promptParts: string[] = [];

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === 'login' && i === 0) {
      forceLogin = true;
    } else if (arg === '--resume' || arg === '-r') {
      const next = rawArgs[i + 1];
      if (next && !next.startsWith('-')) {
        resumeArg = next;
        i++;
      } else {
        resumeArg = '';
      }
    } else if (arg.startsWith('--resume=')) {
      resumeArg = arg.slice('--resume='.length);
    } else {
      promptParts.push(arg);
    }
  }
  return { resumeArg, forceLogin, oneShot: promptParts.join(' ').trim() };
}

async function main() {
  const { resumeArg, forceLogin, oneShot } = parseCliArgs(process.argv.slice(2));
  let currentEmployee = await fetchCurrentEmployee();

  if (oneShot && !forceLogin && resumeArg === undefined) {
    try {
      await askOnce(undefined, oneShot);
    } catch (error) {
      console.error(`\nError: ${error instanceof Error ? error.message : String(error)}`);
      process.exitCode = 1;
    } finally {
      await closeBankMcpClient();
    }
    return;
  }

  console.log(`LocalBank Analyst AI CLI (${config.provider} · ${config.model})`);
  console.log('Internal bank employee analytics over synthetic portfolio (6 branches, 18 customers: CUST-1042..CUST-1390).');
  console.log('Commands: /login, /whoami, /logout, /resume [id|latest], /new, /clear, /health, /exit');
  await printHealth();

  const rl = createInterface({ input, output: rlOutput, terminal: Boolean(input.isTTY) });
  let closed = false;
  rl.on('close', () => { closed = true; });
  let activeSessionId: string | undefined;

  try {
    if (forceLogin || (!currentEmployee && input.isTTY)) {
      const login = await performLogin(rl);
      if (login.exit) return;
      currentEmployee = login.employee;
    } else if (currentEmployee) {
      console.log(`Signed in via cookie as ${currentEmployee.name} (${currentEmployee.title})`);
    }

    if (resumeArg !== undefined && currentEmployee) {
      try {
        activeSessionId = await resumeSessionFlow(rl, resumeArg);
      } catch (error) {
        console.error(`Resume error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    while (!closed) {
      let line: string;
      try {
        console.log(`\n${dim(USER_DIVIDER)}`);
        line = (await rl.question(promptArrow())).trim();
      } catch (error) {
        if ((error as NodeJS.ErrnoException)?.code === 'ERR_USE_AFTER_CLOSE') break;
        throw error;
      }
      if (!line) continue;
      if (/^\/(?:exit|quit)(?:\(\))?$/i.test(line)) break;
      if (line === '/clear') {
        if (output.isTTY) process.stdout.write('\x1b[2J\x1b[H');
        console.log('Cleared screen.');
        continue;
      }
      if (line === '/new') {
        activeSessionId = undefined;
        console.log('Started a new analysis session.');
        continue;
      }
      if (line === '/health') {
        await printHealth();
        continue;
      }
      if (line === '/whoami') {
        currentEmployee = await fetchCurrentEmployee();
        printWhoAmI(currentEmployee, activeSessionId);
        continue;
      }
      if (/^\/logout$/i.test(line)) {
        await performLogout();
        currentEmployee = null;
        activeSessionId = undefined;
        const login = await performLogin(rl);
        if (login.exit) break;
        currentEmployee = login.employee;
        continue;
      }
      if (line === '/login' || line.startsWith('/login ')) {
        const emailHint = line.slice('/login'.length).trim();
        const login = await performLogin(rl, emailHint || undefined);
        if (login.exit) break;
        if (login.employee) {
          currentEmployee = login.employee;
          activeSessionId = undefined;
        }
        continue;
      }
      if (line === '/resume' || line.startsWith('/resume ')) {
        if (!currentEmployee) {
          currentEmployee = await fetchCurrentEmployee();
          if (!currentEmployee) {
            console.log('Please sign in first using /login.');
            continue;
          }
        }
        try {
          const target = line.slice('/resume'.length).trim();
          const resumed = await resumeSessionFlow(rl, target || undefined);
          if (resumed) activeSessionId = resumed;
        } catch (error) {
          console.error(`Resume error: ${error instanceof Error ? error.message : String(error)}`);
        }
        continue;
      }

      if (!currentEmployee) {
        currentEmployee = await fetchCurrentEmployee();
        if (!currentEmployee && input.isTTY) {
          const login = await performLogin(rl);
          if (login.exit) break;
          currentEmployee = login.employee;
          if (!currentEmployee) continue;
        }
      }

      try {
        activeSessionId = await askOnce(activeSessionId, line);
      } catch (error) {
        console.error(`\nError: ${error instanceof Error ? error.message : String(error)}`);
        if (/Authentication required/i.test(error instanceof Error ? error.message : '')) {
          currentEmployee = null;
        }
      }
    }
  } finally {
    rl.close();
    await closeBankMcpClient();
  }
}

const isEntrypoint = process.argv[1]?.endsWith('cli.ts') || process.argv[1]?.endsWith('cli.js');
if (isEntrypoint) {
  void main();
}
