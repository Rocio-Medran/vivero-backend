import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity('Temporadas')
export class Temporada {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 250 })
    nombre!: string;

    @OneToMany(() => Producto, p => p.temporada)
    productos?: Producto[];
}