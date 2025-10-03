import { DataSource } from "typeorm";
import { Producto } from "../../domain/entities/Producto";
import { Categoria } from "../../domain/entities/Categoria";
import { Temporada } from "../../domain/entities/Temporada";


export async function seedProductos(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const categoriaRepo = dataSource.getRepository(Categoria);
  const temporadaRepo = dataSource.getRepository(Temporada);

  const productos = [
    {
      nombre: "Mandarinas",
      descripcion: "Mandarinas frescas, dulces y fáciles de pelar.",
      informacion_extra: "Las mandarinas son ricas en vitamina C y antioxidantes. Son ideales para consumir frescas, en jugos o en ensaladas.",
      id_categoria: 1,
      id_temporada: 2, // Abril - Mayo - Junio
    },
    {
      nombre: "Uvas",
      descripcion: "Uvas jugosas, ideales para consumir frescas o hacer vino.",
      informacion_extra: "Las uvas son una excelente fuente de vitaminas C y K, así como de antioxidantes. Pueden consumirse frescas, en jugos, mermeladas o para la elaboración de vino.",
      id_categoria: 1,
      id_temporada: 1, // Noviembre - Diciembre
    },
    {
      nombre: "Tunas",
      descripcion: "Fruto de cactus, refrescante y lleno de nutrientes.",
      informacion_extra: "Las tunas son ricas en fibra, vitamina C y antioxidantes. Son ideales para consumir frescas, en jugos o en ensaladas.",
      id_categoria: 1,
      id_temporada: 3, // Diciembre - Enero
    },
    {
      nombre: "Higos",
      descripcion: "Higos dulces y suaves, perfectos para postres y mermeladas.",
      informacion_extra: "Los higos son una excelente fuente de fibra, vitaminas y minerales. Pueden consumirse frescos, secos o en mermeladas y postres.",
      id_categoria: 1,
      id_temporada: 4, // Noviembre - Diciembre - Enero
    },
    {
      nombre: "Vid",
      descripcion: "Planta trepadora que produce uvas, ideal para jardines y viñedos.",
      informacion_extra: "La vid es una planta trepadora que produce uvas, utilizadas para el consumo fresco y la elaboración de vino.",
      id_categoria: 2,
      id_temporada: 5, // Todo el año
    },
    {
      nombre: "Mandarino",
      descripcion: "Árbol frutal que produce mandarinas, fácil de cultivar y mantener.",
      informacion_extra: "El mandarino es un árbol frutal que produce mandarinas, muy apreciadas por su sabor dulce y fácil pelado.",
      id_categoria: 2,
      id_temporada: 5, // Todo el año
    },
    {
      nombre: "Higuera",
      descripcion: "Árbol frutal que produce higos, ideal para climas cálidos.",
      informacion_extra: "La higuera es un árbol frutal que produce higos, frutos dulces y suaves, ideales para consumir frescos o secos.",
      id_categoria: 2,
      id_temporada: 5, // todo el año
    }
  ];

  for (const p of productos) {
    const categoria = await categoriaRepo.findOneBy({ id: p.id_categoria });
    const temporada = await temporadaRepo.findOneBy({ id: p.id_temporada });

    if (!categoria || !temporada) {
      console.log(`Saltando ${p.nombre}: categoría o temporada no encontrada`);
      continue;
    }

    let producto = await productoRepo.findOneBy({ nombre: p.nombre });
    if (!producto) {
      producto = productoRepo.create({
        nombre: p.nombre,
        descripcion: p.descripcion,
        informacion_extra: p.informacion_extra,
        categoria,
        temporada,
      });
      producto = await productoRepo.save(producto);


      console.log(`Producto ${p.nombre} creado`);
    } else {
      console.log(`Producto ${p.nombre} ya existe, se omitió`);
    }
  }
}