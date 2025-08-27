import { CreateProductoDTO, ProductoDTO, UpProductoDTO } from "../../../app/dtos/producto.dto";

export interface IProductoService {
    getAllProductos(): Promise< ProductoDTO[] >;
    getProductoById(id: number): Promise< ProductoDTO | null >;
    createProductoAsync(dto: CreateProductoDTO): Promise< ProductoDTO >;
    updateProductoAsync(id: number, dto: UpProductoDTO): Promise< boolean >;
    removeProductoAsync(id: number): Promise< boolean >;
}
