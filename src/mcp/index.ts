import { MCPServer } from 'mcp-use';
import { registerCustomerTools } from './tools/customer.js';
import { registerPortfolioTools } from './tools/portfolio.js';
import { registerSimulatorTools } from './tools/simulators.js';

const server = new MCPServer({ name: 'local-bank-employee-analytics', title: 'LocalBank Analytics AI', version: '0.2.0' });

registerPortfolioTools(server);
registerCustomerTools(server);
export const bankingDashboard = registerSimulatorTools(server);

export default server;
