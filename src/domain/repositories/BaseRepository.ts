import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { IRepository } from "./interfaces/IRepository";


export class BaseRepository<T extends ObjectLiteral> implements IRepository<T> {
    protected orm: Repository<T>;

    constructor(entity: { new(): T }) {
        this.orm = AppDataSource.getRepository(entity);
    }

    getAll(relations: string[] = []) {
        return this.orm.find({ relations });
    }

    getById(id: number, relations: string[] = []) {
        return this.orm.findOne({ where: { id } as any, relations });
    }

    find(where: FindOptionsWhere<T>, relations: string[] = []) {
        return this.orm.find({ where, relations });
    }

    add(entity: T) {
        return this.orm.save(entity);
    }

    update(entity: T) {
        return this.orm.save(entity);
    }

    async delete(entity: T) {
        await this.orm.remove(entity);
    }

    findOneBy(where: FindOptionsWhere<T>, relations: string[] = []) {
        return this.orm.findOne({ where, relations });
    }

    async findByNombre(nombre: string): Promise<T | null> {
        return this.orm
            .createQueryBuilder("entity")
            .where(`LOWER(entity.nombre) = LOWER(:nombre)`, { nombre })
            .getOne();
    }
}