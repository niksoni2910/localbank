import { z } from 'zod';
import { verifyActorToken } from '../auth.js';

export const resultSchema = z.object({ data: z.record(z.string(), z.any()) });
export const segmentEnum = z.enum(['Affluent', 'Salaried', 'Self-Employed', 'Young Professional', 'Retiree']);
export const kycEnum = z.enum(['Verified', 'Pending Review', 'Expired']);
export const customerIdParam = z.string().optional().describe('Customer ID (e.g. CUST-1042) or customer name. Defaults to CUST-1042 if omitted.');
export const branchIdParam = z.string().optional().describe('Optional Branch ID (e.g. BR-BLR-01, BR-MUM-01), branch name, or city.');
export const withAuth = <T extends z.ZodRawShape>(shape: T) => z.object({ ...shape, _auth: z.string().optional() });

export function verifyAuthArg(args: { _auth?: unknown }) {
  if (typeof args._auth === 'string' && args._auth) {
    verifyActorToken(args._auth);
  }
}
