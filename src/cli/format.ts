import { stdout as output } from 'node:process';

export const USER_DIVIDER = '────────────────────────────────────────────────────────────';
export const AI_DIVIDER = '····························································';
export const dim = (text: string) => (output.isTTY ? `\x1b[90m${text}\x1b[0m` : text);
export const promptArrow = () => (output.isTTY ? '\x1b[36;1m›\x1b[0m ' : '› ');

export const money = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num)
    ? `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
    : String(value ?? '—');
};

export const pct = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? `${num}%` : '—';
};

export const truncate = (text: string, maxWidth: number) =>
  text.length > maxWidth ? `${text.slice(0, Math.max(1, maxWidth - 1))}…` : text;

export const padCell = (text: string, width: number, align: 'left' | 'right' = 'left') =>
  align === 'right' ? text.padStart(width, ' ') : text.padEnd(width, ' ');

export type TableColumn = {
  header: string;
  key: string;
  align?: 'left' | 'right';
  maxWidth?: number;
};

export function printKeyValueCard(title: string, rows: [string, string][], footer?: string) {
  const labelWidth = Math.max(...rows.map(([k]) => k.length), 10);
  const valueWidth = Math.max(...rows.map(([, v]) => v.length), 10);
  const innerWidth = Math.max(title.length, labelWidth + valueWidth + 3, footer?.length ?? 0);
  const border = `─`.repeat(innerWidth + 2);
  console.log(`\n┌${border}┐`);
  console.log(`│ ${title.padEnd(innerWidth, ' ')} │`);
  console.log(`├${border}┤`);
  for (const [label, value] of rows) {
    const line = `${label.padEnd(labelWidth, ' ')} : ${value}`;
    console.log(`│ ${line.padEnd(innerWidth, ' ')} │`);
  }
  if (footer) {
    console.log(`├${border}┤`);
    console.log(`│ ${footer.padEnd(innerWidth, ' ')} │`);
  }
  console.log(`└${border}┘`);
}

export function printTable(title: string, columns: TableColumn[], rows: Record<string, string>[], footer?: string) {
  console.log(`\n${title}`);
  if (!rows.length) {
    console.log('  (no matching records)');
    if (footer) console.log(`  ${footer}`);
    return;
  }

  const widths = columns.map(col => {
    const rawMax = Math.max(
      col.header.length,
      ...rows.map(row => (row[col.key] ?? '').length),
    );
    return col.maxWidth ? Math.min(col.maxWidth, rawMax) : rawMax;
  });

  const makeRule = (left: string, mid: string, right: string) =>
    `${left}${widths.map(w => '─'.repeat(w + 2)).join(mid)}${right}`;

  const formatRow = (values: string[]) =>
    `│ ${values.map((val, i) => padCell(truncate(val, widths[i]), widths[i], columns[i].align)).join(' │ ')} │`;

  console.log(makeRule('┌', '┬', '┐'));
  console.log(formatRow(columns.map(c => c.header)));
  console.log(makeRule('├', '┼', '┤'));
  for (const row of rows) {
    console.log(formatRow(columns.map(c => row[c.key] ?? '—')));
  }
  console.log(makeRule('└', '┴', '┘'));
  if (footer) console.log(`  ${footer}`);
}

export function makeBar(value: number, max: number, width = 14) {
  if (max <= 0) return '░'.repeat(width);
  const filled = Math.max(1, Math.round((value / max) * width));
  return '█'.repeat(Math.min(width, filled)) + '░'.repeat(Math.max(0, width - filled));
}
