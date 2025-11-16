import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Producto } from "./Producto";


@Entity('ImagenProducto')
export class ImagenProducto {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    url!: string;

    @Column({ type: 'text', nullable: true })
    public_id?: string;

    @Column({ default: false })
    es_principal!: boolean;

    @Column()
    orden!: number;

    @Column({ type: 'boolean', default: false })
    es_ilustrativa!: boolean;

    @ManyToOne(() => Producto, p => p.imagenes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;

}