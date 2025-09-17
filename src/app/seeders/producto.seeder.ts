import { DataSource } from "typeorm";
import { Producto } from "../../domain/entities/Producto";
import { Categoria } from "../../domain/entities/Categoria";
import { Temporada } from "../../domain/entities/Temporada";


export async function seedProductos(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const categoriaRepo = dataSource.getRepository(Categoria);
  const temporadaRepo = dataSource.getRepository(Temporada);

  const categoria = await categoriaRepo.findOne({ where: { nombre: "Frutas" } });
  const temporada = await temporadaRepo.findOne({ where: { nombre: "Verano 2025" } });

  if (categoria && temporada) {
    const producto = {
      nombre: "Mandarina",
      descripcion: "Fruta cítrica dulce y jugosa",
      imagen_url: "mandarina.jpg",
      categoria,
      temporada
    };

    const existe = await productoRepo.findOne({ where: { nombre: producto.nombre } });
    if (!existe) {
      const nuevo = productoRepo.create(producto);
      await productoRepo.save(nuevo);
    }
  }
}