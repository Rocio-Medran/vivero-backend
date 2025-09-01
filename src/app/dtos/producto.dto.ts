import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class ProductoDTO {
    @Expose()
    id!: number;

    @Expose()
    nombre!: string

    @Expose()
    descripcion!: string;

    @Expose()
    imagen_url!: string;

    @Expose()
    categoria_id!: number;

    @Expose()
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
    @IsString() @MaxLength(250)
    nombre?: string

    @Expose()
    @IsString()
    descripcion?: string;

    @Expose()
    @IsString()
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
    nombre!: string

    @Expose()
    descripcion!: string;

    @Expose()
    imagen_url!: string;

    @Expose()
    nombre_categoria!: string;

    @Expose()
    nombre_temporada!: string;
}