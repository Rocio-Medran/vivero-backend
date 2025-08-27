export interface IRepository<T> {
    getAll(relations?: string[]): Promise<T[]>;
    getById(id: number, relations?: string[]): Promise<T | null>;
    find(where: any, relations?: string[]): Promise<T[]>;
    add(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    delete(entity: T): Promise<void>;
}