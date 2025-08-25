import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Product } from "../../entities/Product";

const productRepo = AppDataSource.getRepository(Product);

export const getProducts = async (_req: Request, res: Response) => {
  const products = await productRepo.find({ relations: ["category"] });
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = productRepo.create(req.body);
  const result = await productRepo.save(product);
  res.status(201).json(result);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await productRepo.findOneBy({ id: parseInt(req.params.id!) });
  if (!product) return res.status(404).json({ message: "Not found" });

  productRepo.merge(product, req.body);
  const result = await productRepo.save(product);
  res.json(result);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const result = await productRepo.delete(req.params.id!);
  if (result.affected === 0) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
