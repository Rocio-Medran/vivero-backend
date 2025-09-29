import { DataSource } from "typeorm";
import { Temporada } from "../../domain/entities/Temporada";


export async function seedTemporadas(dataSource: DataSource) {
    const repo = dataSource.getRepository(Temporada);

    const temporadas = [
        { nombre: "Noviembre - Diciembre", fecha_desde: new Date("11-01"), fecha_hasta: new Date("12-31") },
        { nombre: "Abril - Mayo - Junio", fecha_desde: new Date("04-01"), fecha_hasta: new Date("06-30") },
        { nombre: "Diciembre - Enero", fecha_desde: new Date("12-01"), fecha_hasta: new Date("01-31") },
        { nombre: "Noviembre - Diciembre - Enero", fecha_desde: new Date("11-01"), fecha_hasta: new Date("01-31") },
        { nombre: "Todo el año", fecha_desde: new Date("01-01"), fecha_hasta: new Date("12-31") },
    ];

    for (const temp of temporadas) {
        const existe = await repo.findOne({ where: { nombre: temp.nombre } });
        if (!existe) {
            const nueva = repo.create(temp);
            await repo.save(nueva);
        }
    }

}