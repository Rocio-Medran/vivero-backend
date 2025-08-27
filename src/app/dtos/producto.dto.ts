import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class ProductoDTO {
    @Expose()
    @IsInt() @IsPositive()
    id!: number;

    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string

    @Expose()
    @IsNotEmpty()
    descripcion!: string;

    @Expose()
    @IsNotEmpty()
    imagen_url!: string;

    @Expose()
    @IsInt() @IsPositive()
    categoria_id!: number;

    @Expose()
    @IsInt() @IsPositive()
    temporada_id!: number;
}

export class CreateProductoDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string

    @Expose()
    @IsNotEmpty()
    descripcion!: string;

    @Expose()
    @IsNotEmpty()
    imagen_url!: string;

    @Expose()
    @IsInt() @IsPositive()
    categoria_id!: number;

    @Expose()
    @IsInt() @IsPositive()
    temporada_id!: number;
}

export class UpProductoDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre?: string

    @Expose()
    @IsNotEmpty()
    descripcion?: string;

    @Expose()
    @IsNotEmpty()
    imagen_url?: string;

    @Expose()
    @IsInt() @IsPositive()
    categoria_id?: number;

    @Expose()
    @IsInt() @IsPositive()
    temporada_id?: number;
}

export class ProductoConDetallesDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string

    @Expose()
    @IsNotEmpty()
    descripcion!: string;

    @Expose()
    @IsNotEmpty()
    imagen_url!: string;

    @Expose()
    @IsNotEmpty()
    nombre_categoria!: string;

    @Expose()
    @IsNotEmpty()
    nombre_temporada!: string;
}