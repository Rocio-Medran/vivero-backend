import { DataSource } from 'typeorm';
import { Categoria } from '../../domain/entities/Categoria';


export async function seedCategorias(dataSource: DataSource) {
    const repo = dataSource.getRepository(Categoria);
    const categorias = [
        { nombre: "Frutas" },
        { nombre: "Verduras" },
        { nombre: "Plantas" },
    ];

    for (const cat of categorias) {
        const existe = await repo.findOne({ where: { nombre: cat.nombre } });
        if (!existe) {
            const nueva = repo.create(cat);
            await repo.save(nueva);
        }
    }
}