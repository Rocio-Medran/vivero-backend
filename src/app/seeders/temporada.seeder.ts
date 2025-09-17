import { DataSource } from "typeorm";
import { Temporada } from "../../domain/entities/Temporada";


export async function seedTemporadas(dataSource: DataSource) {
    const repo = dataSource.getRepository(Temporada);

    const temporadas = [
        { nombre: "Verano 2025", fecha_desde: new Date("2025-12-01"), fecha_hasta: new Date("2026-02-28") },
        { nombre: "Otoño 2025", fecha_desde: new Date("2025-03-01"), fecha_hasta: new Date("2025-05-31") },
    ];

    for (const temp of temporadas) {
        const existe = await repo.findOne({ where: { nombre: temp.nombre } });
        if (!existe) {
            const nueva = repo.create(temp);
            await repo.save(nueva);
        }
    }

}