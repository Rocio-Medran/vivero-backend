import { ImagenProducto } from "../entities/ImagenProducto";
import { Producto } from "../entities/Producto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IImagenProductoService } from "./interfaces/IImageneProductoService";
import fs from "fs/promises";
import path from "path";
import { toImagenProductoDTO, toImagenProductoDTOs } from "../../app/mappings/imagenProducto.mapping";
import { ImagenProductoDTO } from "../../app/schemas/imagenProducto.schema";


export class ImagenProductoService implements IImagenProductoService {
    constructor(private readonly repo: BaseRepository<ImagenProducto>) { }

    productoRepo = new BaseRepository(Producto);

    async getImagenesByProductoId(productoId: number): Promise<ImagenProductoDTO[]> {
        const imagenes = await this.repo.find({ producto: { id: productoId } });
        return toImagenProductoDTOs(imagenes);
    }

    async createImagenProducto(file: Express.Multer.File, productoId: number): Promise<ImagenProductoDTO> {
        const producto = await this.productoRepo.findOneBy({ id: productoId });
        if (!producto) throw new Error("Producto no encontrado");

        const relativeUrl = `/uploads/productos/${file.filename}`;
        const imagen = {
            url: relativeUrl,
            es_principal: false,
            orden: 0,
            producto: producto
        } as ImagenProducto;
        const saved = await this.repo.add(imagen);
        return toImagenProductoDTO(saved);
    }

    async createImagenesProducto(files: Express.Multer.File[], productoId: number): Promise<ImagenProductoDTO[]> {
        const producto = await this.productoRepo.findOneBy({ id: productoId });
        if (!producto) throw new Error("Producto no encontrado");

        if (!files || files.length === 0) return [];

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
            saved.push(s);
        }
        return toImagenProductoDTOs(saved);
    }

    async removeImagenProducto(id: number): Promise<boolean> {
        const imagen = await this.repo.findOneBy({ id });
        if (!imagen) return false;

        await this.repo.delete(imagen);

        try {
            // Convertir la ruta relativa a absoluta
            const absolutePath = path.resolve(__dirname, '../../..', imagen.url.replace(/^\//, ''));
            await fs.unlink(absolutePath);
        } catch (err) {
            console.warn("No se pudo borrar archivo físico:", err);
        }

        return true;
    }

}