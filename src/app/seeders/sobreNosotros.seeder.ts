import { DataSource } from "typeorm";
import { SobreNosotros } from "../../domain/entities/SobreNosotros";

export async function seedSobreNosotros(dataSource: DataSource) {
    const repo = dataSource.getRepository(SobreNosotros);

    // Intentar obtener registro principal (id 1)
    let sn = await repo.findOne({ where: { id: 1 } });
    if (!sn) {
        sn = repo.create({
            nuestro_origen: "El vivero municipal se extiende sobre 13 hectáreas de tierra fértil, dedicadas a la producción y conservación de especies locales. Hasta 1976 funcionó como vivero provincial, y desde entonces forma parte de la municipalidad, impulsando la producción autóctona con una mirada sustentable.",
            produccion_historica: `A lo largo de su historia, el vivero ha cultivado especies frutales locales como la tuna, la higuera y la mandarina, fomentando la producción regional y el valor de las especies autóctonas.
            Entre los años 2000 y 2008 se desarrolló el Proyecto Citrus, donde se construyó la innovadora cámara de enraizamiento, fortaleciendo la capacidad productiva.`,
            nuevas_producciones: `Actualmente, el vivero desarrolla nuevas líneas de producción que incluyen pitaya y la recuperación de vides criollas para la elaboración de vino local a mediano y largo plazo.
            Estos proyectos reflejan el compromiso continuo con la innovación sustentable y la preservación de la identidad regional.
            `,
            imagen_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404769/nuestrosOrigenes_l6kpe4.jpg",
            imagen2_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404770/produccionHistorica1_tmzzio.jpg",
            imagen3_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404770/produccionHistorica2_aaqsx2.jpg",
            imagen4_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404772/produccionHistorica3_r2ou8e.jpg",
            imagen5_url: "https://res.cloudinary.com/djssc9idq/image/upload/v1762404769/nuevasProducciones_d6zxkx.jpg"
        });
        await repo.save(sn);
        console.log("Seed: SobreNosotros creado (id=1)");
    } else {
        console.log("Seed: SobreNosotros ya existe (id=1), se omitió");
    }
}
