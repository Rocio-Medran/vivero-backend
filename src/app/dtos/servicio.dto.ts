import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class ServicioDTO {
  @Expose()
  @IsInt() @IsPositive()
  id!: number;

  @Expose()
  @IsNotEmpty() @MaxLength(250)
  nombre!: string;

  @Expose()
  @IsNotEmpty()
  descripcion!: string;

  @Expose()
  @IsNotEmpty()
  imagen_url!: string;
}

export class ServicioConDetallesDTO {
  @Expose() @IsNotEmpty() @MaxLength(250)
  nombre!: string;

  @Expose() @IsNotEmpty()
  descripcion!: string;

  @Expose() @IsNotEmpty()
  imagen_url!: string;

  @Expose() @IsNotEmpty()
  nombre_categoria!: string;
}

export class CreateServicioDTO {
  @Expose() @IsNotEmpty() @MaxLength(250)
  nombre!: string;

  @Expose() @IsNotEmpty()
  descripcion!: string;

  @Expose() @IsNotEmpty()
  imagen_url!: string;

  @Expose() @IsInt() @IsPositive()
  categoria_id!: number;            
}

export class UpServicioDTO {
  @Expose() @MaxLength(250)
  nombre?: string;

  @Expose()
  descripcion?: string;

  @Expose()
  imagen_url?: string;

  @Expose() @IsInt() @IsPositive()
  categoria_id?: number;
}