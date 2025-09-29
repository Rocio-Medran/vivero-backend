import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Producto } from "./Producto";


@Entity('ImagenProducto')
export class ImagenProducto {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    url!: string;

    @Column({ default: false })
    es_principal!: boolean;

    @Column()
    orden!: number;

    @ManyToOne(() => Producto, p => p.imagenes)
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;

}