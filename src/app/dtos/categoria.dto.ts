import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class CategoriaDTO {
    @Expose()
    @IsInt() @IsPositive()
    id!: number;

    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}

export class CreateCategoriaDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}