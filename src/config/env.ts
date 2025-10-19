import 'dotenv/config';

const required = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] as const;
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT),
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!
  },
  whatsappNumber: process.env.WHATSAPP_NUMBER || '',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  admin_password: process.env.ADMIN_PASSWORD || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
};
