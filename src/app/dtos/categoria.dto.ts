import { Expose, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";
import { ProductoConDetallesDTO } from "../schemas/producto.schema";


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

export class CategoriaConProductosDTO {
    @Expose()
    @IsInt() @IsPositive()
    id!: number;

    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;

    // @Expose()
    // @Type(() => ProductoConDetallesDTO)
    // productos!: ProductoConDetallesDTO[];
}