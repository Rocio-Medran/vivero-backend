import { CreateProductoDTO, ProductoConDetallesDTO, ProductoDTO, UpProductoDTO } from "../../../app/dtos/producto.dto";

export interface IProductoService {
    getAllProductos(): Promise< ProductoDTO[] >;
    getProductoById(id: number): Promise< ProductoDTO | null >;
    createProductoAsync(dto: CreateProductoDTO): Promise< ProductoConDetallesDTO >;
    updateProductoCompletoAsync(id: number, dto: CreateProductoDTO): Promise< boolean >;
    updateProductoAsync(id: number, dto: UpProductoDTO): Promise< ProductoDTO >;
    removeProductoAsync(id: number): Promise< boolean >;
    getAllProductosConDetalles(): Promise< ProductoConDetallesDTO[] >;
    getProductoConDetallesById(id: number): Promise< ProductoConDetallesDTO | null >;
}
