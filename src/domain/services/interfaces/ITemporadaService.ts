import { TemporadaDTO, CreateTemporadaDTO, UpTemporadaDTO } from '../../../app/dtos/temporada.dto';

export interface ITemporadaService {
    getAllTemporadas(): Promise< TemporadaDTO[] >;
    getTemporadaById(id: number): Promise< TemporadaDTO | null >;
    createTemporada(dto: CreateTemporadaDTO): Promise< TemporadaDTO >;
    updateTemporada(id: number, dto: UpTemporadaDTO): Promise< boolean >;
    removeTemporada(id: number): Promise< boolean >;
}