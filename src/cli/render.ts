import type { Widget } from '../shared/contracts.js';
import { printKeyValueCard } from './format.js';
import { renderCustomerWidget } from './render-customer.js';
import { renderPortfolioWidget } from './render-portfolio.js';

export function renderWidget(widget: Widget) {
  if (widget.widget === 'dashboard') {
    console.log(`\n==================== ${String(widget.title ?? 'Analyst Briefing')} (${String(widget.scenario ?? '')}) ====================`);
    if (widget.inputs && typeof widget.inputs === 'object') {
      const entries = Object.entries(widget.inputs as Record<string, unknown>)
        .map(([k, v]) => `${k}=${v}`)
        .join(' · ');
      if (entries) console.log(`Parameters: ${entries}`);
    }
    const items = Array.isArray(widget.widgets) ? (widget.widgets as Widget[]) : [];
    for (const item of items) renderWidget(item);
    return;
  }

  if (renderPortfolioWidget(widget)) return;
  if (renderCustomerWidget(widget)) return;

  printKeyValueCard(String(widget.widget), [['Payload', JSON.stringify(widget)]]);
}
