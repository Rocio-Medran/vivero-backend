import { DataSource } from "typeorm";
import { Contacto } from "../../domain/entities/Contacto";

export async function seedContacto(dataSource: DataSource) {
  const repo = dataSource.getRepository(Contacto);
  let c = await repo.findOne({ where: { id: 1 } });
  if (!c) {
    c = repo.create({
      horario_atencion: "07:30 a 13:30",
      email: "contacto@viveroquilino.gob.ar",
      telefono: "+54 9 3516 85-4031",
      whatsapp: "+54 9 3515 45-7821"
    });
    await repo.save(c);
    console.log("Seed: Contacto creado (id=1)");
  } else {
    console.log("Seed: Contacto ya existe (id=1), se omitió");
  }
}
