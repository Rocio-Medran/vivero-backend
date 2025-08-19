// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [User],          // agregá acá tus otras entidades
  synchronize: true,         // SOLO en dev. En prod: false + migraciones
  logging: false
});
