import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Encargado')
export class Encargado {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    nombre!: string;

    @Column({ type: 'varchar', length: 255 })
    foto!: string;

    @Column({ type: 'text' })
    descripcion!: string;
}