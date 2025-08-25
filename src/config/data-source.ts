import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { Producto } from '../domain/entities/Producto';
import { Categoria } from '../domain/entities/Categoria';
import { Temporada } from '../domain/entities/Temporada';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [Producto, Categoria, Temporada],
  synchronize: true,
  logging: false
});
