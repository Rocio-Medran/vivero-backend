import { createApp } from './app';
import { AppDataSource } from './config/data-source';
import { env } from './config/env';
import healthRoutes from "./infrastructure/routes/health.routes";
import productRoutes from "./infrastructure/routes/health.routes";
import categoryRoutes from "./infrastructure/routes/health.routes";

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('📦 DB connected');

    const app = createApp();

    app.use("/api", healthRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);

    app.listen(env.port, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start app:', err);
    process.exit(1);
  }
})();
