import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './config/env';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { Category } from './entities/Category';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [User, Product, Category],
  synchronize: true,
  logging: false
});
