import 'dotenv/config';

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3333),
  jwtSecret: optional('JWT_SECRET', 'dev-secret'),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  github: {
    clientId: optional('GITHUB_CLIENT_ID', ''),
    clientSecret: optional('GITHUB_CLIENT_SECRET', ''),
    callbackUrl: optional('GITHUB_CALLBACK_URL', 'http://localhost:3333/auth/github/callback'),
  },
};
