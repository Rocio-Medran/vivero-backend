import { TemporadaDTO, CreateTemporadaDTO, UpdateTemporadaDTO } from "../../../app/schemas/temporada.schema";


export interface ITemporadaService {
    getAllTemporadas(): Promise< TemporadaDTO[] >;
    getTemporadaById(id: number): Promise< TemporadaDTO>;
    createTemporada(dto: CreateTemporadaDTO): Promise< TemporadaDTO >;
    updateTemporada(id: number, dto: UpdateTemporadaDTO): Promise< boolean >;
    removeTemporada(id: number): Promise< boolean >;
}