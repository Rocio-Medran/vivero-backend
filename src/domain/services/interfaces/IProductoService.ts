import { ProductoDTO, CreateProductoDTO, ProductoConDetallesDTO, UpdateProductoDTO } from "../../../app/schemas/producto.schema";


export interface IProductoService {
    getAllProductos(): Promise< ProductoDTO[] >;
    getProductoById(id: number): Promise< ProductoDTO | null >;
    createProductoAsync(dto: CreateProductoDTO): Promise< ProductoConDetallesDTO >;
    updateProductoCompletoAsync(id: number, dto: CreateProductoDTO): Promise< boolean >;
    updateProductoAsync(id: number, dto: UpdateProductoDTO): Promise< ProductoDTO >;
    removeProductoAsync(id: number): Promise< boolean >;
    getAllProductosConDetalles(): Promise< ProductoConDetallesDTO[] >;
    getProductoConDetallesById(id: number): Promise< ProductoConDetallesDTO | null >;
}
