import { ImagenProducto } from "../entities/ImagenProducto";
import { Producto } from "../entities/Producto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IImagenProductoService } from "./interfaces/IImageneProductoService";
import { cloudinaryDelete } from "../../utils/cloudinaryDelete";
import { toImagenProductoDTOs } from "../../app/mappings/imagenProducto.mapping";
import { ImagenProductoDTO } from "../../app/schemas/imagenProducto.schema";
import { ConflictError, NotFoundError, ValidationError } from "../../app/errors/CustomErrors";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload";


export class ImagenProductoService implements IImagenProductoService {
    constructor(private readonly repo: BaseRepository<ImagenProducto>) { }

    productoRepo = new BaseRepository(Producto);

    async getImagenesByProductoId(productoId: number): Promise<ImagenProductoDTO[]> {
        const imagenes = await this.repo.find({ producto: { id: productoId } });
        return toImagenProductoDTOs(imagenes);
    }

    async createImagenesProducto(files: Express.Multer.File[], productoId: number): Promise<ImagenProductoDTO[]> {
        const producto = await this.productoRepo.findOneBy({ id: productoId });
        if (!producto) throw new NotFoundError("Producto no encontrado");
        if (!files || files.length === 0) return [];

        // Validar tipos y tamaños de archivos
        const formatosPermitidos = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const maxSize = 5 * 1024 * 1024;
        for (const file of files) {
            if (!formatosPermitidos.includes(file.mimetype)) {
                throw new ValidationError(`Tipo de archivo no permitido: ${file.originalname}`);
            }
            if (file.size > maxSize) {
                throw new ValidationError(`El archivo ${file.originalname} excede el tamaño máximo permitido de 5MB.`);
            }
        }

        const existentes = await this.repo.find({ producto: { id: productoId } });
        const count = existentes.length;

        let principalSet = existentes.some(img => img.es_principal);

        const saved: ImagenProducto[] = [];
        for (const [index, file] of files.entries()) {
            const esPrincipal = !principalSet && index === 0;
            if (esPrincipal) principalSet = true;
            const uploadResult = await uploadBufferToCloudinary(file.buffer, 'productos');
            const url = uploadResult.secure_url || uploadResult.url;
            const img: ImagenProducto = {
                url,
                public_id: uploadResult.public_id,
                es_principal: esPrincipal,
                orden: count + index + 1,
                producto: producto
            } as ImagenProducto;
            const s = await this.repo.add(img);
            saved.push(s);
        }
        return toImagenProductoDTOs(saved);
    }

    async removeImagenProducto(id: number): Promise<boolean> {
        const imagen = await this.repo.findOneBy({ id });
        if (!imagen) return false;

        // Si tiene public_id, borrar en Cloudinary
        if (imagen.public_id) {
            try {
                await cloudinaryDelete(imagen.public_id);
            } catch (err) {
                console.warn("No se pudo borrar en Cloudinary:", err);
            }
        }

        // Eliminar el registro en BD
        await this.repo.delete(imagen);
        return true;
    }

}