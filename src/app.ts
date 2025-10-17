import 'reflect-metadata';                 // SIEMPRE primero
import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import healthRoutes from './infrastructure/routes/health.routes';
import routes from './infrastructure/routes/index';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './config/env';


const allowOrigins = [
  'http://localhost:4200', // Angular dev server
  env.frontendUrl || '', // URL del frontend desde variables de entorno
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como las de Postman o curl)
    if (!origin || !allowOrigins.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('No permitido por CORS')); // Rechazar origenes no permitidos
    }
  },
  credentials: true, // Permitir cookies
}

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
