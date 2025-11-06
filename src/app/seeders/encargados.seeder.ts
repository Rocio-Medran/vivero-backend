import { DataSource } from "typeorm";
import { Encargado } from "../../domain/entities/Encargado";

export async function seedEncargados(dataSource: DataSource) {
  const repo = dataSource.getRepository(Encargado);

  const encargados = [
    {
      nombre: "Ing. Alejandro Martínez",
      foto: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404769/encargado1_ughzfb.jpg",
      descripcion: "Responsable del vivero, coordina producción y servicios."
    },
    {
      nombre: "Ing. Horacio López",
      foto: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404769/encargado2_zgop3i.jpg",
      descripcion: "Gestión administrativa y atención al público."
    }
  ];

  for (const e of encargados) {
    const exists = await repo.findOne({ where: { nombre: e.nombre } });
    if (!exists) {
      const nuevo = repo.create(e);
      await repo.save(nuevo);
      console.log(`Seed: Encargado creado (${e.nombre})`);
    } else {
      console.log(`Seed: Encargado ya existe (${e.nombre}), se omitió`);
    }
  }
}
