import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity('Categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 250 })
    nombre!: string;

    @OneToMany(() => Producto, p => p.categoria)
    productos?: Producto[];
}