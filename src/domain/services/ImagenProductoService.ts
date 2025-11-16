import { ImagenProducto } from "../entities/ImagenProducto";
import { Producto } from "../entities/Producto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IImagenProductoService } from "./interfaces/IImageneProductoService";
import { cloudinaryDelete } from "../../utils/cloudinaryDelete";
import { toImagenProductoDTO, toImagenProductoDTOs } from "../../app/mappings/imagenProducto.mapping";
import { ImagenProductoDTO } from "../../app/schemas/imagenProducto.schema";
import { ConflictError, NotFoundError, ValidationError } from "../../app/errors/CustomErrors";
import { uploadBufferToCloudinary } from "../../utils/cloudinaryUpload";
import { Not } from "typeorm";
import { AppDataSource } from "../../config/data-source";


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
                es_ilustrativa: false,
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

    async updateImagenProducto(id: number, es_principal: boolean, orden?: number): Promise<ImagenProductoDTO> {
        const imagen = await this.repo.findOneBy({ id }, ['producto']);
        if (!imagen) throw new NotFoundError("Imagen no encontrada");

        const imagenRepo = AppDataSource.getRepository(ImagenProducto);

        if (es_principal) {
            await imagenRepo.update(
                { producto: { id: imagen.producto.id }, id: Not(id) },
                { es_principal: false }
            );
            imagen.es_principal = true;
        }

        if (orden !== undefined) {
            const updated = await this.updateOrdenImagen(id, orden);
            return updated;
        }

        const updated = await imagenRepo.save(imagen);
        return toImagenProductoDTO(updated);
    }

    async updateOrdenImagen(id: number, nuevoOrden: number): Promise<ImagenProductoDTO> {
        const imagen = await this.repo.findOneBy({ id }, ["producto"]);
        if (!imagen) throw new NotFoundError("Imagen no encontrada");

        const imagenRepo = AppDataSource.getRepository(ImagenProducto);
        const productoId = imagen.producto.id;

        const imagenes = await imagenRepo.find({
            where: { producto: { id: productoId } },
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

    async reordenarImagenes(productoId: number, nuevoOrden: number[]): Promise<ImagenProductoDTO[]> {
        const repo = AppDataSource.getRepository(ImagenProducto);

        const imagenes = await repo.find({
            where: { producto: { id: productoId } },
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
            where: { producto: { id: productoId } },
            order: { orden: "ASC" }
        });

        return actualizadas.map(toImagenProductoDTO);
    }

}