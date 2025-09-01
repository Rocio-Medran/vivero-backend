import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "./Servicio";

@Entity('Categoria_Servicio')
export class CategoriaServicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 250 })
  nombre!: string;

  @OneToMany(() => Servicio, s => s.categoria)
  servicios?: Servicio[];
}