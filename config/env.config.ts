import * as dotenv from 'dotenv';

dotenv.config({ override: true });

function requiredEnvEavariable(variable: string): string {
  const variableValue = process.env[variable];

  if (variableValue === undefined) {
    throw new Error(`Variable ${variable} is not set`);
  }
  return variableValue;
}

export const BASE_URL = requiredEnvEavariable('BASE_URL');
export const USER_EMAIL = requiredEnvEavariable('EMAIL');
export const USER_PASSWORD = requiredEnvEavariable('PASSWORD');
