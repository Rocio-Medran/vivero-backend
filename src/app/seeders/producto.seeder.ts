import { DataSource } from "typeorm";
import { Producto } from "../../domain/entities/Producto";
import { Categoria } from "../../domain/entities/Categoria";
import { Temporada } from "../../domain/entities/Temporada";
import { ImagenProducto } from "../../domain/entities/ImagenProducto";
import { no } from "zod/v4/locales";


export async function seedProductos(dataSource: DataSource) {
  const productoRepo = dataSource.getRepository(Producto);
  const categoriaRepo = dataSource.getRepository(Categoria);
  const temporadaRepo = dataSource.getRepository(Temporada);
  const imagenRepo = dataSource.getRepository(ImagenProducto);

  const productos = [
    {
      nombre: "Mandarinas",
      descripcion: "Deliciosas mandarinas frescas, jugosas y llenas de sabor, ideales para consumir directamente o para preparar jugos naturales. Perfectas para disfrutar en cualquier momento del día.",
      informacion_extra: `{
      \"consumo_directo\": \"sin necesidad de lavar, pelar fácilmente.\",
      \"presentacion\": \"sueltas, para que el cliente elija la cantidad que desee.\",
      \"beneficios\": \"ricas en vitamina C y antioxidantes, aportan energía y bienestar.\",
      \"conservacion\": \"mantener en lugar fresco y seco; consumir preferentemente en pocos días para disfrutar de su sabor óptimo.\"
      }`,
      id_categoria: 1,
      id_temporada: 2, // Abril - Mayo - Junio
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057663/cajaMandarinas_cxmwpr.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057663/mandarinas-arbol_bmmkaw.jpg",
      ]
    },
    {
      nombre: "Naranjas",
      descripcion: "Naranjas jugosas y aromáticas, seleccionadas cuidadosamente para ofrecer un sabor dulce y refrescante en cada bocado. Ideales para comer directamente, preparar jugos naturales o añadir un toque cítrico a tus comidas. Su pulpa tierna y llena de jugo convierte cada naranja en una experiencia deliciosa y saludable.",
      informacion_extra: `{
      \"consumo_directo\": \"lavar ligeramente antes de consumir; pelado fácil y sin complicaciones.\",
      \"presentacion\": \"naranjas sueltas, el cliente puede elegir la cantidad que desee.\",
      \"beneficios\": \"excelente fuente de vitamina C, antioxidantes naturales y fibra; ayuda a fortalecer el sistema inmunológico y aporta energía.\",
      \"conservacion\": \"mantener en un lugar fresco y seco; consumir en pocos días para disfrutar de su sabor y frescura óptima.\"
      }`,
      id_categoria: 1,
      id_temporada: 1, // Noviembre - Diciembre
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057663/naranjas-fondoblanco_periet.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057662/naranja-enArbol_k7iw4j.jpg"
      ]
    },
    {
      nombre: "Tunas",
      descripcion: "Tunas frescas, dulces y jugosas, perfectas para disfrutar directamente o incorporarlas en ensaladas y postres. Una opción deliciosa y saludable para consumir en cualquier momento del día.",
      informacion_extra: `{
      \"consumo_directo\": \"pelar y comer fácilmente, sin necesidad de preparación adicional.\",
      \"presentacion\": \"sueltas, para que el cliente elija la cantidad que desee.\",
      \"beneficios\": \"ricas en fibra y antioxidantes, ayudan a la digestión y aportan vitalidad.\",
      \"conservacion\": \"mantener en lugar fresco y seco; consumir preferentemente en pocos días para disfrutar de su sabor óptimo.\"
      }`,
      id_categoria: 1,
      id_temporada: 3, // Diciembre - Enero
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057664/tunas_q4zewf.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057665/tunas-enArbol_uel7hq.jpg"
      ]
    },
    {
      nombre: "Higos",
      descripcion: "Higos frescos, dulces y jugosos, ideales para disfrutar directamente, en postres o acompañando ensaladas y tablas de quesos. Su sabor naturalmente dulce y su textura suave los hacen un manjar listo para cualquier momento del día.",
      informacion_extra: `{
      \"consumo_directo\": \"lavar antes de comer, piel comestible y fácil de disfrutar.\",
      \"presentacion\": \"sueltos, para que el cliente seleccione la cantidad deseada.\",
      \"beneficios\": \"fuente de fibra, vitaminas y minerales esenciales; ayudan a la digestión y aportan energía natural.\",
      \"conservacion\": \"mantener en lugar fresco y seco; consumir preferentemente en pocos días para disfrutar de su textura y sabor óptimos.\"
      }`,
      id_categoria: 1,
      id_temporada: 4, // Noviembre - Diciembre - Enero
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057663/higos-enArbol_ptvtww.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057663/higos_ovo7iz.jpg"
      ]
    },
    {
      nombre: "Vides",
      descripcion: "Hermosas plantas de vid, ideales para quienes desean cultivar sus propias uvas en casa o en el jardín. Resisten bien distintos climas y ofrecen un crecimiento vigoroso, con hojas verdes brillantes y racimos que prometen frutos sabrosos en temporada. Perfectas tanto para decoración como para producción casera de uvas o elaboración de pequeños vinos artesanales.",
      informacion_extra: `{
      \"cuidado\": \"requieren riego regular y buena exposición al sol; aptas para suelos bien drenados.\",
      \"presentacion\": \"plantines en maceta, listos para trasplantar al jardín o al huerto.\",
      \"beneficios\": \"aportan frutos naturales, saludables y ricos en antioxidantes; además, las hojas y ramas pueden ser usadas en jardinería ornamental.\",
      \"conservacion\": \"mantener la planta en un lugar con luz adecuada y proteger de heladas intensas durante los primeros meses; trasplante recomendado en primavera o inicio del verano.\"
      }`,
      id_categoria: 5,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057913/vives_ano7rh.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057912/vives2_tfrhis.jpg"
      ]
    },
    {
      nombre: "Mandarinos Criollos",
      descripcion: "Plantas de mandarino criollo, ideales para quienes quieren cultivar sus propios frutos en casa. De fácil crecimiento y cuidado, estas plantas ofrecen flores aromáticas y frutos dulces y jugosos, perfectos para consumo familiar o como un complemento natural en tu huerta. Aportan un toque de frescura y color a cualquier jardín o balcón.",
      informacion_extra: `{
      \"cuidado\": \"Requiere riego regular, buena exposición al sol y suelo bien drenado.\",
      \"crecimiento\": \"Planta de tamaño mediano, apta para macetas grandes o terreno abierto.\",
      \"producción\": \"Comienza a dar frutos a partir del segundo año si se mantiene en condiciones óptimas.\",
      \"beneficios\": \"Además de su valor ornamental, permite disfrutar de frutas frescas, naturales y libres de pesticidas si se cultiva en casa.\",
      \"consejos\": \"Podar ramas secas o dañadas y proteger de heladas fuertes para asegurar su desarrollo y salud.\"
      }`,
      id_categoria: 5,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057911/mandarino-criollo_mid3fw.png",
      ]
    },
    {
      nombre: "Mandarinos Clementinas",
      descripcion: "Planta de mandarino Clementina de crecimiento compacto y hojas verdes brillantes, ideal para jardines y huertos urbanos. Sus frutos son dulces, aromáticos y de fácil pelado, perfectos para quienes buscan tener mandarinas frescas directamente desde su propio árbol. Esta variedad se distingue por su maduración temprana, lo que permite disfrutar de sus frutos antes que otras variedades.",
      informacion_extra: `{
      \"siembra_cuidado\": \"requiere exposición a pleno sol y riego regular; tolera suelos bien drenados y un pH ligeramente ácido.\",
      \"producción\": \"comienza a dar frutos en los primeros años, con cosechas abundantes de mandarinas pequeñas y dulces.\",
      \"beneficios\": \"al plantar esta variedad, obtienes frutas frescas y naturales, ricas en vitamina C y antioxidantes, cultivadas en tu propio hogar.\",
      \"mantenimiento\": \"poda ligera para mantener forma y salud del árbol; proteger de heladas fuertes.\"
      }`,
      id_categoria: 5,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057910/mandarino-clementinas_cugpdr.jpg",
      ]
    },
    {
      nombre: "Mandarinos Marisol",
      descripcion: "Planta de mandarino Marisol, conocida por su crecimiento compacto y su rápida maduración. Ideal para jardines y huertas familiares, produce frutos aromáticos y dulces desde temprano en la temporada. Esta variedad se destaca por su resistencia y facilidad de cultivo, perfecta tanto para principiantes como para aficionados a la jardinería.",
      informacion_extra: `{
      \"siembra_cuidado\": \"requiere exposición plena al sol, riego moderado y suelo bien drenado; fácil de mantener y podar para obtener frutos saludables.\",
      \"producción\": \"frutos dulces y jugosos, maduración temprana, ideales para consumo directo o para jugos caseros.\",
      \"beneficios\": \"no solo aporta deliciosas frutas, sino que su follaje aporta frescura y estética al jardín; además, al cultivarla en casa, se asegura fruta libre de químicos.\",
      \"presentacion\": \"plantas en maceta lista para trasplante o continuar su crecimiento en el jardín.\"
      }`,
      id_categoria: 5,
      id_temporada: 5, // Todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057909/mandarino-marisol_zaje4f.jpg",
      ]
    },
    {
      nombre: "Higuera",
      descripcion: "Hermosas higueras, de fácil cuidado y crecimiento en maceta o suelo, que ofrecen hojas verdes abundantes y frutos dulces y jugosos cuando están en temporada. Ideales tanto para jardinería ornamental como para quienes desean disfrutar de higos frescos directamente de su propio vivero. Perfectas para quienes buscan un toque natural y productivo en su hogar.",
      informacion_extra: `{
      \"cuidado\": \"requieren riego moderado y buena exposición al sol; crecimiento más óptimo en suelos bien drenados.\",
      \"presentacion\": \"planta joven en maceta, lista para trasplante o cultivo en el jardín.\",
      \"beneficios\": \"además de sus frutos comestibles, aportan sombra y un atractivo visual al espacio; los higos son nutritivos y fuente de fibra y antioxidantes.\",
      \"conservacion\": \"mantener en lugar con buena luz; regar regularmente sin encharcar; trasplantar a tierra firme cuando la planta esté establecida para un crecimiento más saludable.\"
      }`,
      id_categoria: 5,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057914/higuera_q42a8w.jpg",
      ]
    },
    {
      nombre: "Algarrobo",
      descripcion: "El Algarrobo es un árbol resistente y de crecimiento robusto, ideal para embellecer jardines y espacios verdes. Su follaje verde intenso proporciona sombra agradable, y sus flores y vainas aportan un toque natural único. Perfecto para quienes buscan un árbol autóctono con bajo mantenimiento y gran valor ornamental.",
      informacion_extra: `{
      \"cuidados\": \"requiere riego moderado; tolera sequías una vez establecido. Prefiere suelos bien drenados y exposición plena al sol.\",
      \"presentacion\": \"planta joven en maceta, lista para trasplante al jardín o espacio deseado.\",
      \"beneficios\": \"contribuye a la conservación del suelo, atrae polinizadores y ofrece sombra natural; sus vainas pueden ser usadas para alimentación animal.\",
      \"conservacion\": \"mantener en un lugar con buena luz hasta el trasplante; regar regularmente hasta que se adapte al nuevo espacio.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057813/algarrobo1_o6ppca.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057813/algarrobo_al8ssb.jpg"
      ]
    },
    {
      nombre: "Aguaribay",
      descripcion: "Aguaribay, una planta aromática y ornamental de hojas finas y perennes, reconocida por su follaje verde oscuro y su agradable aroma característico. Ideal para jardines, macetas grandes o para crear barreras naturales y espacios verdes con estilo. Su resistencia a diferentes condiciones climáticas la convierte en una excelente opción tanto para principiantes como para jardineros experimentados.",
      informacion_extra: `{
      \"plantación\": \"puede cultivarse en maceta o directamente en el suelo; requiere riego moderado y exposición a sol parcial o pleno.\",
      \"cuidados\": \"resistente a plagas comunes, con poda ocasional para mantener su forma y estimular el crecimiento.\",
      \"beneficios\": \"aporta sombra, mejora la estética del jardín y sus hojas desprenden un aroma agradable que puede ayudar a repeler insectos.\",
      \"conservacion\": \"trasplantar con cuidado si es necesario; mantener tierra húmeda pero no encharcada y proteger de heladas intensas.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057812/aguaribay_sn2ytj.webp",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057812/aguaribay2_al04xh.jpg"
      ]
    },
    {
      nombre: "Quebracho",
      descripcion: "Robusta y resistente, el Quebracho es una planta ideal para aportar sombra y fortaleza a tu jardín o espacio verde. Su follaje denso y su tronco sólido lo convierten en un excelente ejemplar para embellecer áreas abiertas, proteger del viento y atraer fauna local como aves y mariposas.",
      informacion_extra: `{
      \"plantación\": \"prefiere suelos bien drenados y espacios con buena exposición al sol.\",
      \"cuidados\": \"bajo mantenimiento; requiere poda mínima para mantener su forma y salud.\",
      \"beneficios\": \"contribuye a la biodiversidad del jardín, mejora la calidad del aire y proporciona sombra natural.\",
      \"riego\": \"moderado; resistente a periodos cortos de sequía una vez establecido.\",
      \"crecimiento\": \"puede alcanzar gran altura con el tiempo, ideal para jardines amplios o parques.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057810/quebracho_dwkcrh.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057811/quebracho2_aulgn3.jpg"
      ]
    },
    {
      nombre: "Tala",
      descripcion: "El Tala es un árbol resistente y de crecimiento rápido, ideal para jardines y espacios verdes amplios. Sus hojas pequeñas y verdes proporcionan sombra agradable, mientras que sus flores amarillas y fragantes aportan belleza y vida al entorno. Perfecto para quienes buscan una planta ornamental que combine estética y funcionalidad.",
      informacion_extra: `{
      \"cuidado\": \"se adapta a diferentes tipos de suelo y requiere riego moderado; ideal para plantarse en primavera o verano para un mejor desarrollo.\",
      \"presentacion\": \"ejemplares jóvenes en maceta, listos para trasplante según el espacio disponible del cliente.\",
      \"beneficios\": \"contribuye a la mejora del microclima del jardín, aporta sombra y belleza natural; algunas variedades también atraen polinizadores como abejas y mariposas.\",
      \"conservacion\": \"mantener en lugar soleado o con semi-sombra; podar regularmente para favorecer su forma y crecimiento saludable.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057810/tala_su7vnp.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057809/tala2_hi6vqb.jpg"
      ]
    },
    {
      nombre: "Mistol",
      descripcion: "Árbol nativo de gran valor ornamental y ecológico, con follaje verde intenso y flores pequeñas que aportan belleza y vida al jardín. Ideal para quienes buscan una especie autóctona que se adapte fácilmente a distintas condiciones del suelo y clima, aportando sombra y un entorno natural agradable. Su porte elegante y sus frutos característicos lo convierten en una excelente elección para espacios urbanos y rurales.",
      informacion_extra: `{
      \"cuidado\": \"requiere riego moderado y exposición al sol; resistente a la sequía una vez establecido.\",
      \"presentacion\": \"plantín joven listo para trasplante, ideal para jardín o maceta grande.\",
      \"beneficios\": \"favorece la biodiversidad, atrae polinizadores y contribuye al mantenimiento de especies nativas.\",
      \"conservacion\": \"ubicar en lugar con buena luz y suelo bien drenado; podar ocasionalmente para mantener su forma y salud.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057808/mistol_yd7yfq.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057808/mistol2_dijdkc.webp"
      ]
    },
    {
      nombre: "Chañar",
      descripcion: "Planta autóctona de gran resistencia y adaptación, conocida por sus frutos aromáticos y dulces que se utilizan en gastronomía tradicional, infusiones y preparaciones medicinales. Ideal para jardines, huertos o como árbol ornamental, aporta belleza y un toque cultural a tu espacio verde.",
      informacion_extra: `{
      \"cuidado\": \"requiere riego moderado, exposición plena al sol y poda ocasional para mantener su forma y salud.\",
      \"presentacion\": \"se entrega como planta joven lista para trasplante, con raíces y hojas sanas, adecuada para crecer en macetas o directamente en tierra.\",
      \"beneficios\": \"resistente a la sequía, mejora la biodiversidad del jardín y ofrece frutos con propiedades antioxidantes y digestivas.\",
      \"usos\": \"los frutos pueden consumirse secos o preparados en dulces, mieles y tés; la planta también puede funcionar como sombra o protección para otras especies.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057807/cha%C3%B1ar_qno3l7.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057806/cha%C3%B1ar2_hgeooa.webp"
      ]
    },
    {
      nombre: "Aromito",
      descripcion: "Aromito, una planta de hojas delicadas y fragantes, perfecta para embellecer jardines y terrazas. Su aroma agradable y suave es ideal para disfrutar de un ambiente natural y relajante. Esta planta, de crecimiento compacto y elegante, puede acompañar tanto espacios interiores como exteriores, aportando frescura y un toque verde distintivo.",
      informacion_extra: `{
      \"cuidado\": \"requiere riego moderado y exposición a luz indirecta; resistente a condiciones variadas, pero prospera mejor en suelos bien drenados.\",
      \"presentacion\": \"planta en maceta lista para colocar en el jardín, terraza o interior del hogar.\",
      \"beneficios\": \"aromatiza el ambiente de manera natural, contribuye a la sensación de bienestar y mejora la estética de cualquier espacio.\",
      \"conservacion\": \"mantener en lugar con buena ventilación y proteger de heladas; podar regularmente para fomentar un crecimiento saludable.\"
      }`,
      id_categoria: 7,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057806/aromito_t7il6l.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057805/aromito2_rjuzi4.jpg"
      ]
    },
    {
      nombre: "Paraíso",
      descripcion: "Planta ornamental de follaje exuberante y flores vistosas que llenan de color cualquier espacio. Ideal para jardines, patios o balcones, aporta un toque tropical y elegante, además de ser resistente y de fácil cuidado. Perfecta para quienes buscan belleza y vitalidad en su entorno.",
      informacion_extra: `{
      \"cuidado\": \"requiere riego moderado, evitando encharcamientos; prefiere exposición al sol parcial o luz brillante indirecta.\",
      \"presentacion\": \"disponible en macetas individuales, lista para colocar en interiores o exteriores.\",
      \"beneficios\": \"purifica el aire, mejora la estética del espacio y proporciona un ambiente agradable y relajante.\",
      \"conservacion\": \"mantener el sustrato ligeramente húmedo, retirar hojas secas para fomentar un crecimiento saludable.\"
      }`,
      id_categoria: 8,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057869/paraiso_hdsuog.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057869/paraiso2_lczvrm.jpg"
      ]
    },
    {
      nombre: "Lapacho",
      descripcion: "El Lapacho es un árbol majestuoso, conocido por su espectacular floración de color rosa intenso que decora jardines y espacios verdes. Ideal para embellecer tu hogar o jardín, aporta sombra y un toque natural único. Su crecimiento es lento pero firme, convirtiéndose con el tiempo en un verdadero protagonista del paisaje.",
      informacion_extra: `{
      \"cuidado\": \"requiere riego moderado y exposición a pleno sol; resistente a plagas comunes si se mantiene en condiciones adecuadas.\",
      \"presentacion\": \"plantas jóvenes en maceta listas para trasplante o jardinería; tamaño indicado para facilitar su adaptación.\",
      \"beneficios\": \"además de su belleza ornamental, contribuye a la biodiversidad local y a la purificación del aire.\",
      \"conservacion\": \"mantener en sustrato húmedo y bien drenado hasta su ubicación definitiva; proteger de heladas en sus primeros meses si se encuentra en zonas frías.\"
      }`,
      id_categoria: 8,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057868/lapacho_nlgwwv.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057867/lapacho2_fge67r.webp"
      ]
    },
    {
      nombre: "Cedrón",
      descripcion: "Aromática planta medicinal de hojas finas y fragantes, conocida por su delicado sabor cítrico y sus propiedades relajantes. Ideal para infusionar en tés que ayudan a calmar los nervios, favorecer la digestión y aportar un momento de bienestar en cualquier momento del día.",
      informacion_extra: `{
      \"usos\": \"hojas frescas o secas para preparar infusiones, ideal para disfrutar sola o combinada con otras hierbas aromáticas.\",
      \"presentacion\": \"maceta pequeña lista para plantar en jardín o interior, o ramillete de hojas secas para infusionar.\",
      \"beneficios\": \"propiedades digestivas y relajantes; contribuye al bienestar general, reduce la tensión y ayuda a inducir un sueño reparador.\",
      \"conservacion\": \"mantener en lugar fresco y seco; si es en maceta, regar moderadamente y colocar en lugar con buena luz indirecta.\"
      }`,
      id_categoria: 4,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057767/cedron_qq0hsd.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057766/cedron2_goa4x7.jpg"
      ]
    },
    {
      nombre: "Lavanda",
      descripcion: "Aromática y delicada, la lavanda es una planta ideal para jardines y macetas, que destaca por su color violeta intenso y su agradable fragancia. Perfecta para dar un toque decorativo, crear un ambiente relajante o incluso para usos culinarios y aromaterapia.",
      informacion_extra: `{
      \"cuidados\": \"requiere exposición a sol pleno y riego moderado; se adapta bien a suelos bien drenados.\",
      \"presentacion\": \"plantas en maceta listas para colocar en el jardín, balcón o interiores.\",
      \"beneficios\": \"conocida por sus propiedades relajantes y calmantes; sus flores se pueden usar para infusiones, aceites esenciales y decoraciones aromáticas.\",
      \"conservacion\": \"mantener en un lugar luminoso; regar con moderación para evitar encharcamientos y prolongar su vida y floración.\"
      }`,
      id_categoria: 4,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057766/lavanda_vx3eec.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057765/lavanda2_yjhfsr.avif"
      ]
    },
    {
      nombre: "Romero",
      descripcion: "El romero es una planta aromática de hojas perennes, conocida por su intenso aroma y sabor característico. Ideal para cocinar, condimentar carnes, guisos, ensaladas y aceites, aporta un toque fresco y natural a tus preparaciones. Además, su follaje decorativo lo convierte en un excelente elemento para jardines y macetas.",
      informacion_extra: `{
      \"usos\": \"apto para consumo en cocina y para embellecer espacios verdes.\",
      \"presentacion\": \"plantas en maceta, listas para ubicar en jardín, balcón o cocina.\",
      \"beneficios\": \"contribuye a la digestión, posee propiedades antioxidantes y aromáticas que mejoran el ambiente.\",
      \"conservacion\": \"mantener en lugar con buena luz y ventilación; regar moderadamente evitando encharcamientos.\"
      }`,
      id_categoria: 4,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057765/romero_ucy6nz.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057764/romero2_ras6f7.jpg"
      ]
    },
    {
      nombre: "Sertal",
      descripcion: "El Sertal es una planta resistente y de crecimiento elegante, ideal para jardines y espacios verdes que buscan un toque de distinción. Sus hojas verdes intensas y su porte compacto la hacen perfecta tanto para macetas como para sembrarla directamente en el suelo. Además, aporta armonía visual y contribuye a la biodiversidad del jardín.",
      informacion_extra: `{
      \"cuidados\": \"requiere riego moderado y luz indirecta; se adapta bien a distintos tipos de suelo siempre que tengan buen drenaje.\",
      \"presentacion\": \"disponible en maceta, lista para plantar o decorar cualquier espacio exterior o interior.\",
      \"beneficios\": \"contribuye a mejorar la calidad del aire, embellece el entorno y es ideal para quienes buscan una planta de bajo mantenimiento.\",
      \"conservacion\": \"ubicar en lugar con buena circulación de aire; mantener el sustrato ligeramente húmedo. Con el cuidado adecuado, crece saludable y se mantiene frondosa durante todo el año.\"
      }`,
      id_categoria: 4,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057764/sertal_dubnwy.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057763/sertal2_z81wle.jpg"
      ]
    },
    {
      nombre: "Rosas",
      descripcion: "Rosas frescas y vibrantes, disponibles en una variedad de colores y tamaños, perfectas para expresar sentimientos, decorar espacios o regalar en ocasiones especiales. Cada rosa es seleccionada cuidadosamente para garantizar su frescura y belleza, ofreciendo un toque de elegancia y sofisticación en cada ramo o arreglo floral.",
      informacion_extra: `{
      \"cuidado\": \"mantener en agua fresca, cambiar el agua cada dos días y recortar los tallos para prolongar su vida.\",
      \"presentacion\": \"disponibles en ramos, arreglos o sueltas, adaptándose a las necesidades del cliente.\",
      \"beneficios\": \"aportan belleza, aroma y un toque especial a cualquier ocasión; símbolo universal de amor y aprecio.\",
      \"conservacion\": \"evitar la exposición directa al sol y a corrientes de aire para mantener su frescura por más tiempo.\"
      }`,
      id_categoria: 6,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057894/rosas_grftrn.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057893/rosa-capullo_r3gdwb.jpg"
      ]
    },
    {
      nombre: "Santa Rita",
      descripcion: "La Santa Rita es una planta ornamental de flores vibrantes y hojas verdes brillantes, ideal para jardines y espacios interiores. Su belleza y resistencia la convierten en una opción popular para quienes buscan añadir un toque de color y frescura a su entorno.",
      informacion_extra: `{
      \"cuidado\": \"mantener en agua fresca, cambiar el agua cada dos días y recortar los tallos para prolongar su vida.\",
      \"presentacion\": \"disponibles en ramos, arreglos o sueltas, adaptándose a las necesidades del cliente.\",
      \"beneficios\": \"aportan belleza, aroma y un toque especial a cualquier ocasión; símbolo universal de amor y aprecio.\",
      \"conservacion\": \"evitar la exposición directa al sol y a corrientes de aire para mantener su frescura por más tiempo.\"
      }`,
      id_categoria: 6,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057892/santaRita_jn6pdd.png",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057891/SantaRita2_v6nrue.jpg"
      ]
    },
    {
      nombre: "Hibiscus",
      descripcion: "El hibisco es una planta ornamental conocida por sus grandes y coloridas flores, que pueden ser rojas, rosas, amarillas o blancas. Es ideal para jardines y patios, y su floración puede atraer colibríes y mariposas.",
      informacion_extra: `{
      \"cuidado\": \"mantener en agua fresca, cambiar el agua cada dos días y recortar los tallos para prolongar su vida.\",
      \"presentacion\": \"disponibles en ramos, arreglos o sueltas, adaptándose a las necesidades del cliente.\",
      \"beneficios\": \"aportan belleza, aroma y un toque especial a cualquier ocasión; símbolo universal de amor y aprecio.\",
      \"conservacion\": \"evitar la exposición directa al sol y a corrientes de aire para mantener su frescura por más tiempo.\"
      }`,
      id_categoria: 6,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057890/hibiscus_ox7fwy.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057890/hibiscus_2_o7gvjl.jpg"
      ]
    },
    {
      nombre: "Durantas",
      descripcion: "Las durantas son plantas ornamentales de flores pequeñas y coloridas, que suelen atraer mariposas y colibríes. Son ideales para jardines y espacios exteriores, y su cuidado es relativamente sencillo.",
      informacion_extra: `{
      \"cuidado\": \"mantener en agua fresca, cambiar el agua cada dos días y recortar los tallos para prolongar su vida.\",
      \"presentacion\": \"disponibles en ramos, arreglos o sueltas, adaptándose a las necesidades del cliente.\",
      \"beneficios\": \"aportan belleza, aroma y un toque especial a cualquier ocasión; símbolo universal de amor y aprecio.\",
      \"conservacion\": \"evitar la exposición directa al sol y a corrientes de aire para mantener su frescura por más tiempo.\"
      }`,
      id_categoria: 6,
      id_temporada: 5, // todo el año
      imagenes: [
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057889/durantas_ka3ocl.jpg",
        "https://res.cloudinary.com/djssc9idq/image/upload/v1760057889/durantas2_go1ris.jpg"
      ]
    },
  ];

  for (const p of productos) {
    const categoria = await categoriaRepo.findOneBy({ id: p.id_categoria });
    const temporada = await temporadaRepo.findOneBy({ id: p.id_temporada });

    if (!categoria || !temporada) {
      console.log(`Saltando ${p.nombre}: categoría o temporada no encontrada`);
      continue;
    }

    let producto = await productoRepo.findOneBy({ nombre: p.nombre });
    if (!producto) {
      producto = productoRepo.create({
        nombre: p.nombre,
        descripcion: p.descripcion,
        informacion_extra: p.informacion_extra,
        categoria,
        temporada,
      });
      producto = await productoRepo.save(producto);

      const imagenes = p.imagenes.map((url, index) =>
        imagenRepo.create({
          url: url ?? "",
          es_principal: index === 0, // primera imagen principal
          orden: index + 1,
          producto: producto!,
        })
      );

      await imagenRepo.save(imagenes);

      console.log(`Producto ${p.nombre} creado con ${imagenes.length} imágenes`);
    } else {
      console.log(`Producto ${p.nombre} ya existe, se omitió`);
    }
  }
}