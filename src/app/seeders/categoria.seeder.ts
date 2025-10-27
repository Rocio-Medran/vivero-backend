import { DataSource } from 'typeorm';
import { Categoria } from '../../domain/entities/Categoria';

export async function seedCategorias(dataSource: DataSource) {
    const repo = dataSource.getRepository(Categoria);
    const categorias = [
        { 
            nombre: "Frutas", 
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057852/frutas_ol2n0w.png", 
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057849/frutas2_rjxozx.png" 
        },
        { 
            nombre: "Plantas",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057852/plantas_t1lo5d.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/plantas2_fooeg7.png" 
        },
        { 
            nombre: "Arboles",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/arboles_p3gkgi.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057847/arboles2_yb8xs1.png" 
        },
        { 
            nombre: "Aromaticas",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057843/aromaticas_gyrfqp.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057844/aromaticas2_l5rwxd.png" 
        },
        {
            nombre: "Frutales",
            tipo: 'Plantas',
            id_padre: 2,
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057852/plantas_t1lo5d.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/plantas2_fooeg7.png"
        },
        {
            nombre: "Ornamentales",
            tipo: 'Plantas',
            id_padre: 2,
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057852/plantas_t1lo5d.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/plantas2_fooeg7.png"
        },
        { 
            nombre: "Autoctonos",
            tipo: 'Arboles',
            id_padre: 3,
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/arboles_p3gkgi.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057847/arboles2_yb8xs1.png"
        },
        { 
            nombre: "Exoticos",
            tipo: 'Arboles',
            id_padre: 3,
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057850/arboles_p3gkgi.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057847/arboles2_yb8xs1.png"
        },
    ];

    for (const cat of categorias) {
        const existe = await repo.findOne({ where: { nombre: cat.nombre } });
        if (!existe) {
            const nueva = repo.create(cat);
            await repo.save(nueva);
        }
    }
}