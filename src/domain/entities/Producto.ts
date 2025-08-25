import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { Temporada } from "./Temporada";

@Entity('Productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column( { length: 250 } )
    nombre!: string;

    @Column('text')
    descripcion!: string;

    @Column('text')
    imagen_url!: string;

    @ManyToOne(() => Categoria, c => c.productos)
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;

    @ManyToOne(() => Temporada, t => t.productos)
    @JoinColumn({ name: 'temporada_id'})
    temporada!: Temporada;
}