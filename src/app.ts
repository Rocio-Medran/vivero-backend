import 'reflect-metadata';                 // SIEMPRE primero
import express from 'express';
import cors from 'cors';
import healthRoutes from './infrastructure/routes/health.routes';
import routes from './infrastructure/routes/index';
import path from 'path';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', healthRoutes);
  app.use('/api', routes);

  app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

  // manejador simple de errores (placeholder)
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
};
