import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class TemporadaDTO {
    @IsInt() @IsPositive()
    id!: number;

    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}

export class CreateTemporadaDTO {
    @IsNotEmpty() @MaxLength(250)
    nombre!: string;
}