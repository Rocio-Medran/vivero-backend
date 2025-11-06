import { DataSource } from "typeorm";
import { Servicio } from "../../domain/entities/Servicio";
import { CategoriaServicio } from "../../domain/entities/CategoriaServicio";
import { ImagenServicio } from "../../domain/entities/ImagenServicio";


export async function seedServicios(dataSource: DataSource) {
    const servicioRepo = dataSource.getRepository(Servicio);
    const categoriaRepo = dataSource.getRepository(CategoriaServicio);
    const imagenRepo = dataSource.getRepository(ImagenServicio);

    const servicios = [
        {
            nombre: "Alquiler de Maquinarias",
            descripcion: "Servicio de alquiler de maquinarias agrícolas con coordinación flexible y tarifas reguladas por la municipalidad. Ideal para productores que necesiten realizar trabajos específicos en sus campos.",
            informacion_extra: `{"• El valor por hora se determina según la ordenanza municipal vigente, tomando como referencia el precio del gasoil del día.\n• No hay mínimo ni máximo de horas de alquiler: puede ser desde 1 hora hasta varios días, según disponibilidad y necesidad del productor.\n• El pago se realiza previamente en la Municipalidad de Quilino por las horas solicitadas.\n• Una vez realizado el pago, el productor debe presentarse en el vivero para coordinar fecha y horario del servicio.\n• Los trabajos se realizan principalmente por la tarde, fuera del horario operativo interno del vivero.\n• Horario de atención administrativa en el vivero: 07:30 a 13:30 hs."
            }`,
            id_categoria: 1,
            imagenes: [
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288068/maquinaria8_shwlbt.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288066/maquinaria5_xrlc5a.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288065/maquinaria1_vmfst4.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288065/maquinaria2_mozxlv.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288066/maquinaria3_ovnr0t.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288066/maquinaria4_pcdjzd.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288066/maquinaria6_lsfh4d.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288067/maquinaria7_nmv76l.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288243/Sinfin-para-hacer-pozos_jydpqn.jpg"
            ]
        },
        {
            nombre: "Cámara de Enraizamiento",
            descripcion: "Servicio de enraizamiento de plantas con técnicas avanzadas y personal especializado. Ideal para viveristas que buscan mejorar la calidad de sus plantas.",
            informacion_extra: `• El proceso de enraizamiento se realiza en condiciones controladas para asegurar el éxito de las plantas.\n• Se utilizan hormonas de enraizamiento y sustratos especiales para optimizar el crecimiento.\n• Los tiempos de enraizamiento pueden variar según la especie y las condiciones ambientales.\n• Se recomienda realizar un seguimiento periódico del estado de las plantas durante el proceso.`,
            id_categoria: 2,
            imagenes: [
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288979/enraizamiento1_yewfdf.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762288980/enraizamiento2_z9kxpm.jpg",

            ]
        },
        {
            nombre: "Asesoramiento Personalizado",
            descripcion: "Servicio de asesoramiento técnico agronómico personalizado para productores y viveristas. Ofrecemos recomendaciones basadas en las mejores prácticas agrícolas y las últimas investigaciones del sector.",
            informacion_extra: `• El asesoramiento puede abarcar desde la selección de cultivos hasta el manejo integrado de plagas.\n• Se realizan visitas técnicas al campo para evaluar las condiciones y necesidades específicas.\n• Se brindan informes detallados con recomendaciones prácticas y estrategias de mejora.\n• El servicio está a cargo de profesionales con amplia experiencia en agronomía y producción agrícola.`,
            id_categoria: 3,
            imagenes: [
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762289169/asesoramiento2_hgu4du.jpg",
                "https://res.cloudinary.com/djssc9idq/image/upload/v1762289168/asesoramiento1_rqgnxh.jpg",
            ]
        }
    ]

    for (const s of servicios) {
        const categoria = await categoriaRepo.findOneBy({ id: s.id_categoria });

        if (!categoria) {
            console.log(`Saltando ${s.nombre}: categoría no encontrada`);
            continue;
        }

        let servicio = await servicioRepo.findOneBy({ nombre: s.nombre });
        if (!servicio) {
            servicio = servicioRepo.create({
                nombre: s.nombre,
                descripcion: s.descripcion,
                informacion_extra: s.informacion_extra,
                categoria
            });

            servicio = await servicioRepo.save(servicio);

            const imagenes = s.imagenes.map((url, index) =>
                imagenRepo.create({
                    url: url ?? "",
                    es_principal: index === 0, // primera imagen principal
                    orden: index + 1,
                    servicio: servicio!,
                })
            );

            await imagenRepo.save(imagenes);

            console.log(`Servicio ${s.nombre} creado con ${imagenes.length} imágenes`);
        } else {
            console.log(`Servicio ${s.nombre} ya existe, se omitió`);
        }

    }
}