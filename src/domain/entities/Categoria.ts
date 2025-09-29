import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity('Categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 250 })
    nombre!: string;

    @Column({default: 0})
    id_padre?: number;

    @Column({ length: 50, default: 'principal' })
    tipo!: string;

    @OneToMany(() => Producto, p => p.categoria)
    productos?: Producto[];
}