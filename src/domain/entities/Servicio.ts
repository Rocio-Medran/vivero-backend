import { Column,Entity,ManyToOne,PrimaryGeneratedColumn,JoinColumn } from "typeorm";
import { CategoriaServicio } from "./CategoriaServicio";


@Entity('Servicios')
export class Servicio{
    @PrimaryGeneratedColumn ()
    id!: number;

    @Column ({length:250})
    nombre!: string;

    @Column('text')
    description!: string;

    @Column('text')
    imagen_url! : string;

    @ManyToOne(()=> CategoriaServicio, c =>c.servicios)
    @JoinColumn({name : 'categoria_id'})
    categoria!: CategoriaServicio;






}