import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";
import { Temporada } from "./Temporada";
import { ImagenProducto } from "./ImagenProducto";

@Entity('Productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column( { length: 250 } )
    nombre!: string;

    @Column('text')
    descripcion!: string;

    @Column('text')
    informacion_extra!: string;

    @Column({ default: true })
    esta_activo!: boolean;

    @ManyToOne(() => Categoria, c => c.productos)
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;

    @ManyToOne(() => Temporada, t => t.productos)
    @JoinColumn({ name: 'temporada_id'})
    temporada!: Temporada;

    @OneToMany(() => ImagenProducto, i => i.producto)
    imagenes?: ImagenProducto[];
}