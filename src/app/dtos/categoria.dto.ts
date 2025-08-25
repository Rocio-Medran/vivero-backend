import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class CategoriaDTO {
    @IsInt() @IsPositive()
    id!: number;

    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}

export class CreateCategoriaDTO {
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}