import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class ProductoDTO {
    @IsInt() @IsPositive()
    id!: number;

    @IsNotEmpty() @MaxLength(250)
    nombre!: string

    @IsNotEmpty()
    descripcion!: string;

    @IsNotEmpty()
    imagen_url!: string;

    @IsInt() @IsPositive()
    categoria_id!: number;

    @IsInt() @IsPositive()
    temporada_id!: number;
}

export class CreateProductoDTO {
    @IsNotEmpty() @MaxLength(250)
    nombre!: string

    @IsNotEmpty()
    descripcion!: string;

    @IsNotEmpty()
    imagen_url!: string;

    @IsInt() @IsPositive()
    categoria_id!: number;

    @IsInt() @IsPositive()
    temporada_id!: number;
}

export class UpProductoDTO {
    @IsNotEmpty() @MaxLength(250)
    nombre?: string

    @IsNotEmpty()
    descripcion?: string;

    @IsNotEmpty()
    imagen_url?: string;

    @IsInt() @IsPositive()
    categoria_id?: number;

    @IsInt() @IsPositive()
    temporada_id?: number;
}