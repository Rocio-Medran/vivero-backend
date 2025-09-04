import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class ServicioDTO {
  @Expose()
  id!: number;

  @Expose()
  nombre!: string;

  @Expose()
  descripcion!: string;

  @Expose()
  imagen_url!: string;

  @Expose()
  categoria_id!: number;
}

export class ServicioConDetallesDTO {
  @Expose()
  nombre!: string;

  @Expose()
  descripcion!: string;

  @Expose()
  imagen_url!: string;

  @Expose()
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