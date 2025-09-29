

export interface IImagenProductoService {
    getImagenesByProductoId(productoId: number): Promise<string[]>;
    addImagenProducto(file: Express.Multer.File, productoId: number): Promise<string>;
    removeImagenProducto(id: number): Promise<boolean>;
}