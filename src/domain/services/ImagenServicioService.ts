import { ImagenServicio } from "../entities/ImagenServicio";
import { Servicio } from "../entities/Servicio";
import { ImagenServicioDTO } from "../../app/schemas/imagenServicio.schema";
import { IImagenServicioService } from "./interfaces/IImagenServicioService";
import fs from "fs/promises";
import { toImagenServicioDTO, toImagenServicioDTOs } from "../../app/mappings/imagenServicio.mapping";
import { BaseRepository } from "../repositories/BaseRepository";

export class ImagenServicioService implements IImagenServicioService {
    constructor(private readonly repo: BaseRepository<ImagenServicio>) {}

    servicioRepo = new BaseRepository(Servicio);

    async getImagenesByServicioId(servicioId: number): Promise<ImagenServicioDTO[]> {
        const imagenes = await this.repo.find({ servicio: { id: servicioId } }, ['servicio']);
        return toImagenServicioDTOs(imagenes);
    }

    async createImagenServicio(file: Express.Multer.File, servicioId: number): Promise<ImagenServicioDTO> {
        const servicio = await this.servicioRepo.findOneBy({ id: servicioId });
        if (!servicio) throw new Error("Servicio no encontrado");

        const relativeUrl = `/uploads/servicios/${file.filename}`;
        const imagen = {
            url: relativeUrl,
            es_principal: false,
            orden: 0,
            servicio: servicio
        } as ImagenServicio;
        const saved = await this.repo.add(imagen);
        return toImagenServicioDTO(saved);
    }

    async createImagenesServicio(files: Express.Multer.File[], servicioId: number): Promise<ImagenServicioDTO[]> {
        const servicio = await this.servicioRepo.findOneBy({ id: servicioId });
        if (!servicio) throw new Error("Servicio no encontrado");
        if (!files || files.length === 0) return [];

        const existentes = await this.repo.find({ servicio: { id: servicioId } });
        const count = existentes.length;
        let principalSet = existentes.some(img => img.es_principal);

        const imagenes: ImagenServicio[] = files.map((file, index) => {
            const esPrincipal = !principalSet && index === 0;
            if (esPrincipal) principalSet = true;
            return {
                url: `/uploads/servicios/${file.filename}`,
                es_principal: esPrincipal,
                orden: count + index + 1,
                servicio: servicio
            } as ImagenServicio;
        });

        const saved: ImagenServicio[] = [];
        for (const img of imagenes) {
            const s = await this.repo.add(img);
            saved.push(s);
        }
        return toImagenServicioDTOs(saved);
    }

    async removeImagenServicio(id: number): Promise<boolean> {
        const imagen = await this.repo.findOneBy({ id });
        if (!imagen) return false;
        await this.repo.delete(imagen);
        try {
            await fs.unlink(imagen.url);
        } catch (err) {
            console.warn("No se pudo borrar archivo físico:", err);
        }
        return true;
    }
}
