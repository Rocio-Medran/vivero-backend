import { Column,Entity,ManyToOne,PrimaryGeneratedColumn,JoinColumn, OneToMany } from "typeorm";
import { CategoriaServicio } from "./CategoriaServicio";
import { ImagenServicio } from "./ImagenServicio";


@Entity('Servicios')
export class Servicio{
    @PrimaryGeneratedColumn ()
    id!: number;

    @Column ({length:250})
    nombre!: string;

    @Column('text')
    descripcion!: string;

    @Column('text')
    informacion_extra!: string;

    @Column({ default: true })
    esta_activo!: boolean;

    @ManyToOne(()=> CategoriaServicio, c =>c.servicios)
    @JoinColumn({name : 'categoria_id'})
    categoria!: CategoriaServicio;

    @OneToMany(() => ImagenServicio, i => i.servicio, { cascade: true })
    imagenes?: ImagenServicio[];
}