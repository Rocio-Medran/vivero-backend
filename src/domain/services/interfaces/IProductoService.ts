import { CreateProductoDTO, UpProductoDTO } from "../../../app/dtos/producto.dto";
import { Producto } from "../../entities/Producto";

export interface IProductoService {
    getAllProductos(): Promise< Producto[] >;
    getProductoById(id: number): Promise< Producto | null >;
    createProductoAsync(dto: CreateProductoDTO): Promise< Producto >;
    updateProductoAsync(id: number, dto: UpProductoDTO): Promise< boolean >;
    removeProductoAsync(id: number): Promise< boolean >;
}
