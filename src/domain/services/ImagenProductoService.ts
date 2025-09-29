import { ImagenProducto } from "../entities/ImagenProducto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IImagenProductoService } from "./interfaces/IImageneProductoService";


export class ImagenProductoService implements IImagenProductoService {
   constructor(private readonly repo: BaseRepository<ImagenProducto>) {}
    getImagenesByProductoId(productoId: number): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    addImagenProducto(file: Express.Multer.File, productoId: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    removeImagenProducto(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}