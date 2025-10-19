import { ProductoDTO, CreateProductoDTO, ProductoConDetallesDTO, UpdateProductoDTO, ProductoCompletoDTO } from "../../../app/schemas/producto.schema";


export interface IProductoService {
    getAllProductos(): Promise<ProductoDTO[]>;
    getProductoById(id: number): Promise<ProductoDTO>;
    createProductoAsync(dto: CreateProductoDTO): Promise<ProductoDTO>;
    updateProductoCompletoAsync(id: number, dto: CreateProductoDTO): Promise<boolean>;
    updateProductoAsync(id: number, dto: UpdateProductoDTO): Promise<ProductoDTO>;
    removeProductoAsync(id: number): Promise<boolean>;
    getAllProductosConDetalles(baseUrl?: string): Promise<ProductoConDetallesDTO[]>;
    getProductoConDetallesById(id: number, baseUrl?: string): Promise<ProductoConDetallesDTO>;
    getProductosByCategoria(nombre: string): Promise<ProductoConDetallesDTO[]>;
    getProductoCompletoById(id: number): Promise<ProductoCompletoDTO>;
    getProductosCompletos(): Promise<ProductoCompletoDTO[]>;
}
