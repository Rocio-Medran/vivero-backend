import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "./Servicio";

@Entity('Categoria_Servicio')
export class CategoriaServicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 250 })
  nombre!: string;

  @Column({ default: 0 })
  id_padre?: number;

  @Column({ length: 50, default: 'principal' })
  tipo!: string;

  @Column( { nullable: true } )
  imagen_url?: string;

  @Column( { nullable: true } )
  imagen2_url?: string;

  @OneToMany(() => Servicio, s => s.categoria)
  servicios?: Servicio[];
}