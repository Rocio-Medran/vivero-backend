import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Category } from "../../entities/Category";

const categoryRepo = AppDataSource.getRepository(Category);

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryRepo.find();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const category = categoryRepo.create(req.body);
  const result = await categoryRepo.save(category);
  res.status(201).json(result);
};
