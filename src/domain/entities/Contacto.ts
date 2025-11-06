import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contactos')
export class Contacto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    horario_atencion!: string;

    @Column({ length: 250 })
    email!: string;

    @Column({ length: 20 })
    telefono!: string;

    @Column({ length: 20 })
    whatsapp!: string;
}