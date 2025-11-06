import { AppDataSource } from "../../config/data-source";
import { seedAdmin } from "./admin.seeder";
import { seedCategorias } from "./categoria.seeder";
import { seedCategoriaServicios } from "./categoriaServicios.seeder";
import { seedProductos } from "./producto.seeder";
import { seedServicios } from "./servicio.seeder";
import { seedTemporadas } from "./temporada.seeder";
import { seedSobreNosotros } from "./sobreNosotros.seeder";
import { seedContacto } from "./contacto.seeder";
import { seedEncargados } from "./encargados.seeder";


async function runSeeders() {
  await AppDataSource.initialize();

  await seedAdmin(AppDataSource);
  await seedCategorias(AppDataSource);
  await seedTemporadas(AppDataSource);
  await seedProductos(AppDataSource);
  await seedCategoriaServicios(AppDataSource);
  await seedServicios(AppDataSource);
  await seedSobreNosotros(AppDataSource);
  await seedContacto(AppDataSource);
  await seedEncargados(AppDataSource);

  await AppDataSource.destroy();
  console.log("Seeders ejecutados correctamente");
}

runSeeders().catch((err) => {
  console.error("Error al ejecutar seeders:", err);
});