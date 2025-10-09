import { AppDataSource } from "../../config/data-source";
import { seedAdmin } from "./admin.seeder";
import { seedCategorias } from "./categoria.seeder";
import { seedProductos } from "./producto.seeder";
import { seedTemporadas } from "./temporada.seeder";


async function runSeeders() {
  await AppDataSource.initialize();

  await seedAdmin(AppDataSource);
  await seedCategorias(AppDataSource);
  await seedTemporadas(AppDataSource);
  await seedProductos(AppDataSource);

  await AppDataSource.destroy();
  console.log("Seeders ejecutados correctamente");
}

runSeeders().catch((err) => {
  console.error("Error al ejecutar seeders:", err);
});