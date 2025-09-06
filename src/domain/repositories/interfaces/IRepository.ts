import { FindOptionsWhere } from "typeorm";

export interface IRepository<T> {
    getAll(relations?: string[]): Promise<T[]>;
    getById(id: number, relations?: string[]): Promise<T | null>;
    find(where: FindOptionsWhere<T>, relations?: string[]): Promise<T[]>;
    add(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    delete(entity: T): Promise<void>;
    findOneBy(where: FindOptionsWhere<T>, relations?: string[]): Promise<T | null>;
    findByNombre(nombre: string): Promise< T | null >; 
}