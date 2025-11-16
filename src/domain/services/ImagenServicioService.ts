import { ImagenServicio } from "../entities/ImagenServicio";
import { Servicio } from "../entities/Servicio";
import { ImagenServicioDTO } from "../../app/schemas/imagenServicio.schema";
import { IImagenServicioService } from "./interfaces/IImagenServicioService";
import { toImagenServicioDTO, toImagenServicioDTOs } from "../../app/mappings/imagenServicio.mapping";
import { BaseRepository } from "../repositories/BaseRepository";
import { NotFoundError, ValidationError, ConflictError } from "../../app/errors/CustomErrors";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload";
import { cloudinaryDelete } from "../../utils/cloudinaryDelete";
import { AppDataSource } from "../../config/data-source";
import { Not } from "typeorm";

export class ImagenServicioService implements IImagenServicioService {
    constructor(private readonly repo: BaseRepository<ImagenServicio>) { }

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
                public_id: uploadResult.public_id,
                es_principal: esPrincipal,
                es_ilustrativa: false,
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

    async updateImagenServicio(id: number, es_principal: boolean, orden?: number): Promise<ImagenServicioDTO> {
        const imagen = await this.repo.findOneBy({ id }, ['servicio']);
        if (!imagen) throw new NotFoundError("Imagen no encontrada");

        const imagenRepo = AppDataSource.getRepository(ImagenServicio);

        if (es_principal) {
            await imagenRepo.update(
                { servicio: { id: imagen.servicio.id }, id: Not(id) },
                { es_principal: false }
            );
            imagen.es_principal = true;
        }

        if (orden !== undefined) {
            const updated = await this.updateOrdenImagen(id, orden);
            return updated;
        }

        const updated = await imagenRepo.save(imagen);
        return toImagenServicioDTO(updated);
    }

    async updateOrdenImagen(id: number, nuevoOrden: number): Promise<ImagenServicioDTO> {
        const imagen = await this.repo.findOneBy({ id }, ["servicio"]);
        if (!imagen) throw new NotFoundError("Imagen no encontrada");

        const imagenRepo = AppDataSource.getRepository(ImagenServicio);
        const servicioId = imagen.servicio.id;
        const imagenes = await imagenRepo.find({
            where: { servicio: { id: servicioId } },
            order: { orden: "ASC" },
        });

        const ordenActual = imagen.orden;


        if (nuevoOrden < ordenActual) {
            for (const img of imagenes) {
                if (img.orden >= nuevoOrden && img.orden < ordenActual) {
                    img.orden += 1; // desplazar hacia abajo
                    await imagenRepo.save(img);
                }
            }
        }
        // Si el nuevo orden es mayor (baja)
        else if (nuevoOrden > ordenActual) {
            for (const img of imagenes) {
                if (img.orden <= nuevoOrden && img.orden > ordenActual) {
                    img.orden -= 1; // desplazar hacia arriba
                    await imagenRepo.save(img);
                }
            }
        }

        imagen.orden = nuevoOrden;
        return await imagenRepo.save(imagen);
    }

    async reordenarImagenes(servicioId: number, nuevoOrden: number[]): Promise<ImagenServicioDTO[]> {
        const repo = AppDataSource.getRepository(ImagenServicio);

        const imagenes = await repo.find({
            where: { servicio: { id: servicioId } },
        });

        if (imagenes.length === 0) {
            throw new ValidationError("El producto no tiene imágenes.");
        }

        // Validar que todos los IDs del arreglo pertenecen al producto
        const idsActuales = imagenes.map(img => img.id);

        for (const id of nuevoOrden) {
            if (!idsActuales.includes(id)) {
                throw new ValidationError(`La imagen con ID ${id} no pertenece a este producto`);
            }
        }

        // Aplicar el nuevo orden
        for (let i = 0; i < nuevoOrden.length; i++) {
            const img = imagenes.find(im => im.id === nuevoOrden[i]);
            if (img) {
                img.orden = i + 1; // Orden empieza desde 1
                await repo.save(img);
            }
        }

        // Recuperar actualizadas
        const actualizadas = await repo.find({
            where: { servicio: { id: servicioId } },
            order: { orden: "ASC" }
        });

        return actualizadas.map(toImagenServicioDTO);
    }
}