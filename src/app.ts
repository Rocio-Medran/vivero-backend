import 'reflect-metadata';                 // SIEMPRE primero
import express from 'express';
import cors from 'cors';
import healthRoutes from './infrastructure/routes/health.routes';
import routes from './infrastructure/routes/index';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api', healthRoutes);
  app.use('/api', routes);

  app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));


  // Manejo centralizado de errores
  app.use(errorHandler);

  return app;
};
