import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Admin } from "./Admin";

@Entity()
export class PasswordResetToken {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @Column()
  expiresAt!: Date;

  @ManyToOne(() => Admin, admin => admin.id, { onDelete: "CASCADE" })
  admin!: Admin;

  @CreateDateColumn()
  createdAt!: Date;
}
