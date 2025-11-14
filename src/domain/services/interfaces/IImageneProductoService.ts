import { ImagenProductoDTO } from "../../../app/schemas/imagenProducto.schema";


export interface IImagenProductoService {
    getImagenesByProductoId(productoId: number): Promise< ImagenProductoDTO[] >;
    createImagenesProducto(files: Express.Multer.File[], productoId: number): Promise<ImagenProductoDTO[]>;
    removeImagenProducto(id: number): Promise<boolean>;
    updateImagenProducto(id: number, es_principal: boolean, orden?: number): Promise<ImagenProductoDTO>;
    reordenarImagenes(productoId: number, nuevoOrden: number[]): Promise<ImagenProductoDTO[]>;
}