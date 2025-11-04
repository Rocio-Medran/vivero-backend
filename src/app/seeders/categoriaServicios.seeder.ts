import { DataSource } from "typeorm";
import { CategoriaServicio } from "../../domain/entities/CategoriaServicio";


export async function seedCategoriaServicios(dataSource: DataSource) {
    const repo = dataSource.getRepository(CategoriaServicio);
    const categoriasServicios = [
        { nombre: "Alquiler de Maquinarias",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057846/maquinaria_ugpcbp.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057847/maquinaria2_da0jf0.png" 
        },
        { nombre: "Cámara de Enraizamiento",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057848/camara_u9uwpw.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057849/camara2_q1szcd.png"
        },
        { nombre: "Asesoramiento Personalizado",
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057845/asesoramiento_u8ryuj.png",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1760057844/asesoramiento_2_ortneq.png"
        }
    ];

    for (const cat of categoriasServicios) {
        const existe = await repo.findOne({ where: { nombre: cat.nombre } });
        if (!existe) {
            const nuevaCategoria = repo.create(cat);
            await repo.save(nuevaCategoria);
        }
    
    }
}