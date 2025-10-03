import { DataSource } from "typeorm";
import { Temporada } from "../../domain/entities/Temporada";


export async function seedTemporadas(dataSource: DataSource) {
    const repo = dataSource.getRepository(Temporada);

    const temporadas = [
        { nombre: "Noviembre - Diciembre", fecha_desde: 11, fecha_hasta: 12 },
        { nombre: "Abril - Mayo - Junio", fecha_desde: 4, fecha_hasta: 6 },
        { nombre: "Diciembre - Enero", fecha_desde: 12, fecha_hasta: 1 },
        { nombre: "Noviembre - Diciembre - Enero", fecha_desde: 11, fecha_hasta: 1 },
        { nombre: "Todo el año", fecha_desde: 1, fecha_hasta: 12 },
    ];

    for (const temp of temporadas) {
        const existe = await repo.findOne({ where: { nombre: temp.nombre } });
        if (!existe) {
            const nueva = repo.create(temp);
            await repo.save(nueva);
        }
    }

}