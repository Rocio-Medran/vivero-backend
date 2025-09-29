import { DataSource } from "typeorm";
import { Producto } from "../../domain/entities/Producto";
import { Categoria } from "../../domain/entities/Categoria";
import { Temporada } from "../../domain/entities/Temporada";
import { ImagenProducto } from "../../domain/entities/ImagenProducto";


export async function seedProductos(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const categoriaRepo = dataSource.getRepository(Categoria);
  const temporadaRepo = dataSource.getRepository(Temporada);
  const imagenRepo = dataSource.getRepository(ImagenProducto);

  const productos = [
    {
      nombre: "Mandarinas",
      descripcion: "Mandarinas frescas, dulces y fáciles de pelar.",
      esta_activo: true,
      id_categoria: 1,
      id_temporada: 2, // Abril - Mayo - Junio
      imagenes: [
        "https://picsum.photos/300/200?random=21",
        "https://picsum.photos/300/200?random=22",
      ],
    },
    {
      nombre: "Uvas",
      descripcion: "Uvas jugosas, ideales para consumir frescas o hacer vino.",
      esta_activo: true,
      id_categoria: 1,
      id_temporada: 1, // Noviembre - Diciembre
      imagenes: [
        "https://picsum.photos/300/200?random=23",
        "https://picsum.photos/300/200?random=24",
      ],
    },
    {
      nombre: "Tunas",
      descripcion: "Fruto de cactus, refrescante y lleno de nutrientes.",
      esta_activo: true,
      id_categoria: 1,
      id_temporada: 3, // Diciembre - Enero
      imagenes: [
        "https://picsum.photos/300/200?random=25",
        "https://picsum.photos/300/200?random=26",
      ],
    },
    {
      nombre: "Higos",
      descripcion: "Higos dulces y suaves, perfectos para postres y mermeladas.",
      esta_activo: true,
      id_categoria: 1,
      id_temporada: 4, // Noviembre - Diciembre - Enero
      imagenes: [
        "https://picsum.photos/300/200?random=29",
        "https://picsum.photos/300/200?random=30",
      ],
    },
    {
      nombre: "Vid",
      descripcion: "Planta trepadora que produce uvas, ideal para jardines y viñedos.",
      esta_activo: true,
      id_categoria: 2,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://picsum.photos/300/200?random=31",
        "https://picsum.photos/300/200?random=32",
      ],
    },
    {
      nombre: "Mandarino",
      descripcion: "Árbol frutal que produce mandarinas, fácil de cultivar y mantener.",
      esta_activo: true,
      id_categoria: 2,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://picsum.photos/300/200?random=33",
        "https://picsum.photos/300/200?random=34",
      ],
    },
    {
      nombre: "Higuera",
      descripcion: "Árbol frutal que produce higos, ideal para climas cálidos.",
      esta_activo: true,
      id_categoria: 2,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://picsum.photos/300/200?random=35",
        "https://picsum.photos/300/200?random=36",
      ],
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
        esta_activo: p.esta_activo,
        categoria,
        temporada,
      });
      producto = await productoRepo.save(producto);

      const imagenes = p.imagenes.map((url, index) =>
        imagenRepo.create({
          url: url ?? "",
          es_principal: index === 0, // primera imagen principal
          orden: index + 1,
          producto: producto!,
        })
      );

      await imagenRepo.save(imagenes);

      console.log(`Producto ${p.nombre} creado con ${imagenes.length} imágenes`);
    } else {
      console.log(`Producto ${p.nombre} ya existe, se omitió`);
    }
  }
}