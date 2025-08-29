import { createApp } from './app';
import { AppDataSource } from './config/data-source';
import { env } from './config/env';

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('📦 DB connected');

    const app = createApp();

    app.listen(env.port, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start app:', err);
    process.exit(1);
  }
})();
