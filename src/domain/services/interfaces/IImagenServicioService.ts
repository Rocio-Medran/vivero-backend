import { ImagenServicioDTO } from "../../../app/schemas/imagenServicio.schema";

export interface IImagenServicioService {
    getImagenesByServicioId(servicioId: number): Promise<ImagenServicioDTO[]>;
    createImagenesServicio(files: Express.Multer.File[], servicioId: number): Promise<ImagenServicioDTO[]>;
    removeImagenServicio(id: number): Promise<boolean>;
}
