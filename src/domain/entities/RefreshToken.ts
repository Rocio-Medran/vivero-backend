import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Admin } from "./Admin";

@Entity('RefreshTokens')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    token!: string;

    @Column()
    expiresAt!: Date;

    @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin!: Admin;
}
