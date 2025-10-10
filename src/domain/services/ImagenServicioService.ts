import { ImagenServicio } from "../entities/ImagenServicio";
import { Servicio } from "../entities/Servicio";
import { ImagenServicioDTO } from "../../app/schemas/imagenServicio.schema";
import { IImagenServicioService } from "./interfaces/IImagenServicioService";
import fs from "fs/promises";
import { toImagenServicioDTOs } from "../../app/mappings/imagenServicio.mapping";
import { BaseRepository } from "../repositories/BaseRepository";
import { NotFoundError, ValidationError, ConflictError } from "../../app/errors/CustomErrors";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload";
import path from "path";

export class ImagenServicioService implements IImagenServicioService {
    constructor(private readonly repo: BaseRepository<ImagenServicio>) {}

    servicioRepo = new BaseRepository(Servicio);

    async getImagenesByServicioId(servicioId: number): Promise<ImagenServicioDTO[]> {
        const imagenes = await this.repo.find({ servicio: { id: servicioId } }, ['servicio']);
        return toImagenServicioDTOs(imagenes);
    }

    async createImagenesServicio(files: Express.Multer.File[], servicioId: number): Promise<ImagenServicioDTO[]> {
        const servicio = await this.servicioRepo.findOneBy({ id: servicioId });
        if (!servicio) throw new NotFoundError("Servicio no encontrado");
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

        // Validar límite de imágenes por servicio (max 5)
        const existentes = await this.repo.find({ servicio: { id: servicioId } });
        if (existentes.length + files.length > 5) {
            throw new ConflictError("No se pueden subir más de 5 imágenes por servicio.");
        }

        let principalSet = existentes.some(img => img.es_principal);
        const count = existentes.length;

        const saved: ImagenServicio[] = [];
        for (const [index, file] of files.entries()) {
            const esPrincipal = !principalSet && index === 0;
            if (esPrincipal) principalSet = true;
            const uploadResult = await uploadBufferToCloudinary(file.buffer, 'servicios');
            const url = uploadResult.secure_url || uploadResult.url;
            const img: ImagenServicio = {
                url,
                es_principal: esPrincipal,
                orden: count + index + 1,
                servicio: servicio
            } as ImagenServicio;
            const s = await this.repo.add(img);
            saved.push(s);
        }
        return toImagenServicioDTOs(saved);
    }

    async removeImagenServicio(id: number): Promise<boolean> {
        const imagen = await this.repo.findOneBy({ id });
        if (!imagen) return false;
        // Validar que la ruta esté dentro de /uploads/servicios
        const uploadsDir = path.resolve(__dirname, '../../..', 'uploads/servicios');
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
