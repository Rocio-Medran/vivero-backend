import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;
  

  constructor(name: string, description: string, price: number, category: Category) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
