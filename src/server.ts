// src/server.ts
import { createApp } from './app';
import { AppDataSource } from './data-source';
import { env } from './config/env';

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('📦 DB connected');

    const app = createApp();
    app.listen(env.port, () => {
      console.log(`🚀 Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start app:', err);
    process.exit(1);
  }
})();
