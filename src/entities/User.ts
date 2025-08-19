// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: 'admin' })
  role!: 'admin';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @Column({ default: true })
  isActive!: boolean;
}
