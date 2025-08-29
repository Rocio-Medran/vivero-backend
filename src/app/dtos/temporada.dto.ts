import { Expose } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class TemporadaDTO {
    @Expose()
    @IsInt() @IsPositive()
    id!: number;

    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;

    @Expose()
    @IsDate()
    fecha_desde!: Date;

    @Expose()
    @IsDate()
    fecha_hasta!: Date;
}

export class CreateTemporadaDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;

    @Expose()
    @IsDate()
    fecha_desde!: Date;

    @Expose()
    @IsDate()
    fecha_hasta!: Date;
}

export class UpTemporadaDTO {
    @Expose()
    @IsNotEmpty() @MaxLength(250)
    nombre?: string;

    @Expose()
    @IsDate()
    fecha_desde?: Date;

    @Expose()
    @IsDate()
    fecha_hasta?: Date;
}