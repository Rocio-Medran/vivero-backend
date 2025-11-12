import 'reflect-metadata';                 // SIEMPRE primero
import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import healthRoutes from './infrastructure/routes/health.routes';
import routes from './infrastructure/routes/index';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './config/env';


const allowOrigins = [
  env.frontendUrl,
  'http://localhost:4200'
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (Postman, curl) y orígenes incluidos
    if (!origin || allowOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true
};

export const createApp = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());

  app.use('/api', healthRoutes);
  app.use('/api', routes);


  // Manejo centralizado de errores
  app.use(errorHandler);

  return app;
};
