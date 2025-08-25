import 'reflect-metadata';                 // SIEMPRE primero
import express from 'express';
import cors from 'cors';
import healthRoutes from './infrastructure/routes/health.routes';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', healthRoutes);

  // manejador simple de errores (placeholder)
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
};
