import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Servicio } from "./Servicio";

@Entity('ImagenesServicio')
export class ImagenServicio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    url!: string;

    @Column({ default: false })
    es_principal!: boolean;

    @Column({ default: 0 })
    orden!: number;

    @ManyToOne(() => Servicio, s => s.imagenes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'servicio_id' })
    servicio!: Servicio;
}
