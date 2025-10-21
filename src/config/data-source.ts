import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { Producto } from '../domain/entities/Producto';
import { Categoria } from '../domain/entities/Categoria';
import { Temporada } from '../domain/entities/Temporada';
import { Servicio } from '../domain/entities/Servicio';
import { CategoriaServicio } from '../domain/entities/CategoriaServicio';
import { ImagenProducto } from '../domain/entities/ImagenProducto';
import { ImagenServicio } from '../domain/entities/ImagenServicio';
import { Admin } from '../domain/entities/Admin';
import { RefreshToken } from '../domain/entities/RefreshToken';
import { SobreNosotros } from '../domain/entities/SobreNosotros';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  entities: [Producto, Categoria, Temporada, Servicio, CategoriaServicio, ImagenProducto, ImagenServicio, Admin, RefreshToken, SobreNosotros],
  synchronize: true,
  logging: false
});
