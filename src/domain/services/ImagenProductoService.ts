import { ImagenProducto } from "../entities/ImagenProducto";
import { Producto } from "../entities/Producto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IImagenProductoService } from "./interfaces/IImageneProductoService";
import fs from "fs/promises";
import path from "path";
import { toImagenProductoDTOs } from "../../app/mappings/imagenProducto.mapping";
import { ImagenProductoDTO } from "../../app/schemas/imagenProducto.schema";
import { ConflictError, NotFoundError, ValidationError } from "../../app/errors/CustomErrors";


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

        const imagenes: ImagenProducto[] = files.map((file, index) => {
            const esPrincipal = !principalSet && index === 0;
            if (esPrincipal) principalSet = true;
            return {
                url: `/uploads/productos/${file.filename}`,
                es_principal: esPrincipal,
                orden: count + index + 1,
                producto: producto
            } as ImagenProducto;
        });

        const saved: ImagenProducto[] = [];
        for (const img of imagenes) {
            const s = await this.repo.add(img);
            // Validar que el archivo físico exista
            const absolutePath = path.resolve(__dirname, '../../..', img.url.replace(/^\//, ''));
            try {
                await fs.access(absolutePath);
            } catch {
                throw new ConflictError(`El archivo físico ${img.url} no se guardó correctamente en el servidor.`);
            }
            saved.push(s);
        }
        return toImagenProductoDTOs(saved);
    }

    async removeImagenProducto(id: number): Promise<boolean> {
        const imagen = await this.repo.findOneBy({ id });
        if (!imagen) return false;

        // Validar que la ruta esté dentro de /uploads/productos
        const uploadsDir = path.resolve(__dirname, '../../..', 'uploads/productos');
        const absolutePath = path.resolve(__dirname, '../../..', imagen.url.replace(/^\//, ''));
        if (!absolutePath.startsWith(uploadsDir)) {
            throw new ConflictError("Ruta de archivo inválida o potencial intento de acceso no autorizado.");
        }
        await this.repo.delete(imagen);
        try {
            await fs.unlink(absolutePath);
        } catch (err) {
            console.warn("No se pudo borrar el archivo físico:", err);
        }
        return true;
    }

}