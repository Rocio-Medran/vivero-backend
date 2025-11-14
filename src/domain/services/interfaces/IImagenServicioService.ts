import { ImagenServicioDTO } from "../../../app/schemas/imagenServicio.schema";

export interface IImagenServicioService {
    getImagenesByServicioId(servicioId: number): Promise<ImagenServicioDTO[]>;
    createImagenesServicio(files: Express.Multer.File[], servicioId: number): Promise<ImagenServicioDTO[]>;
    removeImagenServicio(id: number): Promise<boolean>;
    updateImagenServicio(id: number, es_principal: boolean, orden?: number): Promise<ImagenServicioDTO>;
    reordenarImagenes(servicioId: number, nuevoOrden: number[]): Promise<ImagenServicioDTO[]>;
}
