import { ImagenProductoDTO } from "../../../app/schemas/imagenProducto.schema";


export interface IImagenProductoService {
    getImagenesByProductoId(productoId: number): Promise< ImagenProductoDTO[] >;
    createImagenProducto(file: Express.Multer.File, productoId: number): Promise<ImagenProductoDTO>;
    createImagenesProducto(files: Express.Multer.File[], productoId: number): Promise<ImagenProductoDTO[]>;
    removeImagenProducto(id: number): Promise<boolean>;
}