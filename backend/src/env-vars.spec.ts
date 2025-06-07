import { describe, it, expect } from '@jest/globals';
import 'dotenv/config';

const requiredEnvVars = [
  'TELEGRAM_BOT_TOKEN',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'OPENAI_API_KEY',
  'API_URL',
  'FRONTEND_URL',
  'STRIPE_SECRET_KEY',
  // 'STRIPE_WEBHOOK_SECRET',
  // 'SMTP_HOST',
  // 'SMTP_PORT',
  // 'SMTP_USER',
  // 'SMTP_PASSWORD',
  // 'SMTP_FROM',
  'TELEGRAM_BOT_PASSWORD',
  'TELEGRAM_ADMIN_CHAT_ID',
];

describe('Environment variables', () => {
  for (const envVar of requiredEnvVars) {
    it(`should have ${envVar} defined`, () => {
      expect(process.env[envVar]).toBeDefined();
      if (process.env[envVar]) {
        expect(process.env[envVar]).not.toEqual('');
      }
    });
  }
});
