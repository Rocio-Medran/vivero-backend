import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 200, unique: true })
    email!: string;

    @Column()
    passwordHash!: string;
}